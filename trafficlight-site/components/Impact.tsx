'use client'

import { motion } from 'framer-motion'
import { Clock, TrendingDown, Gauge, Droplets, Leaf } from 'lucide-react'
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline'

const EASE_SHARP = [0.22, 1, 0.36, 1] as const

const impactData = [
  {
    id: 1,
    title: '12.7% less travel time',
    date: 'Proven',
    content: 'Vehicles reached their destinations 13% faster on average across all measured routes during the prototype trial.',
    category: 'Efficiency',
    icon: Clock,
    relatedIds: [],
    status: 'completed' as const,
    energy: 95,
  },
  {
    id: 2,
    title: '22.5% less waiting time',
    date: 'Proven',
    content: 'Cumulative red-light waiting time dropped by 23% — the most direct measure of intersection-level optimization in the trial.',
    category: 'Efficiency',
    icon: TrendingDown,
    relatedIds: [],
    status: 'completed' as const,
    energy: 95,
  },
  {
    id: 3,
    title: '9.4% fewer stops',
    date: 'Proven',
    content: 'Vehicles stopped at lights 9.4% less often, reducing the stop-and-go cycles that wear down engines and frustrate drivers.',
    category: 'Flow',
    icon: Gauge,
    relatedIds: [],
    status: 'completed' as const,
    energy: 95,
  },
  {
    id: 4,
    title: '19.2% less fuel',
    date: 'Proven',
    content: 'Fuel consumption fell by 19% across the trial network — a direct consequence of fewer stops and less idling at every intersection.',
    category: 'Environment',
    icon: Droplets,
    relatedIds: [],
    status: 'completed' as const,
    energy: 95,
  },
  {
    id: 5,
    title: '19.2% fewer emissions',
    date: 'Proven',
    content: 'CO₂ and particulate emissions dropped by 19%, mirroring the fuel savings and confirming the environmental case for adaptive signal control.',
    category: 'Environment',
    icon: Leaf,
    relatedIds: [],
    status: 'completed' as const,
    energy: 95,
  },
]

export default function Impact() {
  return (
    <section id="impact" className="bg-[#0a0a0a] overflow-hidden py-6 sm:py-8 lg:py-10">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center">

        {/* ── Text: first on mobile, right on desktop ── */}
        <motion.div
          className="order-1 lg:order-2 w-full lg:w-1/2 px-6 md:px-10 pb-6 lg:py-0"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE_SHARP }}
        >
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: '#00FF88' }}
          >
            Our Impact
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl mb-5">
            Real results,{' '}
            <span style={{ color: '#00FF88' }}>measurable change.</span>
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed mb-4 max-w-md"
            style={{ color: '#ebebeb' }}
          >
            Real results from our V1 AI traffic light optimizer prototype, compared to the current system on Danforth Avenue from Coxwell Avenue to Greenwood Avenue in Toronto.
          </p>
          <p className="text-sm" style={{ color: '#6b7280' }}>
            Click any node to explore.
          </p>
        </motion.div>

        {/* ── Orbital timeline: second on mobile, left on desktop ── */}
        <motion.div
          className="order-2 lg:order-1 w-full lg:w-1/2 shrink-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_SHARP }}
        >
          <RadialOrbitalTimeline timelineData={impactData} />
        </motion.div>

      </div>
    </section>
  )
}
