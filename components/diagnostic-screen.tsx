'use client'

import { useState } from 'react'
import { ArrowRight, Check, X, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { diagnosticQuestions } from '@/lib/ustoz-data'

export function DiagnosticScreen({
  onComplete,
  onXp,
}: {
  onComplete: (correct: number, total: number) => void
  onXp: (amount: number) => void
}) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [locked, setLocked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const question = diagnosticQuestions[index]
  const total = diagnosticQuestions.length
  const isLast = index === total - 1
  const isCorrect = selected === question.correctIndex

  function choose(i: number) {
    if (locked) return
    setSelected(i)
    setLocked(true)
    if (i === question.correctIndex) {
      setCorrectCount((c) => c + 1)
      onXp(10)
    }
  }

  function next() {
    const finalCorrect = correctCount
    if (isLast) {
      onComplete(finalCorrect, total)
      return
    }
    setIndex((n) => n + 1)
    setSelected(null)
    setLocked(false)
  }

  return (
    <div className="mx-auto max-w-md px-5 pb-28 pt-5">
      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-muted-foreground">Tashxis testi</span>
        <span className="font-display font-semibold tabular-nums text-foreground">
          {index + 1} / {total}
        </span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${((index + (locked ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <div className="mt-6">
        <span className="inline-flex rounded-full bg-accent/60 px-3 py-1 text-xs font-semibold text-accent-foreground">
          {question.skill}
        </span>
        <h2 className="mt-4 text-balance font-display text-xl font-bold leading-snug tracking-tight">
          {question.question}
        </h2>
      </div>

      <div className="mt-5 space-y-3">
        {question.options.map((option, i) => {
          const isChosen = selected === i
          const showCorrect = locked && i === question.correctIndex
          const showWrong = locked && isChosen && i !== question.correctIndex

          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={locked}
              className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${
                showCorrect
                  ? 'border-success bg-success/10'
                  : showWrong
                    ? 'border-destructive bg-destructive/10'
                    : isChosen
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/40'
              } ${locked ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                  showCorrect
                    ? 'bg-success text-success-foreground'
                    : showWrong
                      ? 'bg-destructive text-white'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {showCorrect ? (
                  <Check className="h-4 w-4" aria-hidden />
                ) : showWrong ? (
                  <X className="h-4 w-4" aria-hidden />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span className="text-sm font-medium leading-snug text-foreground">
                {option}
              </span>
            </button>
          )
        })}
      </div>

      {locked && (
        <div
          className={`mt-5 rounded-2xl border p-4 ${
            isCorrect
              ? 'border-success/30 bg-success/5'
              : 'border-warning/40 bg-warning/10'
          }`}
        >
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <Check className="h-4 w-4 text-success" aria-hidden />
            ) : (
              <Lightbulb className="h-4 w-4 text-warning-foreground" aria-hidden />
            )}
            <p className="text-sm font-semibold text-foreground">
              {isCorrect ? "To'g'ri! +10 XP" : "Keling, tushuntiraman"}
            </p>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {question.explanation}
          </p>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-md px-5 py-4">
          <Button
            size="lg"
            onClick={next}
            disabled={!locked}
            className="h-13 w-full rounded-2xl py-3.5 text-base font-semibold shadow-lg shadow-primary/20"
          >
            {isLast ? 'Natijani ko\u2018rish' : 'Keyingi savol'}
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  )
}
