import { duration, ease, stagger, travel } from './tokens'

// Single element rising into place. Transform and opacity only.
export const rise = {
  hidden: { opacity: 0, y: travel },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out } }
}

// Parent that cascades its children in order.
export const cascade = (delayChildren = 0, gap = stagger) => ({
  hidden: {},
  visible: { transition: { delayChildren, staggerChildren: gap } }
})

// Line of display type sliding up from behind its own baseline mask.
// The parent must clip (overflow: hidden) for the mask effect.
export const maskLine = {
  hidden: { y: '105%' },
  visible: { y: '0%', transition: { duration: duration.slow * 1.3, ease: ease.out } }
}

// Horizontal rule drawing itself from the left.
export const drawX = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: duration.slow, ease: ease.inOut } }
}

// Shared viewport trigger for scroll reveals.
export const inView = { once: true, amount: 0.25 }
