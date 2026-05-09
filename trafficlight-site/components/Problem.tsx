"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { type CarouselStep } from "@/components/ui/animated-feature-carousel"

// --------------------------------------------------------------------------
// Problem data
// --------------------------------------------------------------------------

const problems: CarouselStep[] = [
  {
    id: "1",
    name: "Problem 01",
    title: "Outdated Technology",
    description:
      "Most traffic lights still run on fixed timers programmed decades ago, blind to the cars actually sitting at the intersection. While every other piece of city infrastructure has gone digital, the lights controlling 320,000+ intersections across North America haven't fundamentally changed since the 1970s.",
  },
  {
    id: "2",
    name: "Problem 02",
    title: "Wasted Time",
    description:
      "Drivers in the GTHA lose upwards of 100 hours every year idling at poorly timed lights — that translates into over $44 billion in annual losses across the region, projected to surpass $100 billion by 2044. Multiply that by every commuter in every Canadian city, and traffic congestion quietly becomes one of the largest hidden taxes on modern life.",
  },
  {
    id: "3",
    name: "Problem 03",
    title: "Emissions",
    description:
      "Every year, idling vehicles in Canada waste billions of litres of fuel and pump millions of tonnes of CO₂ into the air, for cars going nowhere. Across the GTHA, poorly timed intersections aren't just an inconvenience. They're a major, fixable contributor to urban air pollution.",
  },
]

const CARD_COLORS = [
  { accent: '#00FF88', hover: '#7FFF9F' },
  { accent: '#FFD700', hover: '#FFE55C' },
  { accent: '#FF3B3B', hover: '#FF7070' },
]

function hex2rgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

// --------------------------------------------------------------------------
// Card
// --------------------------------------------------------------------------

function ProblemCard({
  problem,
  index,
  accent,
  hoverAccent,
}: {
  problem: CarouselStep
  index: number
  accent: string
  hoverAccent: string
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: "easeOut",
      }}
      className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-8 transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, ${hex2rgba(accent, 0.06)} 0%, #0f0f0f 55%)`,
        borderColor: hovered ? hex2rgba(accent, 0.35) : hex2rgba(accent, 0.15),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top-left corner accent */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-24 w-24 rounded-tl-2xl opacity-40"
        style={{
          background: `radial-gradient(circle at top left, ${hex2rgba(accent, 0.25)} 0%, transparent 70%)`,
        }}
      />

      {/* Number indicator */}
      <span
        className="font-mono text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: hex2rgba(accent, 0.6) }}
      >
        {problem.name}
      </span>

      {/* Large background number — decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-4 right-6 select-none font-bold leading-none"
        style={{ fontSize: "7rem", color: hex2rgba(accent, 0.05) }}
      >
        {problem.id}
      </div>

      {/* Title */}
      <h3
        className="text-xl font-bold tracking-tight md:text-2xl transition-colors duration-300"
        style={{ color: hovered ? hoverAccent : 'white' }}
      >
        {problem.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-slate-400">
        {problem.description}
      </p>

      {/* Bottom rule that grows on hover */}
      <div
        className="mt-auto h-px rounded-full transition-all duration-500"
        style={{
          width: hovered ? '100%' : '2rem',
          background: hovered ? hex2rgba(accent, 0.2) : hex2rgba(accent, 0.3),
        }}
      />
    </motion.div>
  )
}

// --------------------------------------------------------------------------
// Problem section
// --------------------------------------------------------------------------

export default function Problem() {
  return (
    <section id="problem" className="bg-[#0a0a0a] pt-20 pb-16 md:pt-28 md:pb-20">
      <div className="mx-auto max-w-5xl px-6 md:px-10">

        {/* Section heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#00FF88]/60">
            The Problem
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Traffic lights haven&apos;t fundamentally
            <br className="hidden sm:block" />
            <span className="text-[#00FF88]"> changed in 100 years.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-[#ebebeb]/70">
            Fixed timers, outdated infrastructure, and zero updated technology. The cost? Immense and entirely preventable.
          </p>
        </motion.div>

        {/* 3-card bento row */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {problems.map((problem, index) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              index={index}
              accent={CARD_COLORS[index].accent}
              hoverAccent={CARD_COLORS[index].hover}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
