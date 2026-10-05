import React, { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { about, expertise, identity, links } from '../../content'
import { cascade, drawX, inView, rise } from '../../motion/variants'
import SectionHeading from '../shell/SectionHeading'
import RichText from '../ui/RichText'
import Label from '../ui/Label'
import { DownwardDog, Kettlebell, RolledMat, SeatedFigure, TreePose } from './WellnessLines'

const PROFILE_LINKS = [links.email, links.linkedin, links.github]

// About carries the luxury-wellness world of the current role: a warmer studio
// surface with a ribbed-knit texture, faint one-line drawings of practice and
// training, and rings that breathe. All of it fades in and out at the section's
// edges so the page reads as one continuous surface.
export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative isolate">
      <div aria-hidden="true" className="about-studio pointer-events-none absolute inset-0 -z-10" />

      <div className="shell">
        <SectionHeading id="about-title">About</SectionHeading>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-x-[clamp(2rem,4vw,4rem)]">
          <ReadingStatement
            text={about.summary}
            className="max-w-[24ch] text-[clamp(2rem,4.4vw,4.25rem)] font-[500] leading-[1.04] tracking-[-0.04em] md:max-w-[26ch] lg:col-span-8"
          />
          <BreathingPractice />
        </div>

        <div className="mt-[clamp(4.5rem,9vw,8rem)] grid gap-14 lg:grid-cols-12 lg:gap-x-[clamp(2rem,4vw,4rem)]">
          <div className="lg:col-span-4">
            <motion.dl
              className="grid content-start gap-8 sm:grid-cols-2 lg:grid-cols-1"
              variants={cascade(0, 0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={inView}
            >
              <motion.div variants={rise}>
                <Label as="dt">Role</Label>
                <dd className="mt-2 text-body">{identity.titles.profile}</dd>
              </motion.div>
              <motion.div variants={rise}>
                <Label as="dt">Based in</Label>
                <dd className="mt-2 text-body">{identity.location.short}</dd>
              </motion.div>
              <motion.div variants={rise}>
                <Label as="dt">Expertise</Label>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                    {expertise.map((item) => (
                      <li key={item} className="meta text-fg/80">
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </motion.div>
              <motion.div variants={rise}>
                <Label as="dt">Elsewhere</Label>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                    {PROFILE_LINKS.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="textlink text-body"
                          {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </motion.div>
            </motion.dl>
            <Drift className="mt-20 hidden w-[7.5rem] lg:block" distance={70}>
              <TreePose width="100%" />
            </Drift>
          </div>

          <motion.div
            className="flex flex-col gap-6 text-lead text-fg/65 lg:col-span-7 lg:col-start-6"
            variants={cascade(0.05, 0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
          >
            {about.intro.map((paragraph, index) => (
              <motion.p key={index} variants={rise} className="max-w-[62ch]">
                <RichText segments={paragraph} />
              </motion.p>
            ))}
          </motion.div>
        </div>

        <div className="mt-[clamp(5rem,10vw,9rem)]">
          <div className="flex items-end justify-between gap-8">
            <Label>Core principles</Label>
            <div className="hidden items-end gap-8 md:flex">
              <Drift className="w-[9.5rem]" distance={36}>
                <RolledMat width="100%" />
              </Drift>
              <Drift className="w-[3.75rem]" distance={52}>
                <Kettlebell width="100%" />
              </Drift>
            </div>
          </div>
          <ol className="mt-6">
            {about.principles.map((principle) => (
              <motion.li
                key={principle.title}
                className="relative grid gap-4 py-8 md:grid-cols-12 md:gap-x-[clamp(2rem,4vw,4rem)] md:py-10"
                variants={cascade(0, 0.08)}
                initial="hidden"
                whileInView="visible"
                viewport={inView}
              >
                <motion.span aria-hidden="true" variants={drawX} className="absolute inset-x-0 top-0 h-px origin-left bg-rule" />
                <motion.h4 variants={rise} className="text-h3 font-[540] md:col-span-4">
                  {principle.title}
                </motion.h4>
                <motion.p variants={rise} className="max-w-[56ch] text-body text-fg/65 md:col-span-7 md:col-start-6">
                  {principle.text}
                </motion.p>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          className="mt-[clamp(5rem,10vw,9rem)] grid gap-6 lg:grid-cols-12 lg:gap-x-[clamp(2rem,4vw,4rem)]"
          variants={cascade(0, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          <motion.div variants={rise} className="lg:col-span-4">
            <Label>Beyond work</Label>
            <Drift className="mt-14 hidden w-[13rem] lg:block" distance={44}>
              <DownwardDog width="100%" />
            </Drift>
          </motion.div>
          <div className="flex flex-col gap-5 text-body text-fg/65 lg:col-span-7 lg:col-start-6">
            {about.beyondWork.map((paragraph) => (
              <motion.p key={paragraph} variants={rise} className="max-w-[62ch]">
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// A seated figure inside rings that expand and settle on a slow breath cycle
// (inhale, hold, exhale). The one perpetual motion on the page, and it is
// motivated: the section is about wellness. Still under reduced motion.
function BreathingPractice() {
  const reduceMotion = useReducedMotion()
  const rings = [0.46, 0.66, 0.84, 1]

  return (
    <Drift className="mx-auto w-[min(80vw,19rem)] lg:col-span-4 lg:w-full lg:max-w-[22rem]" distance={50}>
      <div className="relative aspect-square">
        <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 h-full w-full text-fg">
          {rings.map((size, index) => (
            <motion.circle
              key={size}
              cx="100"
              cy="100"
              r={99 * size}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformOrigin: '100px 100px', opacity: 0.16 - index * 0.03 }}
              animate={reduceMotion ? undefined : { scale: [1, 1.07, 1.07, 1] }}
              transition={{
                duration: 9,
                times: [0, 0.4, 0.55, 1],
                ease: [0.45, 0, 0.55, 1],
                repeat: Infinity,
                delay: index * 0.35
              }}
            />
          ))}
        </svg>
        <div className="absolute inset-x-[16%] bottom-[22%] text-fg/30">
          <SeatedFigure width="100%" />
        </div>
      </div>
    </Drift>
  )
}

// Wraps a drawing: it fades in on arrival and drifts against the scroll at its
// own rate, so the drawings sit at different depths behind the type.
function Drift({ children, className = '', distance = 40 }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={`text-fg/[0.22] ${className}`}
      style={reduceMotion ? undefined : { y }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Scroll-linked reading: each word brightens from dim to full ink as the
// statement passes through the viewport. Static and fully lit under reduced motion.
function ReadingStatement({ text, className }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <Word
          key={index}
          progress={scrollYProgress}
          range={[index / words.length, (index + 1) / words.length]}
          still={reduceMotion}
        >
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range, still }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <>
      <motion.span style={still ? undefined : { opacity }}>{children}</motion.span>{' '}
    </>
  )
}
