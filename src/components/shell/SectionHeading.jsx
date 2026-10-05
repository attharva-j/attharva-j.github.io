import React from 'react'
import { motion } from 'framer-motion'
import { inView, maskLine } from '../../motion/variants'
import RailNode from './RailNode'

// Section heading that branches off the pipeline rail: a node sits on the rail,
// a hairline draws across the gutter, then the heading rises from its baseline.
export default function SectionHeading({ id, children, className = '', as: Tag = 'h2' }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={inView}>
      <Tag id={id} className={`relative text-h2 ${className}`}>
        <RailNode top="0.5em" />
        <span className="block overflow-hidden pb-[0.06em]">
          <motion.span className="block" variants={maskLine}>
            {children}
          </motion.span>
        </span>
      </Tag>
    </motion.div>
  )
}
