import React from 'react'
import { motion } from 'framer-motion'
import { drawX, inView, maskLine } from '../../motion/variants'
import { duration, ease } from '../../motion/tokens'

// Section heading that branches off the pipeline rail: a node sits on the rail,
// a hairline draws across the gutter, then the heading rises from its baseline.
export default function SectionHeading({ id, children, className = '', as: Tag = 'h2' }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={inView}>
      <Tag id={id} className={`relative text-h2 ${className}`}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute hidden md:block"
          style={{ left: 'calc(var(--gutter) / -2)', top: '0.5em' }}
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
        <span className="block overflow-hidden pb-[0.06em]">
          <motion.span className="block" variants={maskLine}>
            {children}
          </motion.span>
        </span>
      </Tag>
    </motion.div>
  )
}
