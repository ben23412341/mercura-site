'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon'
import { useScroll } from '@/components/ui/use-scroll'

const NAV_LINKS = [
  { label: 'Problem',  id: 'problem' },
  { label: 'Solution', id: 'solution' },
  { label: 'Impact',   id: 'impact' },
  { label: 'Contact',  id: 'contact' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [open, setOpen] = React.useState(false)
  const scrolled = useScroll(10)

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNavClick = (id: string) => {
    setOpen(false)
    // small delay lets the mobile menu close before jumping
    setTimeout(() => scrollTo(id), open ? 150 : 0)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-[#00FF88]/10 shadow-lg shadow-black/30 backdrop-blur-md'
          : 'border-b border-transparent',
        scrolled ? 'bg-[#0a0a0a]/80' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 md:px-10">

        {/* Logo */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 focus:outline-none"
        >
          <Image
            src="/logo.png"
            alt="Mercura"
            width={148}
            height={44}
            className="h-11 w-auto"
            priority
          />
        </button>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'text-white/60 hover:text-[#00FF88] hover:bg-[#00FF88]/8 transition-colors duration-150',
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="rounded-full px-5 py-2 text-sm font-semibold text-[#0a0a0a] transition-all duration-200 hover:scale-105 focus:outline-none"
            style={{
              background: '#00FF88',
              boxShadow: '0 4px 20px rgba(0,255,136,0.2)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#7FFF9F' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#00FF88' }}
          >
            Get in touch
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'md:hidden text-white',
          )}
        >
          <MenuToggleIcon open={open} className="size-5" duration={300} />
        </button>
      </nav>

      {/* Mobile slide-down panel */}
      <div
        className={cn(
          'fixed inset-0 top-14 z-50 flex flex-col backdrop-blur-xl md:hidden transition-all duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        style={{ background: 'rgba(10,10,10,0.97)' }}
      >
        <div className="flex h-full flex-col justify-between p-6">
          <div className="grid gap-y-1 pt-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'justify-start text-base text-white/70 hover:text-[#00FF88] hover:bg-[#00FF88]/8',
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="w-full rounded-full py-3 text-sm font-semibold text-[#0a0a0a] transition-all duration-200 hover:scale-[1.02]"
            style={{ background: '#00FF88' }}
          >
            Get in touch
          </button>
        </div>
      </div>
    </motion.header>
  )
}
