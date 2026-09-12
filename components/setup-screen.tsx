'use client'

import { useState } from 'react'
import { ArrowRight, Clock, Calendar, Gauge, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Goal } from '@/lib/ustoz-data'

const bands = ['4.5', '5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0']
const timeframes = ['2 oy', '3 oy', '4 oy', '6 oy']
const dailyTimes = ['30 daqiqa', '1 soat', '1.5 soat', '2 soat']

export function SetupScreen({
  onContinue,
  onBack,
}: {
  onContinue: (goal: Goal) => void
  onBack: () => void
}) {
  const [current, setCurrent] = useState('5.5')
  const [target, setTarget] = useState('7.0')
  const [months, setMonths] = useState('4 oy')
  const [daily, setDaily] = useState('1 soat')

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
          <Segmented options={bands} value={current} onChange={setCurrent} />
        </Field>

        <Field icon={<Target className="h-4 w-4" aria-hidden />} label="Maqsad darajangiz">
          <Segmented options={bands} value={target} onChange={setTarget} highlight />
        </Field>

        <Field icon={<Calendar className="h-4 w-4" aria-hidden />} label="Muddat">
          <Segmented options={timeframes} value={months} onChange={setMonths} wide />
        </Field>

        <Field
          icon={<Clock className="h-4 w-4" aria-hidden />}
          label="Kunlik mashg\u2018ulot vaqti"
        >
          <Segmented options={dailyTimes} value={daily} onChange={setDaily} wide />
        </Field>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-md px-5 py-4">
          <Button
            size="lg"
            onClick={() => onContinue({ current, target, months, daily })}
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

function Segmented({
  options,
  value,
  onChange,
  highlight,
  wide,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
  highlight?: boolean
  wide?: boolean
}) {
  return (
    <div className={`grid gap-2 ${wide ? 'grid-cols-2' : 'grid-cols-4'}`}>
      {options.map((option) => {
        const active = option === value
        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={active}
            className={`rounded-xl border py-2.5 text-sm font-semibold tabular-nums transition-all ${
              active
                ? highlight
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground'
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
