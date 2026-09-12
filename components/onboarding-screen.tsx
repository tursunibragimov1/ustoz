import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function OnboardingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 pb-10 pt-8">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <span className="font-display text-sm font-bold">AI</span>
        </div>
        <span className="font-display text-base font-semibold tracking-tight">
          AI Ustoz
        </span>
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-3xl bg-accent/40">
          <Image
            src="/ustoz-hero.png"
            alt="AI Ustoz sizni maqsadingiz sari yetaklaydi"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 480px) 100vw, 320px"
          />
        </div>

        <div className="mt-7 inline-flex items-center gap-1.5 self-start rounded-full bg-primary/10 px-3 py-1">
          <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
          <span className="text-xs font-semibold text-primary">
            Sun&apos;iy intellekt ustozi
          </span>
        </div>

        <h1 className="mt-4 text-pretty font-display text-3xl font-bold leading-tight tracking-tight">
          Men sizni maqsadingizga olib boraman
        </h1>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          Shaxsiy IELTS ustozingiz bilan darajangizni aniqlang, o&apos;quv reja
          tuzing va har kuni oldinga qadam qo&apos;ying.
        </p>

        <div className="mt-7 flex items-center gap-3">
          <LevelCard label="Hozirgi daraja" value="5.5" tone="muted" />
          <ArrowRight className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          <LevelCard label="Maqsad daraja" value="7.0" tone="primary" />
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <Button
          size="lg"
          onClick={onStart}
          className="h-14 w-full rounded-2xl text-base font-semibold shadow-lg shadow-primary/20"
        >
          Boshlash
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Bepul boshlang \u00b7 Kredit karta talab qilinmaydi
        </p>
      </div>
    </div>
  )
}

function LevelCard({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: 'muted' | 'primary'
}) {
  const isPrimary = tone === 'primary'
  return (
    <div
      className={`flex-1 rounded-2xl border p-4 text-center ${
        isPrimary
          ? 'border-primary/30 bg-primary/10'
          : 'border-border bg-card'
      }`}
    >
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p
        className={`mt-1 font-display text-3xl font-bold tabular-nums ${
          isPrimary ? 'text-primary' : 'text-foreground'
        }`}
      >
        {value}
      </p>
    </div>
  )
}
