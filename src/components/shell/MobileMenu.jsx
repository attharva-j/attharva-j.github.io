import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { SECTIONS } from '../../lib/sections'
import { identity, links } from '../../content'
import { useOverlay } from '../../hooks/useOverlay'
import { ease, duration, stagger } from '../../motion/tokens'
import ResumeButton from '../ResumeButton'

const SOCIAL = [links.github, links.linkedin, links.medium]

export default function MobileMenu({ open, onClose, activeId }) {
  return createPortal(
    <AnimatePresence>{open && <MenuPanel onClose={onClose} activeId={activeId} />}</AnimatePresence>,
    document.body
  )
}

function MenuPanel({ onClose, activeId }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  useOverlay(panelRef, true, onClose, closeRef)

  return (
    <motion.div
      ref={panelRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-overlay flex flex-col bg-ground"
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
      initial={{ y: '-100%' }}
      animate={{ y: '0%' }}
      exit={{ y: '-100%' }}
      transition={{ duration: duration.slow, ease: ease.inOut }}
    >
      <div className="shell flex h-nav items-center justify-between">
        <span className="flex items-center gap-3">
          <span aria-hidden="true" className="h-3.5 w-[7px] bg-signal" />
          <span className="text-[0.9375rem] font-[560] tracking-[-0.02em]">{identity.name}</span>
        </span>
        <button ref={closeRef} type="button" onClick={onClose} className="group flex h-11 items-center gap-3">
          <span className="text-sm font-[480]">Close</span>
          <span aria-hidden="true" className="relative h-5 w-5">
            <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-fg" />
            <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-fg" />
          </span>
        </button>
      </div>

      <nav aria-label="Primary" className="shell flex flex-1 flex-col justify-center">
        <motion.ul
          className="flex flex-col"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { delayChildren: 0.18, staggerChildren: stagger * 1.5 } } }}
        >
          {SECTIONS.map((section) => {
            const active = activeId === section.id
            return (
              <li key={section.id} className="overflow-hidden">
                <motion.div
                  variants={{
                    hidden: { y: '100%' },
                    visible: { y: '0%', transition: { duration: duration.slow, ease: ease.out } }
                  }}
                >
                  <Link
                    to={section.path}
                    onClick={onClose}
                    aria-current={active ? 'true' : undefined}
                    className="flex items-center gap-4 py-1.5 text-[clamp(2.5rem,11vw,4rem)] font-[560] leading-[1.05] tracking-[-0.045em]"
                  >
                    <span className={active ? '' : 'opacity-60'}>{section.label}</span>
                    {active && <span aria-hidden="true" className="h-2.5 w-2.5 bg-signal" />}
                  </Link>
                </motion.div>
              </li>
            )
          })}
        </motion.ul>
      </nav>

      <motion.div
        className="shell flex flex-wrap items-end justify-between gap-6 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.45, duration: duration.base } }}
      >
        <ul className="flex flex-col gap-1.5">
          {SOCIAL.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="textlink text-sm">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <ResumeButton variant="secondary" />
      </motion.div>
    </motion.div>
  )
}
