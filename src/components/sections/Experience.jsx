import React from 'react'
import { motion } from 'framer-motion'
import { about, experience, stats } from '../../content'
import { splitFigure } from '../../lib/figures'
import { cascade, drawX, inView, maskLine, rise } from '../../motion/variants'
import SectionHeading from '../shell/SectionHeading'
import RailNode from '../shell/RailNode'
import RichText from '../ui/RichText'
import MarkedList from '../ui/MarkedList'
import Label from '../ui/Label'

// The section's one signal figure; the remaining stats keep their original order.
const LEAD_STAT = stats.find((stat) => stat.label === 'Cost Savings')
const OTHER_STATS = stats.filter((stat) => stat !== LEAD_STAT)

const BLOCK_GAP = 'mt-[clamp(5rem,10vw,9rem)]'

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y relative">
      <div className="shell">
        <SectionHeading id="experience-title">Experience</SectionHeading>
        <motion.p
          className="mt-6 max-w-[60ch] text-lead text-fg/65"
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          {experience.summary}
        </motion.p>

        <Stats />
        <Journey />
        <Roles />
        <Credentials />
      </div>
    </section>
  )
}

function Stats() {
  return (
    <motion.div
      className="relative mt-[clamp(4rem,8vw,7rem)] grid gap-12 pt-10 lg:grid-cols-12 lg:gap-x-[clamp(2rem,4vw,4rem)]"
      variants={cascade(0, 0.07)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      <motion.span aria-hidden="true" variants={drawX} className="absolute inset-x-0 top-0 h-px origin-left bg-rule" />
      <div className="lg:col-span-6">
        <p>
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span
              variants={maskLine}
              className="block font-mono text-[clamp(4.5rem,11vw,10.5rem)] font-[450] leading-[0.9] tracking-[-0.06em] text-signal tabular"
            >
              {LEAD_STAT.value}
            </motion.span>
          </span>{' '}
          <motion.span variants={rise} className="mt-4 block text-lead text-fg/80">
            {LEAD_STAT.label}
          </motion.span>
        </p>
      </div>
      <dl className="flex flex-col lg:col-span-5 lg:col-start-8">
        {OTHER_STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={rise}
            className="flex items-baseline justify-between gap-6 border-b border-rule py-5 first:pt-0"
          >
            <dt className="text-body text-fg/70">{stat.label}</dt>
            <dd className="font-mono text-[clamp(2.25rem,3.6vw,3.5rem)] font-[450] leading-none tracking-[-0.05em] tabular">
              {stat.value}
            </dd>
          </motion.div>
        ))}
      </dl>
    </motion.div>
  )
}

function Journey() {
  return (
    <motion.div
      className={`${BLOCK_GAP} grid gap-6 lg:grid-cols-12 lg:gap-x-[clamp(2rem,4vw,4rem)]`}
      variants={cascade(0, 0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      <motion.div variants={rise} className="lg:col-span-4">
        <Label>Professional journey</Label>
      </motion.div>
      <div className="flex flex-col gap-6 text-lead text-fg/65 lg:col-span-7 lg:col-start-6">
        {about.journey.map((paragraph, index) => (
          <motion.p key={index} variants={rise} className="max-w-[62ch]">
            <RichText segments={paragraph} />
          </motion.p>
        ))}
      </div>
    </motion.div>
  )
}

// Roles branch off the pipeline rail, so the rail itself becomes the timeline.
function Roles() {
  return (
    <ol className={BLOCK_GAP} aria-label="Roles">
      {experience.roles.map((role) => (
        <motion.li
          key={`${role.company}-${role.period}`}
          className="relative grid gap-8 border-t border-rule py-[var(--pad)] lg:grid-cols-12 lg:gap-x-[clamp(2rem,4vw,4rem)]"
          style={{ '--pad': 'clamp(3rem, 6vw, 5.5rem)' }}
          variants={cascade(0, 0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          <RailNode top="calc(var(--pad) + 0.65rem)" />

          <motion.div variants={rise} className="flex flex-wrap gap-x-6 gap-y-1 lg:col-span-3 lg:flex-col">
            <p className="font-mono text-small text-fg tabular">{role.period}</p>
            <p className="meta">{role.type}</p>
            <p className="meta">{role.location}</p>
          </motion.div>

          <div className="lg:col-span-9">
            <motion.h3 variants={rise} className="text-h3 font-[560]">
              {role.role}
              <span className="mt-1 block text-lead font-[420] tracking-normal text-fg/60">{role.company}</span>
            </motion.h3>

            <dl className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
              {role.impact.map((item) => (
                <ImpactReadout key={item.label + item.value} item={item} />
              ))}
            </dl>

            <motion.div variants={rise} className="mt-12">
              <Label as="h4">Key contributions</Label>
              <MarkedList items={role.highlights} />
            </motion.div>
          </div>
        </motion.li>
      ))}
    </ol>
  )
}

function ImpactReadout({ item }) {
  const { figure, rest } = splitFigure(item.value)
  return (
    <motion.div variants={rise} className="border-l border-rule-strong pl-4">
      <dt className="meta">{item.label}</dt>
      <dd className="mt-2">
        {figure ? (
          <>
            <span className="block font-mono text-[clamp(1.75rem,2.6vw,2.5rem)] font-[450] leading-none tracking-[-0.05em] tabular">
              {figure}
            </span>{' '}
            <span className="mt-2 block text-small text-fg/70">{rest}</span>
          </>
        ) : (
          <span className="block text-lead leading-snug">{rest}</span>
        )}
      </dd>
    </motion.div>
  )
}

function Credentials() {
  return (
    <div className={`${BLOCK_GAP} grid gap-16 lg:grid-cols-12 lg:gap-x-[clamp(2rem,4vw,4rem)]`}>
      <motion.div
        className="lg:col-span-5"
        variants={cascade(0, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
      >
        <motion.div variants={rise}>
          <Label>Education</Label>
        </motion.div>
        {about.education.map((entry) => (
          <motion.article key={entry.degree} variants={rise} className="mt-6 border-t border-rule pt-6">
            <p className="font-mono text-small text-fg/70 tabular">{entry.date}</p>
            <h4 className="mt-3 text-[1.375rem] font-[540] leading-snug tracking-[-0.02em]">{entry.degree}</h4>
            <p className="meta mt-1.5">{entry.school}</p>
            <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-fg/65">{entry.text}</p>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        className="lg:col-span-6 lg:col-start-7"
        variants={cascade(0.1, 0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
      >
        <motion.div variants={rise}>
          <Label>Recognition</Label>
        </motion.div>
        {about.recognition.map((entry) => (
          <motion.article key={entry.title} variants={rise} className="mt-6 border-t border-rule pt-6">
            <h4 className="text-[1.375rem] font-[540] leading-snug tracking-[-0.02em]">{entry.title}</h4>
            <p className="meta mt-1.5">{entry.source}</p>
            <p className="mt-4 max-w-[56ch] text-[0.9375rem] leading-relaxed text-fg/65">
              <RichText segments={entry.text} />
            </p>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
}
