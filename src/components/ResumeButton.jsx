import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, DownloadSimple, X } from '@phosphor-icons/react'
import Button from './ui/Button'
import { identity, resume } from '../content'
import { useOverlay } from '../hooks/useOverlay'
import { ease, duration } from '../motion/tokens'

// Legacy variant names map onto the two button styles.
const VARIANTS = { primary: 'primary', navbar: 'secondary', secondary: 'secondary', ghost: 'secondary' }

export default function ResumeButton({ variant = 'secondary', className = '', label = 'Resume' }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant={VARIANTS[variant] ?? 'secondary'}
        className={className}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {label}
      </Button>
      <ResumeDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export function ResumeDialog({ open, onClose }) {
  return createPortal(
    <AnimatePresence>{open && <ResumePanel onClose={onClose} />}</AnimatePresence>,
    document.body
  )
}

function ResumePanel({ onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  useOverlay(panelRef, true, onClose, closeRef)

  return (
    <motion.div
      className="fixed inset-0 z-overlay flex items-stretch justify-center bg-ground/90 p-0 md:items-center md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration.base, ease: ease.out }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        aria-describedby="resume-subtitle"
        className="flex h-full w-full max-w-5xl flex-col bg-raised shadow-[0_0_0_1px_rgb(var(--rule))] md:h-[88dvh]"
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: duration.slow, ease: ease.out }}
      >
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-rule px-5 py-4 md:px-7">
          <div>
            <h2 id="resume-title" className="text-lg tracking-tight">
              Resume
            </h2>
            <p id="resume-subtitle" className="meta">
              {identity.titles.resume}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" href={resume.href} target="_blank" rel="noopener noreferrer" icon={ArrowUpRight}>
              Open
            </Button>
            <Button variant="primary" href={resume.href} download={resume.filename} icon={DownloadSimple}>
              Download
            </Button>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close resume"
              className="grid h-12 w-12 place-items-center text-fg/70 transition-transform duration-fast ease-out hover:rotate-90 active:translate-y-px"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="relative flex-1 bg-ground">
          <div className="absolute inset-0 grid place-items-center p-8 text-center">
            <p className="meta max-w-xs">The preview is not available on this device. Use Open or Download above.</p>
          </div>
          <iframe
            src={resume.href}
            title={`${identity.titles.resume}, resume PDF`}
            onLoad={() => setLoaded(true)}
            className={`relative hidden h-full w-full border-0 bg-white transition-opacity duration-base ease-out md:block ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
