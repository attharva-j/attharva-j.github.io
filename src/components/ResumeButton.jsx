import React, { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, DownloadSimple, X } from '@phosphor-icons/react'
import Button from './ui/Button'
import { identity, resume } from '../content'
import { useOverlay } from '../hooks/useOverlay'
import { ease, duration } from '../motion/tokens'

// Legacy variant names map onto the two button styles.
const VARIANTS = { primary: 'primary', navbar: 'secondary', secondary: 'secondary', ghost: 'secondary' }

// side: where the note opens relative to the button; align: which edge it hugs.
export default function ResumeButton({
  variant = 'secondary',
  className = '',
  label = 'Resume',
  side = 'bottom',
  align = 'start'
}) {
  if (!resume.available) {
    return <ResumeUnavailable variant={variant} className={className} label={label} side={side} align={align} />
  }
  return <ResumePreviewButton variant={variant} className={className} label={label} />
}

// While the resume is switched off, the button stays in place (so the layout
// does not change) and explains how to get it: a note on hover, focus or tap.
function ResumeUnavailable({ variant, className, label, side, align }) {
  const [shown, setShown] = useState(false)
  const noteId = useId()
  const hideTimer = useRef(null)

  useEffect(() => {
    if (!shown) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setShown(false)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [shown])

  useEffect(() => () => window.clearTimeout(hideTimer.current), [])

  // Taps have no hover, so a tap shows the note for a few seconds.
  const showBriefly = () => {
    setShown(true)
    window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => setShown(false), 3200)
  }

  const position = [
    side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
    align === 'end' ? 'right-0' : 'left-0'
  ].join(' ')

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <Button
        variant={VARIANTS[variant] ?? 'secondary'}
        className={`cursor-help ${className}`}
        aria-disabled="true"
        aria-describedby={noteId}
        onFocus={() => setShown(true)}
        onBlur={() => setShown(false)}
        onClick={showBriefly}
      >
        {label}
      </Button>
      <motion.span
        id={noteId}
        role="tooltip"
        className={`pointer-events-none absolute z-overlay w-max max-w-[16rem] bg-raised px-3 py-2 text-small leading-snug text-fg/85 shadow-[inset_0_0_0_1px_rgb(var(--rule-strong))] ${position}`}
        initial={false}
        animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: side === 'top' ? 4 : -4 }}
        transition={{ duration: duration.fast, ease: ease.out }}
      >
        {resume.unavailableNote}
      </motion.span>
    </span>
  )
}

function ResumePreviewButton({ variant, className, label }) {
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
