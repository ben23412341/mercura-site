'use client'

import { motion } from 'framer-motion'

const EASE_SHARP = [0.22, 1, 0.36, 1] as const

// Bar-chart pattern: 8 cols × 6 rows, bars decrease left→right to show
// wait-time optimization. Colors graduate dark→bright as congestion drops.
// Heights per column: [6, 6, 5, 4, 3, 2, 1, 1]
const PIXELS = [
  // row 0 (top)
  '#004d29', '#004d29', '#1a1a1a', '#1a1a1a', '#1a1a1a', '#1a1a1a', '#1a1a1a', '#1a1a1a',
  // row 1
  '#004d29', '#004d29', '#00713d', '#1a1a1a', '#1a1a1a', '#1a1a1a', '#1a1a1a', '#1a1a1a',
  // row 2
  '#004d29', '#004d29', '#00713d', '#00884d', '#1a1a1a', '#1a1a1a', '#1a1a1a', '#1a1a1a',
  // row 3
  '#004d29', '#004d29', '#00713d', '#00884d', '#00aa60', '#1a1a1a', '#1a1a1a', '#1a1a1a',
  // row 4
  '#004d29', '#004d29', '#00713d', '#00884d', '#00aa60', '#00cc6a', '#1a1a1a', '#1a1a1a',
  // row 5 (bottom)
  '#004d29', '#004d29', '#00713d', '#00884d', '#00aa60', '#00cc6a', '#00FF88', '#00FF88',
] as const

export default function Solution() {
  return (
    <section
      id="solution"
      className="py-10 sm:py-12 lg:py-16 relative overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Decorative corner accents */}
      <div
        className="hidden sm:block absolute top-20 right-20 w-3 h-3 sm:w-4 sm:h-4 rounded-full"
        style={{ background: '#00FF88' }}
      />
      <div
        className="hidden sm:block absolute top-32 right-32 w-2 h-2 sm:w-3 sm:h-3 rounded-sm transform rotate-45"
        style={{ background: '#00cc6a' }}
      />
      <div
        className="hidden sm:block absolute top-40 right-16 w-1 h-6 sm:w-2 sm:h-8"
        style={{ background: '#00FF88' }}
      />
      <div
        className="hidden sm:block absolute top-48 right-24 w-4 h-1 sm:w-6 sm:h-2"
        style={{ background: '#00cc6a' }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">

          {/* ── Left: text block ── */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE_SHARP }}
          >
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.22em]"
              style={{ color: '#00FF88' }}
            >
              Our Solution
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Smarter lights.
              <br className="hidden sm:block" />
              <span style={{ color: '#00FF88' }}> Smoother cities.</span>
            </h2>

            <p
              className="text-base sm:text-lg mb-4 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              style={{ color: '#ebebeb' }}
            >
              We replace static timing plans with AI that sees the entire city grid at once.
            </p>

            <p
              className="text-base mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              style={{ color: '#ebebeb', opacity: 0.6 }}
            >
              Our system pulls live data from existing infrastructure such as sensors,
              probe data, and origin destination data and generates optimized timing
              plans across every intersection simultaneously. No isolated fixes. The
              whole network moves together.
            </p>

            <button
              type="button"
              className="rounded-full px-8 py-4 text-sm font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background: '#00FF88',
                color: '#0a0a0a',
                boxShadow: '0 4px 16px rgba(0,255,136,0.12)',
              }}
              onClick={() =>
                document
                  .getElementById('impact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              See the results
            </button>
          </motion.div>

          {/* ── Right: dashboard card ── */}
          <motion.div
            className="relative mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE_SHARP, delay: 0.12 }}
          >
            {/* Tilted card */}
            <div
              className="relative rounded-2xl p-5 shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300 w-80 mx-auto"
              style={{
                background: '#111',
                boxShadow: '0 25px 60px rgba(0,255,136,0.08)',
              }}
            >
              <div className="text-white mb-3 sm:mb-4">
                <div
                  className="text-xs sm:text-sm mb-1 sm:mb-2 font-semibold"
                  style={{ color: '#00FF88' }}
                >
                  Mercura Live
                </div>
                <div className="text-xs" style={{ color: '#6b7280' }}>
                  Traffic AI Dashboard
                </div>
              </div>

              {/* Bar-chart pixel grid */}
              <div className="grid grid-cols-8 gap-1 mb-3">
                {PIXELS.map((color, i) => (
                  <div
                    key={i}
                    className="h-5 rounded-sm"
                    style={{ background: color }}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center text-white text-xs sm:text-sm">
                <div>
                  <div className="mb-1">Active Intersections: 1,247</div>
                  <div className="text-xs" style={{ color: '#6b7280' }}>
                    Status: Optimizing
                  </div>
                </div>
                <div className="text-right">
                  <div className="mb-1" style={{ color: '#00FF88' }}>
                    Waiting Time: -23%
                  </div>
                  <div className="text-xs" style={{ color: '#6b7280' }}>
                    Time of Day: 5:15 PM
                  </div>
                </div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div
              className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 rounded-lg transform rotate-45"
              style={{ background: '#00cc6a' }}
            />
            <div
              className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-4 h-4 sm:w-6 sm:h-6 rounded-full"
              style={{ background: '#00FF88' }}
            />
            <div
              className="hidden sm:block absolute top-1/2 -right-8 w-4 h-12"
              style={{ background: '#00cc6a' }}
            />
            <div
              className="hidden sm:block absolute top-8 right-8 w-2 h-2"
              style={{ background: '#00cc6a' }}
            />
            <div
              className="hidden sm:block absolute bottom-12 left-8 w-3 h-3 rounded-full"
              style={{ background: '#00FF88' }}
            />
            <div
              className="hidden sm:block absolute top-16 left-12 w-2 h-6"
              style={{ background: '#006633' }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
