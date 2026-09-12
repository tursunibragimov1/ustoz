import { Flame, Sparkles, Trophy } from 'lucide-react'

type GamificationBarProps = {
  streak: number
  xp: number
  level: string
}

export function GamificationBar({ streak, xp, level }: GamificationBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-md items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <span className="font-display text-sm font-bold">AI</span>
          </div>
          <span className="font-display text-sm font-semibold tracking-tight text-foreground">
            AI Ustoz
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Stat
            icon={<Flame className="h-3.5 w-3.5 text-warning-foreground" aria-hidden />}
            value={`${streak}`}
            className="bg-warning/25"
            label={`${streak} kunlik streak`}
          />
          <Stat
            icon={<Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />}
            value={`${xp}`}
            className="bg-primary/12"
            label={`${xp} XP ball`}
          />
          <Stat
            icon={<Trophy className="h-3.5 w-3.5 text-success" aria-hidden />}
            value={level}
            className="bg-success/15"
            label={`Daraja: ${level}`}
          />
        </div>
      </div>
    </header>
  )
}

function Stat({
  icon,
  value,
  label,
  className,
}: {
  icon: React.ReactNode
  value: string
  label: string
  className?: string
}) {
  return (
    <div
      className={`flex items-center gap-1 rounded-full px-2.5 py-1 ${className}`}
      aria-label={label}
      title={label}
    >
      {icon}
      <span className="font-display text-xs font-bold tabular-nums text-foreground">
        {value}
      </span>
    </div>
  )
}
