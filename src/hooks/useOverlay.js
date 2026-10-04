import { useEffect, useRef } from 'react'
import { useSmoothScroll } from '../motion/SmoothScroll'

const FOCUSABLE = 'a[href], button:not([disabled]), iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])'

// Open overlays, newest last. Only the topmost one handles Tab and Escape, so
// the resume dialog can open from inside the mobile menu without a tug of war.
const stack = []

// Modal behaviour shared by the mobile menu and the resume dialog:
// locks scroll, makes the app inert, traps Tab, closes on Escape and
// returns focus to whatever opened it.
export function useOverlay(containerRef, open, onClose, initialFocusRef) {
  const { lock, unlock } = useSmoothScroll()
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!open) return undefined
    const token = {}
    stack.push(token)
    const opener = document.activeElement
    const appRoot = document.getElementById('root')
    appRoot?.setAttribute('inert', '')
    lock()

    const frame = requestAnimationFrame(() => {
      const first = initialFocusRef?.current ?? containerRef.current?.querySelector(FOCUSABLE)
      first?.focus()
    })

    const onKeyDown = (event) => {
      if (stack[stack.length - 1] !== token) return
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !containerRef.current) return
      const focusable = [...containerRef.current.querySelectorAll(FOCUSABLE)]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const inside = containerRef.current.contains(document.activeElement)
      if (event.shiftKey && (document.activeElement === first || !inside)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || !inside)) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      stack.splice(stack.indexOf(token), 1)
      if (!stack.length) {
        appRoot?.removeAttribute('inert')
        unlock()
      }
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true })
    }
  }, [open, containerRef, initialFocusRef, lock, unlock])
}
