"use client"

// ============================================================================
// AI Ustoz — localStorage asosidagi holat (state) boshqaruvi.
// Butun oqim va progress shu yerda saqlanadi; sahifa yangilanganda yo'qolmaydi.
// Ma'lumot tuzilishi kelajakda Database ga ulashga qulay qilib tuzilgan.
// ============================================================================

import { useCallback, useEffect, useState } from "react"
import {
  generateRoadmap,
  scoreDiagnostic,
  type DiagnosticResult,
  type Goal,
  type Level,
  type RoadmapModule,
  type Skill,
} from "./ustoz-data"

export type Step =
  | "onboarding"
  | "setup"
  | "diagnostic"
  | "result"
  | "roadmap"
  | "lesson"
  | "lesson-result"

// Kelajakdagi Error Database uchun tayyor yozuv strukturasi.
export type ErrorEntry = {
  id: string
  itemId: string // question yoki exercise id
  topic: string
  skill: Skill
  wrongAnswer: string
  correctAnswer: string
  errorType: "diagnostic" | "exercise"
  level: Level
  attemptCount: number
  createdAt: number
}

export type LessonScore = { lessonId: string; correct: number; total: number; xp: number }

export type AppState = {
  step: Step
  goal: Goal
  diagnosticAnswers: (number | null)[]
  result: DiagnosticResult | null
  xp: number
  streak: number
  completedModules: string[]
  activeModuleId: string | null
  activeLessonId: string | null
  lastLessonScore: LessonScore | null
  errors: ErrorEntry[]
  // Adaptive learning: har bir ko'nikma bo'yicha o'zlashtirish darajasi (0-100).
  skillMastery: Partial<Record<Skill, number>>
}

const STORAGE_KEY = "ai-ustoz-state-v1"

const defaultState: AppState = {
  step: "onboarding",
  goal: { current: "unknown", target: "IELTS 7.0", months: "6 oy" },
  diagnosticAnswers: [],
  result: null,
  xp: 0,
  streak: 1,
  completedModules: [],
  activeModuleId: null,
  activeLessonId: null,
  lastLessonScore: null,
  errors: [],
  skillMastery: {},
}

function load(): AppState {
  if (typeof window === "undefined") return defaultState
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw) as Partial<AppState>
    return { ...defaultState, ...parsed }
  } catch {
    return defaultState
  }
}

export function useUstozStore() {
  const [state, setState] = useState<AppState>(defaultState)
  const [hydrated, setHydrated] = useState(false)

  // SSR mos kelishi uchun localStorage faqat mount'dan keyin o'qiladi.
  useEffect(() => {
    setState(load())
    setHydrated(true)
  }, [])

  // Har o'zgarishda saqlash.
  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // localStorage mavjud bo'lmasa (private mode) e'tiborsiz qoldiramiz.
    }
  }, [state, hydrated])

  const patch = useCallback(
    (partial: Partial<AppState> | ((prev: AppState) => Partial<AppState>)) => {
      setState((prev) => ({
        ...prev,
        ...(typeof partial === "function" ? partial(prev) : partial),
      }))
    },
    [],
  )

  const start = useCallback(() => patch({ step: "setup" }), [patch])

  const setGoal = useCallback(
    (goal: Goal) =>
      patch({
        goal,
        step: "diagnostic",
        diagnosticAnswers: [],
        result: null,
      }),
    [patch],
  )

  const goTo = useCallback((step: Step) => patch({ step }), [patch])

  const addXp = useCallback(
    (amount: number) => patch((prev) => ({ xp: prev.xp + amount })),
    [patch],
  )

  const completeDiagnostic = useCallback(
    (answers: (number | null)[], errors: ErrorEntry[]) => {
      const result = scoreDiagnostic(answers)
      const mastery: Partial<Record<Skill, number>> = {}
      ;(Object.keys(result.skillScores) as (keyof typeof result.skillScores)[]).forEach(
        (k) => {
          mastery[k as Skill] = result.skillScores[k].percent
        },
      )
      patch((prev) => ({
        diagnosticAnswers: answers,
        result,
        step: "result",
        errors: [...prev.errors, ...errors],
        skillMastery: { ...prev.skillMastery, ...mastery },
      }))
    },
    [patch],
  )

  const startLesson = useCallback(
    (module: RoadmapModule) =>
      patch({
        step: "lesson",
        activeModuleId: module.id,
        // MVP: har bir modul haqiqiy interaktiv darsga ulanadi.
        // To'liq dars hali tayyor bo'lmagan modullar demo darsga yo'naltiriladi.
        activeLessonId: module.lessonId ?? "present-perfect",
      }),
    [patch],
  )

  const completeLesson = useCallback(
    (score: LessonScore, errors: ErrorEntry[], skill: Skill) => {
      patch((prev) => {
        const completed = prev.activeModuleId
          ? Array.from(new Set([...prev.completedModules, prev.activeModuleId]))
          : prev.completedModules
        // Adaptive: dars natijasiga ko'ra o'zlashtirishni yangilash.
        const lessonPercent = score.total
          ? Math.round((score.correct / score.total) * 100)
          : 0
        const prevMastery = prev.skillMastery[skill] ?? lessonPercent
        const nextMastery = Math.round((prevMastery + lessonPercent) / 2)
        return {
          step: "lesson-result",
          completedModules: completed,
          xp: prev.xp + score.xp,
          lastLessonScore: score,
          errors: [...prev.errors, ...errors],
          skillMastery: { ...prev.skillMastery, [skill]: nextMastery },
        }
      })
    },
    [patch],
  )

  const goToRoadmap = useCallback(
    () => patch({ step: "roadmap", activeModuleId: null, activeLessonId: null }),
    [patch],
  )

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // noop
    }
    setState(defaultState)
  }, [])

  // Roadmap holatini progressga qarab hisoblash.
  const roadmap: RoadmapModule[] = state.result
    ? generateRoadmap(state.goal, state.result)
    : generateRoadmap(state.goal, null)

  return {
    state,
    hydrated,
    roadmap,
    actions: {
      start,
      setGoal,
      goTo,
      addXp,
      completeDiagnostic,
      startLesson,
      completeLesson,
      goToRoadmap,
      reset,
    },
  }
}

// Roadmap modul statusini progressga qarab aniqlash.
export type ModuleStatus = "done" | "current" | "next" | "locked"

export function moduleStatus(
  module: RoadmapModule,
  index: number,
  modules: RoadmapModule[],
  completed: string[],
): ModuleStatus {
  if (completed.includes(module.id)) return "done"
  // Birinchi bajarilmagan modul = current.
  const firstUndone = modules.findIndex((m) => !completed.includes(m.id))
  if (index === firstUndone) return "current"
  if (index === firstUndone + 1) return "next"
  return "locked"
}
