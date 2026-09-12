"use client"

import { CheckCircle2, Clock, Lock, PlayCircle, RotateCcw, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { skillColors, type DiagnosticResult, type Goal, type RoadmapModule } from "@/lib/ustoz-data"
import { moduleStatus, type ModuleStatus } from "@/lib/ustoz-store"

const statusLabel: Record<ModuleStatus, string> = {
  done: "Bajarilgan",
  current: "Hozirgi",
  next: "Keyingi",
  locked: "Qulflangan",
}

export function RoadmapScreen({
  goal,
  result,
  modules,
  completedModules,
  onStartLesson,
  onReset,
}: {
  goal: Goal
  result: DiagnosticResult | null
  modules: RoadmapModule[]
  completedModules: string[]
  onStartLesson: (module: RoadmapModule) => void
  onReset: () => void
}) {
  const doneCount = completedModules.length
  const percent = Math.round((doneCount / modules.length) * 100)
  const levelLabel = goal.current === "unknown" ? result?.level ?? "B1" : goal.current

  return (
    <div className="mx-auto max-w-md px-5 pb-12 pt-5">
      <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/12 to-accent/30 p-5">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-primary" aria-hidden />
          <span className="text-sm font-semibold text-primary">Shaxsiy rejangiz</span>
        </div>
        <p className="mt-2 text-balance leading-relaxed text-foreground">
          Ustozingiz{" "}
          <span className="font-display font-bold text-primary">{levelLabel}</span>{" "}
          darajasidan{" "}
          <span className="font-display font-bold text-primary">{goal.target}</span>{" "}
          maqsadigacha {goal.months}lik yo&apos;lni tuzib chiqdi.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Metric label="Daraja" value={levelLabel} />
          <Metric label="Maqsad" value={goal.target.replace("IELTS ", "")} highlight />
          <Metric label="Muddat" value={goal.months} />
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-medium text-foreground">
            <span>Umumiy progress</span>
            <span className="tabular-nums">
              {doneCount}/{modules.length} modul
            </span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-card/70">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-7 flex items-baseline justify-between">
        <h1 className="font-display text-2xl font-bold tracking-tight">O&apos;quv reja</h1>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          Qayta boshlash
        </button>
      </div>

      <ol className="mt-5">
        {modules.map((module, i) => {
          const status = moduleStatus(module, i, modules, completedModules)
          const isLast = i === modules.length - 1
          return (
            <li key={module.id} className="relative flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${
                    status === "done"
                      ? "border-success bg-success text-success-foreground"
                      : status === "current"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {status === "done" ? (
                    <CheckCircle2 className="h-5 w-5" aria-hidden />
                  ) : status === "current" ? (
                    <PlayCircle className="h-5 w-5" aria-hidden />
                  ) : status === "locked" ? (
                    <Lock className="h-4 w-4" aria-hidden />
                  ) : (
                    <span className="font-display text-sm font-bold">{module.order}</span>
                  )}
                </span>
                {!isLast && <span className="my-1 w-0.5 flex-1 bg-border" />}
              </div>

              <div className={`flex-1 ${isLast ? "pb-2" : "pb-6"}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${
                      skillColors[module.skill] ?? "bg-muted text-muted-foreground"
                    }`}
                  >
                    {module.skill}
                  </span>
                  <StatusBadge status={status} label={statusLabel[status]} />
                </div>
                <h3 className="mt-1 text-balance font-display text-lg font-bold leading-tight tracking-tight">
                  {module.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {module.description}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="h-3 w-3" aria-hidden />
                  {module.minutes} daqiqa
                </div>

                {status === "current" && (
                  <Button
                    onClick={() => onStartLesson(module)}
                    className="mt-3 h-11 w-full rounded-xl font-semibold"
                  >
                    <PlayCircle className="h-4 w-4" aria-hidden />
                    Darsni boshlash
                  </Button>
                )}
                {status === "done" && (
                  <Button
                    variant="outline"
                    onClick={() => onStartLesson(module)}
                    className="mt-3 h-10 w-full rounded-xl text-sm font-semibold"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden />
                    Takrorlash
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

function StatusBadge({ status, label }: { status: ModuleStatus; label: string }) {
  const cls =
    status === "done"
      ? "bg-success/15 text-success"
      : status === "current"
        ? "bg-primary/15 text-primary"
        : status === "next"
          ? "bg-accent/60 text-accent-foreground"
          : "bg-muted text-muted-foreground"
  return (
    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${cls}`}>
      {label}
    </span>
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
        highlight ? "bg-primary text-primary-foreground" : "bg-card/70"
      }`}
    >
      <p
        className={`text-[11px] font-medium ${
          highlight ? "text-primary-foreground/80" : "text-muted-foreground"
        }`}
      >
        {label}
      </p>
      <p className="font-display text-base font-bold tabular-nums">{value}</p>
    </div>
  )
}
