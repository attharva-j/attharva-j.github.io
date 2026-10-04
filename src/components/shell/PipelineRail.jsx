import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Signature motif: a 1px rail in the left gutter that fills as you read, with a
// signal square riding the leading edge. Section headings branch off it
// (see SectionHeading). Desktop and tablet only; phones have no gutter for it.
export default function PipelineRail() {
  const { scrollYProgress } = useScroll()
  const headY = useTransform(scrollYProgress, (value) => `${value * 100}%`)

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-rail hidden w-px md:block"
      style={{
        left: 'calc(max(0px, (100% - 90rem) / 2) + var(--gutter) / 2)',
        top: 'calc(var(--nav-h) + 1.5rem)',
        bottom: '1.5rem'
      }}
    >
      <div className="absolute inset-0 bg-rule" />
      <motion.div className="absolute inset-0 origin-top bg-dim/60" style={{ scaleY: scrollYProgress }} />
      <motion.div className="absolute inset-0" style={{ y: headY }}>
        <span className="absolute -top-[3px] left-[-2.5px] h-1.5 w-1.5 bg-signal" />
      </motion.div>
    </div>
  )
}
