"use client"

import { ArrowRight, TrendingUp, TrendingDown, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { DiagnosticResult, Skill } from "@/lib/ustoz-data"

const skillLabel: Record<string, string> = {
  Vocabulary: "Lug\u2018at",
  Grammar: "Grammatika",
  Reading: "O\u2018qish",
}

export function ResultScreen({
  result,
  onContinue,
}: {
  result: DiagnosticResult
  onContinue: () => void
}) {
  const skills = Object.entries(result.skillScores) as [
    keyof DiagnosticResult["skillScores"],
    DiagnosticResult["skillScores"][keyof DiagnosticResult["skillScores"]],
  ][]

  return (
    <div className="mx-auto max-w-md px-5 pb-28 pt-6">
      <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/12 to-accent/30 p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
          <Award className="h-6 w-6" aria-hidden />
        </div>
        <p className="mt-3 text-sm font-medium text-muted-foreground">
          Sizning taxminiy darajangiz
        </p>
        <p className="font-display text-5xl font-bold tracking-tight text-primary">
          {result.level}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">
          {result.total} savoldan{" "}
          <span className="font-display font-bold tabular-nums">
            {result.correct} ta
          </span>{" "}
          to&apos;g&apos;ri javob berdingiz ({result.percent}%).
        </p>
      </div>

      <h2 className="mt-7 font-display text-lg font-bold tracking-tight">
        Ko&apos;nikmalar bo&apos;yicha natija
      </h2>
      <div className="mt-3 space-y-3">
        {skills.map(([name, score]) => (
          <div key={name} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-foreground">{skillLabel[name] ?? name}</span>
              <span className="tabular-nums text-muted-foreground">
                {score.correct}/{score.total} \u00b7 {score.percent}%
              </span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  score.percent >= 60 ? "bg-success" : "bg-warning"
                }`}
                style={{ width: `${score.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3">
        <InsightCard
          tone="success"
          icon={<TrendingUp className="h-4 w-4" aria-hidden />}
          title="Kuchli tomonlaringiz"
          items={result.strengths.map((s) => skillLabel[s] ?? s)}
        />
        <InsightCard
          tone="warning"
          icon={<TrendingDown className="h-4 w-4" aria-hidden />}
          title="Rivojlantirish kerak"
          items={result.weaknesses.map((s) => skillLabel[s] ?? s)}
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-md px-5 py-4">
          <Button
            size="lg"
            onClick={onContinue}
            className="h-13 w-full rounded-2xl py-3.5 text-base font-semibold shadow-lg shadow-primary/20"
          >
            Shaxsiy rejani ko\u2018rish
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  )
}

function InsightCard({
  tone,
  icon,
  title,
  items,
}: {
  tone: "success" | "warning"
  icon: React.ReactNode
  title: string
  items: string[]
}) {
  const toneClass =
    tone === "success"
      ? "border-success/30 bg-success/5 text-success"
      : "border-warning/40 bg-warning/10 text-warning-foreground"
  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
      <div className="flex items-center gap-2 text-sm font-semibold">
        {icon}
        {title}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
