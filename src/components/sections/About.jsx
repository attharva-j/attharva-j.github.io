import React, { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { about, expertise, identity, links } from '../../content'
import { cascade, drawX, inView, rise } from '../../motion/variants'
import SectionHeading from '../shell/SectionHeading'
import RichText from '../ui/RichText'
import Label from '../ui/Label'

const PROFILE_LINKS = [links.email, links.linkedin, links.github]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative">
      <div className="shell">
        <SectionHeading id="about-title">About</SectionHeading>

        <ReadingStatement
          text={about.summary}
          className="mt-10 max-w-[24ch] text-[clamp(2rem,4.4vw,4.25rem)] font-[500] leading-[1.04] tracking-[-0.04em] md:max-w-[26ch]"
        />

        <div className="mt-[clamp(4.5rem,9vw,8rem)] grid gap-14 lg:grid-cols-12 lg:gap-x-[clamp(2rem,4vw,4rem)]">
          <motion.dl
            className="grid content-start gap-8 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1"
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
          <Label>Core principles</Label>
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
