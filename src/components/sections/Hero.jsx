import React, { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight } from '@phosphor-icons/react'
import { hero, identity } from '../../content'
import { duration, ease } from '../../motion/tokens'
import Button from '../ui/Button'
import ResumeButton from '../ResumeButton'
import StreamedHeadline from './StreamedHeadline'
import portrait from '../../assets/portfolioimage.jpg'

// Load choreography (seconds from mount). Each beat waits for the one before.
const BEAT = {
  eyebrow: 0.15,
  name: 0.25,
  portrait: 0.55,
  stream: 0.95, // headline tokens start
  copy: 1.75 // intro + actions, once the stream is mostly through
}

const nameLine = {
  hidden: { y: '102%' },
  visible: (i) => ({
    y: '0%',
    transition: { duration: duration.slow * 1.6, ease: ease.out, delay: BEAT.name + i * 0.09 }
  })
}

const fadeUp = (delay) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: ease.out, delay } }
})

export default function Hero() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  // The portrait is above the fold from tablet up; on phones it follows the
  // actions, so it should not compete with the first screen for bandwidth.
  const [aboveFold] = useState(() => typeof window === 'undefined' || window.matchMedia('(min-width: 768px)').matches)

  // Scroll-linked exit: the name lifts and recedes as the nav brand docks in,
  // the portrait drifts slower than the page for a little depth.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -160])
  const nameScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.84])
  const nameOpacity = useTransform(scrollYProgress, [0.2, 0.55], [1, 0])
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const copyOpacity = useTransform(scrollYProgress, [0.35, 0.75], [1, 0])

  // Reduced motion: final state on first paint, nothing tied to scroll.
  const linked = (style) => (reduceMotion ? undefined : style)

  return (
    <section id="top" ref={ref} aria-labelledby="hero-name" className="hero relative z-[1] pt-nav">
      <motion.div
        className="shell relative flex flex-col pb-[clamp(4rem,9vw,8rem)] pt-[clamp(1.5rem,4vh,3rem)] md:static"
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
      >
        <motion.p variants={fadeUp(BEAT.eyebrow)} className="flex h-6 items-center gap-2.5 text-small text-fg/70">
          <span aria-hidden="true" className="h-2 w-2 bg-signal" />
          {identity.availability}
        </motion.p>

        <motion.h1
          id="hero-name"
          tabIndex={-1}
          className="relative z-[1] mt-5 origin-top-left font-[600] tracking-[-0.06em]"
          style={{ fontSize: 'var(--name-size)', lineHeight: 0.86, ...linked({ y: nameY, scale: nameScale, opacity: nameOpacity }) }}
        >
          {[identity.firstName, identity.lastName].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <motion.span className="block" custom={i} variants={nameLine}>
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Portrait as a full-height band: it bleeds off the right edge of the
            screen, dissolves slowly toward the name and fades out at the top and
            bottom, so it has no closed outline. Tone pulled down and a fine
            ground-colour scanline tie it to the interface. On phones it is a
            full-width band after the actions. */}
        <motion.figure
          className="pointer-events-none relative order-last -mx-[var(--gutter)] mt-6 aspect-[4/5] md:absolute md:inset-y-0 md:right-0 md:order-none md:mx-0 md:mt-0 md:aspect-auto md:w-[clamp(19rem,40vw,46rem)]"
          style={linked({ y: portraitY })}
        >
          <div className="portrait-band relative h-full">
            <div className="portrait-band__y absolute inset-0">
              <motion.img
                src={portrait}
                alt={`Portrait of ${identity.name}`}
                width="460"
                height="460"
                fetchpriority={aboveFold ? 'high' : 'auto'}
                loading={aboveFold ? 'eager' : 'lazy'}
                decoding="async"
                className="h-full w-full object-cover object-[50%_24%] grayscale contrast-[1.14] brightness-[0.74]"
                variants={{
                  hidden: { scale: 1.06 },
                  visible: { scale: 1, transition: { duration: 1.8, ease: ease.out, delay: BEAT.portrait } }
                }}
              />
              {/* The photo itself is painted at once (so it counts for LCP); this
                  ground-coloured veil fades away to reveal it from the dark. */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 bg-ground"
                variants={{
                  hidden: { opacity: 1 },
                  visible: { opacity: 0, transition: { duration: 1.8, ease: ease.out, delay: BEAT.portrait } }
                }}
              />
              <span aria-hidden="true" className="portrait-scanlines absolute inset-0" />
            </div>
          </div>
        </motion.figure>

        <motion.div
          className="relative z-[1] mt-8 max-w-[44rem] md:pr-[clamp(13rem,28vw,24rem)] lg:pr-0 xl:max-w-[54rem]"
          style={linked({ opacity: copyOpacity })}
        >
          <StreamedHeadline
            words={hero.headline}
            startDelay={BEAT.stream * 1000}
            className="text-[clamp(1.5rem,1.4vw+1rem,2.375rem)] font-[520] leading-[1.15] tracking-[-0.03em]"
          />
          <motion.p variants={fadeUp(BEAT.copy)} className="mt-5 max-w-[58ch] text-lead text-fg/65">
            {hero.intro}
          </motion.p>
          <motion.div variants={fadeUp(BEAT.copy + 0.12)} className="mt-8 flex flex-wrap items-center gap-3">
            <Button to="/projects" variant="primary" icon={ArrowDownRight}>
              View projects
            </Button>
            <ResumeButton variant="secondary" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
