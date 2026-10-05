import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy } from '@phosphor-icons/react'
import { contact, identity, links } from '../../content'
import { cascade, inView, maskLine, rise } from '../../motion/variants'
import RailNode from '../shell/RailNode'
import Label from '../ui/Label'
import ResumeButton from '../ResumeButton'

const CHANNELS = [links.linkedin, links.github, links.medium]
const BLOCK_GAP = 'mt-[clamp(5rem,10vw,9rem)]'

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative">
      <div className="shell">
        {/* Closing bookend: the heading returns to the hero's display scale. */}
        <motion.div initial="hidden" whileInView="visible" viewport={inView}>
          <h2
            id="contact-title"
            className="relative text-[clamp(3.25rem,10vw,9.5rem)] font-[600] leading-[0.9] tracking-[-0.055em]"
          >
            <RailNode top="0.5em" />
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" variants={maskLine}>
                {contact.heading}
              </motion.span>
            </span>
          </h2>
        </motion.div>
        <motion.p
          className="mt-8 max-w-[52ch] text-lead text-fg/65"
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          {contact.intro}
        </motion.p>

        <EmailLine />

        <div className={`${BLOCK_GAP} grid gap-16 lg:grid-cols-12 lg:gap-x-[clamp(2rem,4vw,4rem)]`}>
          <Channels />
          <Details />
        </div>

        <div className={`${BLOCK_GAP} grid gap-16 lg:grid-cols-12 lg:gap-x-[clamp(2rem,4vw,4rem)]`}>
          <motion.div
            className="lg:col-span-5"
            variants={cascade(0, 0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
          >
            <motion.div variants={rise}>
              <Label>Open to</Label>
            </motion.div>
            <dl className="mt-6 flex flex-col gap-8">
              {contact.collaborations.map((item) => (
                <motion.div key={item.title} variants={rise}>
                  <dt className="text-h3 font-[540]">{item.title}</dt>
                  <dd className="mt-2 max-w-[44ch] text-body text-fg/65">{item.text}</dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            className="lg:col-span-6 lg:col-start-7"
            variants={cascade(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={inView}
          >
            <motion.div variants={rise}>
              <Label>{contact.topicsHeading}</Label>
            </motion.div>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {contact.topics.map((topic) => (
                <motion.li key={topic} variants={rise} className="border-t border-rule py-3 text-body text-fg/80">
                  {topic}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// The address is the call to action: set large, underlined in signal on hover,
// with a copy control for people who would rather paste it into their own client.
function EmailLine() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email.value)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <motion.div
      className="mt-[clamp(3.5rem,7vw,6rem)]"
      variants={cascade(0, 0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      <motion.div variants={rise}>
        <Label as="p">{links.email.label}</Label>
      </motion.div>
      <motion.div variants={rise} className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-4">
        <a
          href={links.email.href}
          className="email-link relative text-[clamp(1.5rem,4.4vw,4.25rem)] font-[500] leading-[1.1] tracking-[-0.04em]"
        >
          {links.email.value}
        </a>
        <button
          type="button"
          onClick={copy}
          className="group flex h-11 items-center gap-2 px-3 text-small text-fg/70 shadow-[inset_0_0_0_1px_rgb(var(--rule-strong))] transition-transform duration-fast ease-out active:translate-y-px"
        >
          <span className="relative h-4 w-4">
            <Copy
              size={16}
              aria-hidden="true"
              className={`absolute inset-0 transition-[opacity,transform] duration-base ease-out ${copied ? 'scale-50 opacity-0' : 'opacity-100'}`}
            />
            <Check
              size={16}
              aria-hidden="true"
              className={`absolute inset-0 text-signal transition-[opacity,transform] duration-base ease-out ${copied ? 'opacity-100' : 'scale-50 opacity-0'}`}
            />
          </span>
          <span>{copied ? 'Copied' : 'Copy address'}</span>
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? 'Email address copied to clipboard' : ''}
        </span>
      </motion.div>
      <motion.p variants={rise} className="meta mt-3">
        {links.email.description}
      </motion.p>
    </motion.div>
  )
}

function Channels() {
  return (
    <motion.ul
      aria-label="Other channels"
      className="lg:col-span-6"
      variants={cascade(0, 0.07)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      {CHANNELS.map((channel) => (
        <motion.li key={channel.label} variants={rise} className="border-t border-rule last:border-b">
          <a
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-6 transition-transform duration-base ease-out hover:translate-x-1.5 focus-visible:translate-x-1.5"
          >
            <span>
              <span className="block text-h3 font-[540]">{channel.label}</span>
              <span className="mt-1 block font-mono text-small text-fg/75">{channel.value}</span>
              <span className="mt-1 block text-small text-fg/55">{channel.description}</span>
            </span>
            <ArrowUpRight
              size={22}
              aria-hidden="true"
              className="text-fg/50 transition-transform duration-base ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1"
            />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </motion.li>
      ))}
    </motion.ul>
  )
}

function Details() {
  return (
    <motion.dl
      className="flex flex-col gap-10 lg:col-span-5 lg:col-start-8"
      variants={cascade(0.1, 0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      <motion.div variants={rise}>
        <Label as="dt">Location</Label>
        <dd className="mt-2">
          <span className="block text-body">{identity.location.long}</span>
          <span className="mt-1 block text-small text-fg/60">{identity.location.note}</span>
        </dd>
      </motion.div>
      <motion.div variants={rise}>
        <Label as="dt">Typical response time</Label>
        <dd className="mt-2">
          <span className="block font-mono text-[clamp(2.25rem,4vw,3.5rem)] font-[450] leading-none tracking-[-0.05em] text-signal tabular">
            {contact.responseTime}
          </span>
          <span className="mt-4 block max-w-[46ch] text-body text-fg/65">{contact.responseNote}</span>
        </dd>
      </motion.div>
      <motion.div variants={rise}>
        <ResumeButton variant="secondary" />
      </motion.div>
    </motion.dl>
  )
}
