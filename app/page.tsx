'use client'

import { useState } from 'react'
import { GamificationBar } from '@/components/gamification-bar'
import { OnboardingScreen } from '@/components/onboarding-screen'
import { SetupScreen } from '@/components/setup-screen'
import { DiagnosticScreen } from '@/components/diagnostic-screen'
import { RoadmapScreen } from '@/components/roadmap-screen'
import type { Goal } from '@/lib/ustoz-data'

type Step = 'onboarding' | 'setup' | 'diagnostic' | 'roadmap'

export default function Page() {
  const [step, setStep] = useState<Step>('onboarding')
  const [goal, setGoal] = useState<Goal>({
    current: '5.5',
    target: '7.0',
    months: '4 oy',
    daily: '1 soat',
  })
  const [result, setResult] = useState({ correct: 0, total: 0 })
  const [xp, setXp] = useState(120)
  const [streak] = useState(3)
  const level = 'B1'

  return (
    <main className="min-h-dvh bg-background">
      {step !== 'onboarding' && (
        <GamificationBar streak={streak} xp={xp} level={level} />
      )}

      {step === 'onboarding' && (
        <OnboardingScreen onStart={() => setStep('setup')} />
      )}

      {step === 'setup' && (
        <SetupScreen
          onBack={() => setStep('onboarding')}
          onContinue={(g) => {
            setGoal(g)
            setStep('diagnostic')
          }}
        />
      )}

      {step === 'diagnostic' && (
        <DiagnosticScreen
          onXp={(amount) => setXp((x) => x + amount)}
          onComplete={(correct, total) => {
            setResult({ correct, total })
            setStep('roadmap')
          }}
        />
      )}

      {step === 'roadmap' && (
        <RoadmapScreen goal={goal} correct={result.correct} total={result.total} />
      )}
    </main>
  )
}
