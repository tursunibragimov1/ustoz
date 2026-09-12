"use client"

import { GamificationBar } from "@/components/gamification-bar"
import { OnboardingScreen } from "@/components/onboarding-screen"
import { SetupScreen } from "@/components/setup-screen"
import { DiagnosticScreen } from "@/components/diagnostic-screen"
import { ResultScreen } from "@/components/result-screen"
import { RoadmapScreen } from "@/components/roadmap-screen"
import { LessonScreen } from "@/components/lesson-screen"
import { LessonResultScreen } from "@/components/lesson-result-screen"
import { lessons } from "@/lib/ustoz-data"
import { useUstozStore } from "@/lib/ustoz-store"

export default function Page() {
  const { state, hydrated, roadmap, actions } = useUstozStore()

  // localStorage o'qilgunicha xira splash (hydration mismatch oldini oladi).
  if (!hydrated) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <span className="font-display text-lg font-bold">AI</span>
          </div>
          <span className="font-display text-sm font-semibold tracking-tight text-muted-foreground">
            AI Ustoz yuklanmoqda\u2026
          </span>
        </div>
      </main>
    )
  }

  const level =
    state.goal.current !== "unknown" ? state.goal.current : state.result?.level ?? "B1"
  const activeLesson = state.activeLessonId ? lessons[state.activeLessonId] : null
  const activeModule = roadmap.find((m) => m.id === state.activeModuleId) ?? null

  return (
    <main className="min-h-dvh bg-background">
      {state.step !== "onboarding" && (
        <GamificationBar streak={state.streak} xp={state.xp} level={level} />
      )}

      {state.step === "onboarding" && <OnboardingScreen onStart={actions.start} />}

      {state.step === "setup" && (
        <SetupScreen
          initial={state.goal}
          onBack={() => actions.goTo("onboarding")}
          onContinue={actions.setGoal}
        />
      )}

      {state.step === "diagnostic" && (
        <DiagnosticScreen
          level={state.goal.current}
          onXp={actions.addXp}
          onComplete={actions.completeDiagnostic}
        />
      )}

      {state.step === "result" && state.result && (
        <ResultScreen result={state.result} onContinue={actions.goToRoadmap} />
      )}

      {state.step === "roadmap" && (
        <RoadmapScreen
          goal={state.goal}
          result={state.result}
          modules={roadmap}
          completedModules={state.completedModules}
          onStartLesson={actions.startLesson}
          onReset={actions.reset}
        />
      )}

      {state.step === "lesson" && activeLesson && (
        <LessonScreen
          lesson={activeLesson}
          onBack={actions.goToRoadmap}
          onComplete={(score, errors) =>
            actions.completeLesson(score, errors, activeModule?.skill ?? activeLesson.skill)
          }
        />
      )}

      {state.step === "lesson-result" && state.lastLessonScore && (
        <LessonResultScreen score={state.lastLessonScore} onNext={actions.goToRoadmap} />
      )}
    </main>
  )
}
