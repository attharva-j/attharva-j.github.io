import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { SECTIONS } from '../../lib/sections'
import { identity } from '../../content'
import { ease, duration } from '../../motion/tokens'
import ResumeButton from '../ResumeButton'
import MobileMenu from './MobileMenu'

const NAV_LINKS = SECTIONS.filter((section) => section.id !== 'top')

// The brand "docks" into the bar once the hero name has scrolled away.
// Progress runs from 0 (hero in view) to 1 (docked), measured in viewport heights.
const dockProgress = (y) => {
  const vh = typeof window === 'undefined' ? 800 : window.innerHeight
  return Math.min(1, Math.max(0, (y - vh * 0.32) / (vh * 0.22)))
}

export default function Navbar({ activeId }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [docked, setDocked] = useState(false)
  const { scrollY } = useScroll()

  const barOpacity = useTransform(scrollY, [0, 120], [0, 1])
  const dock = useTransform(scrollY, dockProgress)
  const brandY = useTransform(dock, [0, 1], ['110%', '0%'])

  // Discrete flag only flips when the threshold is crossed, so the brand link
  // leaves the tab order while it is visually hidden.
  useMotionValueEvent(dock, 'change', (value) => {
    const next = value > 0.5
    if (next !== docked) setDocked(next)
  })

  return (
    <header className="fixed inset-x-0 top-0 z-nav" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 border-b border-rule bg-ground"
        style={{ opacity: barOpacity }}
      />
      <div className="shell relative flex h-nav items-center justify-between gap-8">
        <Link
          to="/"
          aria-label={`${identity.name}, back to top`}
          tabIndex={docked ? 0 : -1}
          aria-hidden={!docked}
          className="group relative flex h-10 items-center overflow-hidden pr-2"
        >
          <motion.span className="flex items-center gap-3" style={{ y: brandY }}>
            <span aria-hidden="true" className="h-3.5 w-[7px] bg-signal" />
            <span className="text-[0.9375rem] font-[560] tracking-[-0.02em]">{identity.name}</span>
          </motion.span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((section) => {
              const active = activeId === section.id
              return (
                <li key={section.id} className="relative">
                  {active && (
                    <motion.span
                      layoutId="nav-signal"
                      aria-hidden="true"
                      className="absolute -left-3 h-1.5 w-1.5 bg-signal"
                      style={{ top: 'calc(50% - 3px)' }}
                      transition={{ duration: duration.base, ease: ease.inOut }}
                    />
                  )}
                  <Link to={section.path} className="navlink" aria-current={active ? 'true' : undefined}>
                    <span className="navlink__text">{section.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <ResumeButton variant="navbar" className="!h-10 !px-4 !text-sm" align="end" />
        </nav>

        <button
          type="button"
          className="group flex h-11 items-center gap-3 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="text-sm font-[480]">Menu</span>
          <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
            <span className="h-px w-full bg-fg transition-transform duration-base ease-in-out group-hover:translate-x-1" />
            <span className="h-px w-3/5 bg-fg transition-transform duration-base ease-in-out group-hover:translate-x-2" />
          </span>
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} activeId={activeId} />
    </header>
  )
}
