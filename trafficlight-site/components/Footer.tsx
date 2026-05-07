'use client'

import React from 'react'
import Image from 'next/image'
import type { ComponentProps, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// --------------------------------------------------------------------------
// Types
// --------------------------------------------------------------------------

interface FooterSection {
  label: string
  links: { title: string; scrollId: string }[]
}

// --------------------------------------------------------------------------
// Data
// --------------------------------------------------------------------------

const footerSections: FooterSection[] = [
  {
    label: 'Navigate',
    links: [
      { title: 'Problem',    scrollId: 'problem' },
      { title: 'Solution',   scrollId: 'solution' },
      { title: 'Impact',     scrollId: 'impact' },
      { title: 'Validation', scrollId: 'validation' },
      { title: 'Contact',    scrollId: 'contact' },
    ],
  },
]

// --------------------------------------------------------------------------
// AnimatedContainer
// --------------------------------------------------------------------------

type AnimatedContainerProps = {
  delay?: number
  className?: ComponentProps<typeof motion.div>['className']
  children: ReactNode
}

function AnimatedContainer({ className, delay = 0.1, children }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) return <>{children}</>

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// --------------------------------------------------------------------------
// Footer
// --------------------------------------------------------------------------

export default function Footer() {
  return (
    <footer className="relative w-full" style={{ background: '#050505' }}>
      {/* Top green glow line */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/5 rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.35), transparent)',
          filter: 'blur(1px)',
        }}
      />

      <div className="mx-auto max-w-6xl px-6 md:px-10 py-16 lg:py-20">

        {/* ── Logo + links in a row ── */}
        <AnimatedContainer>
          <div className="flex flex-wrap items-center justify-between gap-8">
            <Image
              src="/logo.png"
              alt="Mercura"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
            />
            <div className="flex flex-wrap items-center gap-8">
              {footerSections[0].links.map((link) => (
                <button
                  key={link.title}
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(link.scrollId)
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="text-sm transition-colors duration-150"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#00FF88' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
                >
                  {link.title}
                </button>
              ))}
            </div>
          </div>
        </AnimatedContainer>

        {/* ── Bottom bar ── */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-8 sm:flex-row"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(235,235,235,0.4)' }}>
            © 2026 Mercura. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'rgba(235,235,235,0.4)' }}>
            Built for the cities of tomorrow.
          </p>
        </div>

      </div>
    </footer>
  )
}
