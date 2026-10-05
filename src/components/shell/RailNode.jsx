import React from 'react'
import { motion } from 'framer-motion'
import { drawX } from '../../motion/variants'
import { duration, ease } from '../../motion/tokens'

// A branch off the pipeline rail: a square node sitting on the rail and a
// hairline drawn across the gutter to the content. Place inside a positioned
// element whose left edge is the content column; `top` sets the branch height.
// Animates with the nearest parent's hidden/visible variants.
export default function RailNode({ top = '0.5em' }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute hidden md:block"
      style={{ left: 'calc(var(--gutter) / -2)', top }}
    >
      <motion.span
        className="absolute left-[-3.5px] top-[-3.5px] h-[7px] w-[7px] border border-rule-strong bg-ground"
        variants={{
          hidden: { scale: 0 },
          visible: { scale: 1, transition: { duration: duration.base, ease: ease.out } }
        }}
      />
      <motion.span
        className="absolute left-[4px] top-0 block h-px origin-left bg-rule-strong"
        style={{ width: 'calc(var(--gutter) / 2 - 1rem)' }}
        variants={drawX}
      />
    </span>
  )
}
