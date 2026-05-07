'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const EASE_SHARP = [0.22, 1, 0.36, 1] as const

interface Validator {
  photo: string
  name: string
  title: string
  organization: string
  credentials: string
  quote: string
}

const validators: Validator[] = [
  {
    photo: '/baher.png',
    name: 'Baher Abdulhai',
    title: 'Professor, Dept. of Civil & Mineral Engineering',
    organization: 'University of Toronto',
    credentials: 'Expert in Intelligent Transportation Systems',
    quote:
      'A city-wide system like the one you are creating would absolutely be useful. It can save people a lot of time and therefore money. In addition to money, pollution would also drop. And the cherry on top is less anxiety in traffic, which is priceless!',
  },
  {
    photo: '/luke.jpg',
    name: 'Luke Piette',
    title: 'Director of Product-Led Growth',
    organization: 'RunPod',
    credentials: 'Extensive experience in AI infrastructure and compute',
    quote:
      'Yes, doing something like what you are proposing is definitely possible. You don\'t even need to validate it, it is possible.',
  },
]

function ValidatorCard({ v, delay }: { v: Validator; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE_SHARP, delay }}
      whileHover={{ y: -4 }}
      className="group flex flex-col gap-5 rounded-2xl border p-8 transition-colors duration-300"
      style={{
        background: '#111111',
        borderColor: 'rgba(0,255,136,0.2)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,255,136,0.5)'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 8px 40px rgba(0,255,136,0.08)'
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,255,136,0.2)'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
      }}
    >
      {/* Photo */}
      <div className="flex flex-col items-center gap-4">
        <img
          src={v.photo}
          alt={v.name}
          width={80}
          height={80}
          style={{
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            boxShadow: '0 0 0 2px rgba(0,255,136,0.4)',
          }}
        />

        {/* Identity */}
        <div className="text-center">
          <p className="text-base font-bold text-white">{v.name}</p>
          <p className="mt-0.5 text-sm font-medium" style={{ color: '#00FF88' }}>
            {v.title}
          </p>
          <p className="text-sm font-medium" style={{ color: '#00cc6a' }}>
            {v.organization}
          </p>
          <p className="mt-1 text-xs" style={{ color: '#6b7280' }}>
            {v.credentials}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: '#1f1f1f' }} />

      {/* Quote */}
      <div className="flex flex-col gap-3">
        <Quote
          className="h-6 w-6 shrink-0"
          style={{ color: '#00FF88' }}
          strokeWidth={1.5}
        />
        <p
          className="text-sm italic leading-relaxed text-white/85"
          style={{ lineHeight: '1.7' }}
        >
          {v.quote}
        </p>
      </div>
    </motion.div>
  )
}

export default function Validation() {
  return (
    <section id="validation" className="bg-[#0a0a0a] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-10">

        {/* Section heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE_SHARP }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: '#00FF88' }}>
            Validation
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Backed by experts.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base" style={{ color: 'rgba(235,235,235,0.7)' }}>
            Industry leaders and researchers see the future of AI in urban mobility.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {validators.map((v, i) => (
            <ValidatorCard key={v.name} v={v} delay={i * 0.2} />
          ))}
        </div>

      </div>
    </section>
  )
}
