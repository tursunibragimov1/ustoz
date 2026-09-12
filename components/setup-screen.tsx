"use client"

import { useState } from "react"
import { ArrowRight, Calendar, Gauge, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  durationOptions,
  levelOptions,
  targetOptions,
  type Goal,
  type Level,
} from "@/lib/ustoz-data"

export function SetupScreen({
  initial,
  onContinue,
  onBack,
}: {
  initial: Goal
  onContinue: (goal: Goal) => void
  onBack: () => void
}) {
  const [current, setCurrent] = useState<Level>(initial.current)
  const [target, setTarget] = useState(initial.target)
  const [months, setMonths] = useState(initial.months)

  return (
    <div className="mx-auto max-w-md px-5 pb-28 pt-6">
      <button
        onClick={onBack}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; Orqaga
      </button>

      <h1 className="mt-4 text-balance font-display text-2xl font-bold tracking-tight">
        Maqsadingizni belgilang
      </h1>
      <p className="mt-2 leading-relaxed text-muted-foreground">
        Ustozingiz shu ma&apos;lumotlar asosida shaxsiy reja tuzadi.
      </p>

      <div className="mt-6 space-y-5">
        <Field icon={<Gauge className="h-4 w-4" aria-hidden />} label="Hozirgi darajangiz">
          <div className="grid grid-cols-3 gap-2">
            {levelOptions.map((opt) => (
              <Chip
                key={opt.value}
                active={current === opt.value}
                onClick={() => setCurrent(opt.value)}
                label={opt.label}
              />
            ))}
          </div>
        </Field>

        <Field icon={<Target className="h-4 w-4" aria-hidden />} label="Maqsadingiz">
          <div className="grid grid-cols-2 gap-2">
            {targetOptions.map((opt) => (
              <Chip
                key={opt}
                active={target === opt}
                onClick={() => setTarget(opt)}
                label={opt}
                highlight
              />
            ))}
          </div>
        </Field>

        <Field icon={<Calendar className="h-4 w-4" aria-hidden />} label="Muddat">
          <div className="grid grid-cols-4 gap-2">
            {durationOptions.map((opt) => (
              <Chip
                key={opt}
                active={months === opt}
                onClick={() => setMonths(opt)}
                label={opt}
              />
            ))}
          </div>
        </Field>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-md px-5 py-4">
          <Button
            size="lg"
            onClick={() => onContinue({ current, target, months })}
            className="h-13 w-full rounded-2xl py-3.5 text-base font-semibold shadow-lg shadow-primary/20"
          >
            Darajani aniqlash
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  )
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        {label}
      </div>
      {children}
    </div>
  )
}

function Chip({
  active,
  onClick,
  label,
  highlight,
}: {
  active: boolean
  onClick: () => void
  label: string
  highlight?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-xl border py-2.5 text-center text-sm font-semibold tabular-nums transition-all ${
        active
          ? highlight
            ? "border-primary bg-primary text-primary-foreground shadow-sm"
            : "border-primary bg-primary/10 text-primary"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  )
}
