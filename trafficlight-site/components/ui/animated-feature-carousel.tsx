"use client"

import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
} from "react"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
  type Variants,
} from "framer-motion"
import { cn } from "@/lib/utils"

// --------------------------------------------------------------------------
// Types
// --------------------------------------------------------------------------

type WrapperStyle = MotionStyle & {
  "--x": MotionValue<string>
  "--y": MotionValue<string>
}

export interface CarouselStep {
  id: string
  name: string
  title: string
  description: string
}

// --------------------------------------------------------------------------
// Constants
// --------------------------------------------------------------------------

// BezierDefinition requires readonly [number, number, number, number]
const EASE_SHARP = [0.22, 1, 0.36, 1] as const

const stepVariants: Variants = {
  inactive: { scale: 0.9, opacity: 0.7 },
  active: { scale: 1, opacity: 1 },
}

// --------------------------------------------------------------------------
// Hooks
// --------------------------------------------------------------------------

function useNumberCycler(totalSteps: number, interval = 5000) {
  const [currentNumber, setCurrentNumber] = useState(0)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCurrentNumber((prev) => (prev + 1) % totalSteps)
    }, interval)
    return () => clearTimeout(timerId)
  }, [currentNumber, totalSteps, interval])

  const setStep = useCallback(
    (stepIndex: number) => setCurrentNumber(stepIndex % totalSteps),
    [totalSteps],
  )

  return { currentNumber, setStep }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return isMobile
}

// --------------------------------------------------------------------------
// Icons
// --------------------------------------------------------------------------

function IconCheck({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  )
}

// --------------------------------------------------------------------------
// FeatureCard
// --------------------------------------------------------------------------

function FeatureCard({
  step,
  steps,
}: {
  step: number
  steps: readonly CarouselStep[]
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useIsMobile()

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      className="group relative w-full rounded-2xl"
      onMouseMove={handleMouseMove}
      style={
        {
          "--x": useMotionTemplate`${mouseX}px`,
          "--y": useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      <div className="relative w-full overflow-hidden rounded-3xl border border-[#00FF88]/15 bg-[#0d0d0d] transition-colors duration-300 hover:border-[#00FF88]/30">
        <div className="m-10 min-h-[240px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex w-full max-w-2xl flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: EASE_SHARP }}
            >
              <motion.div
                className="text-sm font-semibold uppercase tracking-wider text-[#00FF88]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.3, ease: EASE_SHARP }}
              >
                {steps[step].name}
              </motion.div>

              <motion.h2
                className="text-2xl font-bold tracking-tight text-white md:text-3xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: EASE_SHARP }}
              >
                {steps[step].title}
              </motion.h2>

              <motion.p
                className="text-base leading-relaxed text-slate-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: EASE_SHARP }}
              >
                {steps[step].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

// --------------------------------------------------------------------------
// StepsNav
// --------------------------------------------------------------------------

function StepsNav({
  steps: stepItems,
  current,
  onChange,
}: {
  steps: readonly CarouselStep[]
  current: number
  onChange: (index: number) => void
}) {
  return (
    <nav aria-label="Progress" className="flex justify-center px-4">
      <ol
        className="flex w-full flex-wrap items-center justify-center gap-2"
        role="list"
      >
        {stepItems.map((step, stepIdx) => {
          const isCompleted = current > stepIdx
          const isCurrent = current === stepIdx
          return (
            <motion.li
              key={step.name}
              initial="inactive"
              animate={isCurrent ? "active" : "inactive"}
              variants={stepVariants}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <button
                type="button"
                className={cn(
                  "group flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00FF88] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]",
                  isCurrent
                    ? "bg-[#00FF88] text-[#0a0a0a]"
                    : "border border-[#00FF88]/20 bg-[#111] text-slate-400 hover:border-[#00FF88]/40 hover:bg-[#00FF88]/10",
                )}
                onClick={() => onChange(stepIdx)}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    isCompleted
                      ? "bg-[#00FF88] text-[#0a0a0a]"
                      : isCurrent
                        ? "bg-[#7FFF9F] text-[#0a0a0a]"
                        : "bg-[#00FF88]/10 text-slate-400 group-hover:bg-[#00FF88]/20",
                  )}
                >
                  {isCompleted ? (
                    <IconCheck className="h-3.5 w-3.5" />
                  ) : (
                    <span>{stepIdx + 1}</span>
                  )}
                </span>
                <span className="hidden sm:inline-block">{step.name}</span>
              </button>
            </motion.li>
          )
        })}
      </ol>
    </nav>
  )
}

// --------------------------------------------------------------------------
// FeatureCarousel (public export)
// --------------------------------------------------------------------------

export function FeatureCarousel({
  steps,
  interval = 5000,
}: {
  steps: readonly CarouselStep[]
  interval?: number
}) {
  const { currentNumber: step, setStep } = useNumberCycler(steps.length, interval)

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-4">
      <FeatureCard step={step} steps={steps} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <StepsNav current={step} onChange={setStep} steps={steps} />
      </motion.div>
    </div>
  )
}
