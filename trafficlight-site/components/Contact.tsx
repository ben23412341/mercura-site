'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ShaderBackground from '@/components/ui/shader-background'

const EASE_SHARP = [0.22, 1, 0.36, 1] as const
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_ME'

const INPUT_BASE =
  'w-full rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all duration-200'
const INPUT_STYLE = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
}

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const focusStyle = (filled: boolean) => ({
    ...INPUT_STYLE,
    ...(filled ? { borderColor: 'rgba(0,255,136,0.5)' } : {}),
  })

  const handleSend = async () => {
    if (!name || !email || !message) return
    setLoading(true)
    setStatus('idle')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0a0a0a] py-16 md:py-20"
      style={{ minHeight: '600px' }}
    >
      {/* WebGL wave background */}
      <ShaderBackground className="absolute inset-0 w-full h-full" />

      {/* Dark gradient overlay — keeps text legible above the waves */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.82) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-xl px-6 md:px-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: EASE_SHARP }}
      >
        {/* Heading */}
        <div className="mb-10 text-center">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: '#00FF88' }}
          >
            Get in touch
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to make your city move smarter?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base" style={{ color: 'rgba(235,235,235,0.7)' }}>
            Whether you&apos;re a city official, a partner, or just curious, we&apos;d love to hear from you.
          </p>
        </div>

        {/* Success message */}
        {status === 'success' && (
          <p
            className="mb-6 rounded-lg px-4 py-3 text-center text-sm font-medium"
            style={{ background: 'rgba(0,255,136,0.1)', color: '#00FF88', border: '1px solid rgba(0,255,136,0.3)' }}
          >
            Thanks, we&apos;ll be in touch soon.
          </p>
        )}

        {/* Error message */}
        {status === 'error' && (
          <p
            className="mb-6 rounded-lg px-4 py-3 text-center text-sm"
            style={{ background: 'rgba(255,59,59,0.1)', color: '#FF3B3B', border: '1px solid rgba(255,59,59,0.3)' }}
          >
            Something went wrong. Please email us directly at{' '}
            <a href="mailto:ben23412341@gmail.com" className="underline">
              ben23412341@gmail.com
            </a>
          </p>
        )}

        {/* Form fields */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={INPUT_BASE}
            style={focusStyle(!!name)}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,255,136,0.6)'
              e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,255,136,0.15)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = name
                ? 'rgba(0,255,136,0.5)'
                : 'rgba(255,255,255,0.1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={INPUT_BASE}
            style={focusStyle(!!email)}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,255,136,0.6)'
              e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,255,136,0.15)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = email
                ? 'rgba(0,255,136,0.5)'
                : 'rgba(255,255,255,0.1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />

          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            className={INPUT_BASE}
            style={{ ...focusStyle(!!message), resize: 'none' }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,255,136,0.6)'
              e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,255,136,0.15)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = message
                ? 'rgba(0,255,136,0.5)'
                : 'rgba(255,255,255,0.1)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={loading}
            className="mt-1 w-full rounded-full py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: '#00FF88',
              color: '#0a0a0a',
              boxShadow: '0 8px 32px rgba(0,255,136,0.25)',
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#7FFF9F' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#00FF88' }}
          >
            {loading ? 'Sending…' : 'Send message'}
          </button>
        </div>

        {/* Direct email */}
        <p className="mt-6 text-center text-xs" style={{ color: '#6b7280' }}>
          Or email us directly at{' '}
          <a
            href="mailto:ben23412341@gmail.com"
            className="transition-colors duration-150 hover:underline"
            style={{ color: '#00FF88' }}
          >
            ben23412341@gmail.com
          </a>
        </p>
      </motion.div>
    </section>
  )
}
