// Inference motion system. Mechanical and exact: no bounce, no overshoot.
// Mirrors the CSS custom properties in src/index.css so CSS transitions and
// Framer Motion animations share the same curves and timings.

export const ease = {
  // Entrances and reveals: fast start, long precise settle.
  out: [0.16, 1, 0.3, 1],
  // State changes and transitions between two resting states.
  inOut: [0.7, 0, 0.2, 1]
}

export const duration = {
  fast: 0.18, // hover, press, focus feedback
  base: 0.32, // menus, toggles, small layout moves
  slow: 0.6 // section reveals, hero choreography
}

// Delay between siblings in a list or grid entrance.
export const stagger = 0.04

export const transition = {
  fast: { duration: duration.fast, ease: ease.out },
  base: { duration: duration.base, ease: ease.out },
  slow: { duration: duration.slow, ease: ease.out },
  swap: { duration: duration.base, ease: ease.inOut }
}

// Distance (px) content travels on reveal. Small on purpose.
export const travel = 24
