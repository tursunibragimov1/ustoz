'use client'

import { CheckCircle2, Circle, Clock, PlayCircle, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { roadmap, skillColors, type Goal } from '@/lib/ustoz-data'

export function RoadmapScreen({
  goal,
  correct,
  total,
}: {
  goal: Goal
  correct: number
  total: number
}) {
  const percent = Math.round((correct / total) * 100)

  return (
    <div className="mx-auto max-w-md px-5 pb-12 pt-5">
      <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/12 to-accent/30 p-5">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-primary" aria-hidden />
          <span className="text-sm font-semibold text-primary">
            Tashxis natijasi
          </span>
        </div>
        <p className="mt-2 text-balance leading-relaxed text-foreground">
          Siz{' '}
          <span className="font-display font-bold tabular-nums">
            {correct}/{total}
          </span>{' '}
          savolga to&apos;g&apos;ri javob berdingiz ({percent}%). Sizning
          taxminiy darajangiz{' '}
          <span className="font-display font-bold text-primary">{goal.current}</span>.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Metric label="Hozirgi" value={goal.current} />
          <Metric label="Maqsad" value={goal.target} highlight />
          <Metric label="Muddat" value={goal.months} />
        </div>
      </div>

      <div className="mt-7 flex items-baseline justify-between">
        <h1 className="font-display text-2xl font-bold tracking-tight">
          O&apos;quv reja
        </h1>
        <span className="text-sm font-medium text-muted-foreground">
          {goal.daily} / kun
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Ustozingiz {goal.current} dan {goal.target} gacha bo&apos;lgan yo&apos;lni
        haftalarga bo&apos;ldi.
      </p>

      <ol className="mt-6">
        {roadmap.map((week, i) => {
          const status = i === 0 ? 'active' : 'upcoming'
          const isLast = i === roadmap.length - 1
          return (
            <li key={week.week} className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${
                    status === 'active'
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-muted-foreground'
                  }`}
                >
                  {status === 'active' ? (
                    <PlayCircle className="h-5 w-5" aria-hidden />
                  ) : (
                    <span className="font-display text-sm font-bold">
                      {week.week}
                    </span>
                  )}
                </span>
                {!isLast && <span className="my-1 w-0.5 flex-1 bg-border" />}
              </div>

              <div className={`flex-1 ${isLast ? 'pb-2' : 'pb-6'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {week.week}-hafta
                  </span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary tabular-nums">
                    {week.band}
                  </span>
                </div>
                <h3 className="mt-0.5 text-balance font-display text-lg font-bold leading-tight tracking-tight">
                  {week.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {week.focus}
                </p>

                <div className="mt-3 space-y-2">
                  {week.lessons.map((lesson, li) => (
                    <div
                      key={li}
                      className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                    >
                      {status === 'active' && li === 0 ? (
                        <Circle className="h-5 w-5 shrink-0 fill-primary/15 text-primary" aria-hidden />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-muted-foreground/40" aria-hidden />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {lesson.title}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span
                            className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${
                              skillColors[lesson.skill] ?? 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {lesson.skill}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Clock className="h-3 w-3" aria-hidden />
                            {lesson.minutes} daq
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {status === 'active' && (
                  <Button className="mt-3 h-11 w-full rounded-xl font-semibold">
                    <PlayCircle className="h-4 w-4" aria-hidden />
                    Bugungi darsni boshlash
                  </Button>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Metric({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-xl p-2.5 text-center ${
        highlight ? 'bg-primary text-primary-foreground' : 'bg-card/70'
      }`}
    >
      <p
        className={`text-[11px] font-medium ${
          highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'
        }`}
      >
        {label}
      </p>
      <p className="font-display text-base font-bold tabular-nums">{value}</p>
    </div>
  )
}
