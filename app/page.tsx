'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [streak, setStreak] = useState(3)
  const [isLoaded, setIsLoaded] = useState(false)
  const level = 'B1'

  useEffect(() => {
    const savedState = localStorage.getItem('ustoz-state')
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        if (parsed.step) setStep(parsed.step)
        if (parsed.goal) setGoal(parsed.goal)
        if (parsed.result) setResult(parsed.result)
        if (parsed.xp !== undefined) setXp(parsed.xp)
        if (parsed.streak !== undefined) setStreak(parsed.streak)
      } catch (e) {
        console.error('Failed to parse state from localStorage', e)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('ustoz-state', JSON.stringify({
        step, goal, result, xp, streak
      }))
    }
  }, [step, goal, result, xp, streak, isLoaded])

  if (!isLoaded) return null

  const variants = {
    initial: { opacity: 0, x: 20 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  }

  return (
    <main className="min-h-dvh bg-background">
      {step !== 'onboarding' && (
        <GamificationBar streak={streak} xp={xp} level={level} />
      )}

      <AnimatePresence mode="wait">
        {step === 'onboarding' && (
          <motion.div
            key="onboarding"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <OnboardingScreen onStart={() => setStep('setup')} />
          </motion.div>
        )}

        {step === 'setup' && (
          <motion.div
            key="setup"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <SetupScreen
              onBack={() => setStep('onboarding')}
              onContinue={(g) => {
                setGoal(g)
                setStep('diagnostic')
              }}
            />
          </motion.div>
        )}

        {step === 'diagnostic' && (
          <motion.div
            key="diagnostic"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <DiagnosticScreen
              onXp={(amount) => setXp((x) => x + amount)}
              onComplete={(correct, total) => {
                setResult({ correct, total })
                setStep('roadmap')
              }}
            />
          </motion.div>
        )}

        {step === 'roadmap' && (
          <motion.div
            key="roadmap"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <RoadmapScreen goal={goal} correct={result.correct} total={result.total} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
