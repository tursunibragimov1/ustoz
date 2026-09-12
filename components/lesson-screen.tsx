"use client"

import { useState } from "react"
import { ArrowRight, BookOpen, Check, Lightbulb, Target, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { normalize, type Lesson } from "@/lib/ustoz-data"
import type { ErrorEntry } from "@/lib/ustoz-store"

type Phase = "learn" | "exercise"

export function LessonScreen({
  lesson,
  onBack,
  onComplete,
}: {
  lesson: Lesson
  onBack: () => void
  onComplete: (
    score: { lessonId: string; correct: number; total: number; xp: number },
    errors: ErrorEntry[],
  ) => void
}) {
  const [phase, setPhase] = useState<Phase>("learn")

  if (phase === "learn") {
    return <LearnView lesson={lesson} onBack={onBack} onStart={() => setPhase("exercise")} />
  }
  return <ExerciseView lesson={lesson} onComplete={onComplete} />
}

// ---------------------------------------------------------------------------
function LearnView({
  lesson,
  onBack,
  onStart,
}: {
  lesson: Lesson
  onBack: () => void
  onStart: () => void
}) {
  return (
    <div className="mx-auto max-w-md px-5 pb-28 pt-5">
      <button
        onClick={onBack}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; Rejaga qaytish
      </button>

      <div className="mt-4 flex items-center gap-2">
        <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          {lesson.skill}
        </span>
        <span className="inline-flex rounded-full bg-accent/60 px-2.5 py-1 text-xs font-semibold text-accent-foreground">
          {lesson.level}
        </span>
      </div>

      <h1 className="mt-3 text-balance font-display text-2xl font-bold tracking-tight">
        {lesson.title}
      </h1>

      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
        <Target className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-foreground">Dars maqsadi</p>
          <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
            {lesson.objective}
          </p>
        </div>
      </div>

      <Section icon={<BookOpen className="h-4 w-4" aria-hidden />} title="Tushuntirish">
        <p className="text-sm leading-relaxed text-foreground">{lesson.explanation}</p>
      </Section>

      <Section title="Misollar">
        <ul className="space-y-2">
          {lesson.examples.map((ex, i) => (
            <li
              key={i}
              className="rounded-xl border border-border bg-card p-3 text-sm leading-relaxed text-foreground"
            >
              {ex}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Lug\u2018at">
        <div className="grid grid-cols-1 gap-2">
          {lesson.vocabulary.map((v) => (
            <div
              key={v.word}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-3"
            >
              <span className="text-sm font-semibold text-foreground">{v.word}</span>
              <span className="text-sm text-muted-foreground">{v.meaning}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Grammatik eslatma">
        <p className="rounded-xl border border-warning/40 bg-warning/10 p-3 text-sm leading-relaxed text-foreground">
          {lesson.grammarNote}
        </p>
      </Section>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-md px-5 py-4">
          <Button
            size="lg"
            onClick={onStart}
            className="h-13 w-full rounded-2xl py-3.5 text-base font-semibold shadow-lg shadow-primary/20"
          >
            Mashqlarni boshlash ({lesson.exercises.length})
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  )
}

function Section({
  icon,
  title,
  children,
}: {
  icon?: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 flex items-center gap-2 font-display text-base font-bold tracking-tight">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  )
}

// ---------------------------------------------------------------------------
function ExerciseView({
  lesson,
  onComplete,
}: {
  lesson: Lesson
  onComplete: (
    score: { lessonId: string; correct: number; total: number; xp: number },
    errors: ErrorEntry[],
  ) => void
}) {
  const [index, setIndex] = useState(0)
  const [checked, setChecked] = useState(false)
  const [choice, setChoice] = useState<string | null>(null)
  const [text, setText] = useState("")
  const [correctCount, setCorrectCount] = useState(0)
  const [errors, setErrors] = useState<ErrorEntry[]>([])

  const exercise = lesson.exercises[index]
  const total = lesson.exercises.length
  const isLast = index === total - 1

  const userAnswer = exercise.type === "mcq" ? choice ?? "" : text
  const isCorrect =
    exercise.type === "mcq"
      ? normalize(userAnswer) === normalize(exercise.answer)
      : normalize(userAnswer) === normalize(exercise.answer) ||
        (exercise.type === "fill" &&
          (exercise.accept ?? []).some((a) => normalize(a) === normalize(userAnswer)))

  const canCheck = exercise.type === "mcq" ? choice !== null : text.trim().length > 0

  function check() {
    if (!canCheck || checked) return
    setChecked(true)
    if (isCorrect) {
      setCorrectCount((c) => c + 1)
    } else {
      setErrors((prev) => [
        ...prev,
        {
          id: `x-${exercise.id}-${Date.now()}`,
          itemId: `${lesson.id}-${exercise.id}`,
          topic: lesson.topic,
          skill: lesson.skill,
          wrongAnswer: userAnswer || "(bo\u2018sh)",
          correctAnswer: exercise.answer,
          errorType: "exercise",
          level: lesson.level,
          attemptCount: 1,
          createdAt: Date.now(),
        },
      ])
    }
  }

  function next() {
    if (isLast) {
      const finalCorrect = correctCount
      onComplete(
        { lessonId: lesson.id, correct: finalCorrect, total, xp: finalCorrect * 20 },
        errors,
      )
      return
    }
    setIndex((n) => n + 1)
    setChecked(false)
    setChoice(null)
    setText("")
  }

  return (
    <div className="mx-auto max-w-md px-5 pb-28 pt-5">
      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-muted-foreground">{lesson.title} \u2014 mashqlar</span>
        <span className="font-display font-semibold tabular-nums text-foreground">
          {index + 1} / {total}
        </span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${((index + (checked ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <h2 className="mt-6 text-balance font-display text-lg font-bold leading-snug tracking-tight">
        {exercise.prompt}
      </h2>

      {exercise.type === "mcq" ? (
        <div className="mt-5 space-y-3">
          {exercise.options.map((option) => {
            const chosen = choice === option
            const showCorrect = checked && normalize(option) === normalize(exercise.answer)
            const showWrong = checked && chosen && !showCorrect
            return (
              <button
                key={option}
                type="button"
                disabled={checked}
                onClick={() => setChoice(option)}
                className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left text-sm font-medium leading-snug transition-all ${
                  showCorrect
                    ? "border-success bg-success/10 text-foreground"
                    : showWrong
                      ? "border-destructive bg-destructive/10 text-foreground"
                      : chosen
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/40"
                } ${checked ? "cursor-default" : "cursor-pointer"}`}
              >
                {checked && (showCorrect || showWrong) && (
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                      showCorrect
                        ? "bg-success text-success-foreground"
                        : "bg-destructive text-white"
                    }`}
                  >
                    {showCorrect ? (
                      <Check className="h-4 w-4" aria-hidden />
                    ) : (
                      <X className="h-4 w-4" aria-hidden />
                    )}
                  </span>
                )}
                {option}
              </button>
            )
          })}
        </div>
      ) : (
        <div className="mt-5">
          <input
            type="text"
            value={text}
            disabled={checked}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                checked ? next() : check()
              }
            }}
            placeholder="Javobingizni yozing\u2026"
            autoComplete="off"
            className={`w-full rounded-2xl border bg-card p-4 text-base font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary ${
              checked
                ? isCorrect
                  ? "border-success"
                  : "border-destructive"
                : "border-border"
            }`}
          />
        </div>
      )}

      {checked && (
        <div
          className={`mt-5 rounded-2xl border p-4 ${
            isCorrect ? "border-success/30 bg-success/5" : "border-warning/40 bg-warning/10"
          }`}
        >
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <Check className="h-4 w-4 text-success" aria-hidden />
            ) : (
              <Lightbulb className="h-4 w-4 text-warning-foreground" aria-hidden />
            )}
            <p className="text-sm font-semibold text-foreground">
              {isCorrect ? "To'g'ri! +20 XP" : `To'g'ri javob: ${exercise.answer}`}
            </p>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {exercise.explanation}
          </p>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-md px-5 py-4">
          {checked ? (
            <Button
              size="lg"
              onClick={next}
              className="h-13 w-full rounded-2xl py-3.5 text-base font-semibold shadow-lg shadow-primary/20"
            >
              {isLast ? "Darsni yakunlash" : "Keyingi mashq"}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={check}
              disabled={!canCheck}
              className="h-13 w-full rounded-2xl py-3.5 text-base font-semibold shadow-lg shadow-primary/20"
            >
              Tekshirish
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
