"use client"

import { ArrowRight, PartyPopper, Sparkles, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { LessonScore } from "@/lib/ustoz-store"

export function LessonResultScreen({
  score,
  onNext,
}: {
  score: LessonScore
  onNext: () => void
}) {
  const percent = score.total ? Math.round((score.correct / score.total) * 100) : 0
  const passed = percent >= 60

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 pb-10 pt-6">
      <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/12 to-accent/30 p-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
          <PartyPopper className="h-7 w-7" aria-hidden />
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
          {passed ? "Ajoyib ish!" : "Dars yakunlandi"}
        </h1>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {passed
            ? "Siz bu mavzuni yaxshi o\u2018zlashtirdingiz."
            : "Yaxshi urinish! Bu mavzuni keyinroq takrorlaymiz."}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Stat
            icon={<Target className="h-4 w-4" aria-hidden />}
            label="Natija"
            value={`${score.correct}/${score.total}`}
          />
          <Stat
            icon={<Sparkles className="h-4 w-4" aria-hidden />}
            label="XP olindi"
            value={`+${score.xp}`}
            highlight
          />
        </div>

        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-card/70">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              passed ? "bg-success" : "bg-warning"
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-2 text-sm font-semibold tabular-nums text-foreground">{percent}%</p>
      </div>

      <Button
        size="lg"
        onClick={onNext}
        className="mt-6 h-14 w-full rounded-2xl text-base font-semibold shadow-lg shadow-primary/20"
      >
        Keyingi darsga o\u2018tish
        <ArrowRight className="h-5 w-5" aria-hidden />
      </Button>
    </div>
  )
}

function Stat({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-2xl p-3 text-center ${
        highlight ? "bg-primary text-primary-foreground" : "bg-card"
      }`}
    >
      <div
        className={`flex items-center justify-center gap-1 text-xs font-medium ${
          highlight ? "text-primary-foreground/80" : "text-muted-foreground"
        }`}
      >
        {icon}
        {label}
      </div>
      <p className="mt-1 font-display text-xl font-bold tabular-nums">{value}</p>
    </div>
  )
}
