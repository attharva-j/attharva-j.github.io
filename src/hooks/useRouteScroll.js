import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { sectionForPath } from '../lib/sections'
import { useSmoothScroll } from '../motion/SmoothScroll'

// Maps the URL to a section. First load jumps instantly; later navigations
// travel there and then hand keyboard focus to the section heading.
export function useRouteScroll() {
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollTo } = useSmoothScroll()
  const firstRun = useRef(true)
  // Lenis initialises after mount and changes scrollTo's identity; reading it
  // through a ref keeps that from re-running the effect as a fake navigation.
  const scrollToRef = useRef(scrollTo)
  scrollToRef.current = scrollTo

  useEffect(() => {
    const section = sectionForPath(location.pathname)
    if (!section) {
      navigate('/', { replace: true })
      return undefined
    }

    let cancelled = false
    const target = section.id === 'top' ? 0 : `#${section.id}`
    const go = (immediate) => {
      if (cancelled) return
      scrollToRef.current(target, {
        immediate,
        onComplete: () => {
          if (immediate) return
          const heading = document.querySelector(`#${section.id} h1, #${section.id} h2`)
          heading?.setAttribute('tabindex', '-1')
          heading?.focus({ preventScroll: true })
        }
      })
    }

    const frame = requestAnimationFrame(() => {
      // Read and clear inside the frame: StrictMode's discarded first effect
      // run is cancelled before it gets here, so it cannot consume the flag.
      const immediate = firstRun.current
      firstRun.current = false
      if (!immediate) {
        go(false)
        return
      }
      // Deep link on first load: jump now, then again once web fonts have
      // swapped in, since the swap changes the height of everything above.
      go(true)
      document.fonts?.ready.then(() => requestAnimationFrame(() => go(true)))
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
    // location.key re-runs the effect when the same link is clicked twice.
  }, [location.pathname, location.key, navigate])
}
