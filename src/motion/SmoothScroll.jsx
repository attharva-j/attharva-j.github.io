import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'

const SmoothScrollContext = createContext(null)

// Quartic in-out: matches the --ease-in-out family for programmatic travel.
const travelEasing = (t) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2)

const resolveTarget = (target) => (typeof target === 'string' ? document.querySelector(target) : target)

export function SmoothScroll({ children }) {
  const reduceMotion = useReducedMotion()
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    if (reduceMotion) return undefined
    const instance = new Lenis({ autoRaf: true, lerp: 0.12, wheelMultiplier: 0.95 })
    setLenis(instance)
    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [reduceMotion])

  const scrollTo = useCallback(
    (target, { immediate = false, onComplete } = {}) => {
      const element = target === 0 ? null : resolveTarget(target)
      if (target !== 0 && !element) return
      if (lenis && !immediate) {
        lenis.scrollTo(target === 0 ? 0 : element, { duration: 1.25, easing: travelEasing, onComplete })
        return
      }
      const top = target === 0 ? 0 : element.getBoundingClientRect().top + window.scrollY
      if (lenis) lenis.scrollTo(top, { immediate: true, force: true })
      else window.scrollTo({ top, behavior: 'auto' })
      onComplete?.()
    },
    [lenis]
  )

  const lock = useCallback(() => {
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
  }, [lenis])

  const unlock = useCallback(() => {
    document.documentElement.style.overflow = ''
    lenis?.start()
  }, [lenis])

  const value = useMemo(() => ({ lenis, scrollTo, lock, unlock }), [lenis, scrollTo, lock, unlock])

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>
}

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext)
  if (!context) throw new Error('useSmoothScroll must be used inside <SmoothScroll>')
  return context
}
