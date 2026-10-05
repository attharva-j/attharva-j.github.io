import React, { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { projects } from '../../content'
import { splitFigure } from '../../lib/figures'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useSmoothScroll } from '../../motion/SmoothScroll'
import { cascade, inView, maskLine, rise } from '../../motion/variants'
import { duration, ease } from '../../motion/tokens'
import SectionHeading from '../shell/SectionHeading'
import Button from '../ui/Button'
import MarkedList from '../ui/MarkedList'

const panelId = (project) => `project-${project.id}`
const PANEL_IDS = projects.items.map(panelId)

export default function Projects() {
  const activePanel = useActiveSection(PANEL_IDS)

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-y relative">
      <div className="shell">
        <SectionHeading id="projects-title">Projects</SectionHeading>
        <motion.p
          className="mt-6 max-w-[60ch] text-lead text-fg/65"
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          {projects.summary}
        </motion.p>

        <div className="mt-[clamp(4rem,8vw,7rem)] grid grid-cols-1 gap-x-[clamp(2rem,4vw,4rem)] lg:grid-cols-12">
          <ProjectIndex activePanel={activePanel} />
          <div className="lg:col-span-8">
            {projects.items.map((project, index) => (
              <ProjectPanel key={project.id} project={project} flagship={index === 0} />
            ))}
            <Collaboration />
          </div>
        </div>
      </div>
    </section>
  )
}

// Desktop only: a pinned table of contents. The signal tick follows the panel
// in view; choosing an entry travels to it and hands focus to its title.
function ProjectIndex({ activePanel }) {
  const { scrollTo } = useSmoothScroll()

  const travel = (project) => {
    scrollTo(`#${panelId(project)}`, {
      offset: -96,
      onComplete: () => document.getElementById(`${panelId(project)}-title`)?.focus({ preventScroll: true })
    })
  }

  return (
    <nav aria-label="Project index" className="hidden lg:col-span-4 lg:block">
      <motion.ol
        className="sticky top-[calc(var(--nav-h)+3rem)] flex flex-col"
        variants={cascade(0.1, 0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
      >
        {projects.items.map((project) => {
          const active = activePanel === panelId(project)
          return (
            <motion.li key={project.id} variants={rise} className="relative">
              {active && (
                <motion.span
                  layoutId="project-signal"
                  aria-hidden="true"
                  className="absolute left-0 top-[1.15rem] h-1.5 w-1.5 bg-signal"
                  transition={{ duration: duration.base, ease: ease.inOut }}
                />
              )}
              <button
                type="button"
                onClick={() => travel(project)}
                aria-current={active ? 'true' : undefined}
                className="group w-full py-2.5 pl-5 text-left"
              >
                <span
                  className={`block text-small leading-snug transition-[opacity,transform] duration-base ease-out group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100 ${
                    active ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  {project.title}
                </span>
              </button>
            </motion.li>
          )
        })}
      </motion.ol>
    </nav>
  )
}

function ProjectPanel({ project, flagship }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const [lead, ...otherImpact] = project.impact
  const { figure, rest } = splitFigure(lead)

  // The lead figure drifts against the scroll, a small parallax that gives the
  // number weight relative to the text around it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const figureY = useTransform(scrollYProgress, [0, 1], [48, -48])

  return (
    <motion.article
      ref={ref}
      id={panelId(project)}
      aria-labelledby={`${panelId(project)}-title`}
      className="border-t border-rule py-[clamp(3.5rem,7vw,6.5rem)] first:border-t-0 first:pt-0"
      variants={cascade(0, 0.07)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.p variants={rise} className="meta">
        {project.company}
      </motion.p>
      <motion.h3
        variants={rise}
        id={`${panelId(project)}-title`}
        tabIndex={-1}
        className="mt-3 max-w-[30ch] text-h3 font-[560] outline-none"
      >
        {project.title}
      </motion.h3>

      <motion.p className="mt-[clamp(2.5rem,5vw,4rem)]" style={reduceMotion ? undefined : { y: figureY }}>
        {figure && (
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span
              variants={maskLine}
              className={`block font-mono text-[clamp(3.75rem,8.5vw,8rem)] font-[450] leading-[0.92] tracking-[-0.06em] tabular ${
                flagship ? 'text-signal' : ''
              }`}
            >
              {figure}
            </motion.span>
          </span>
        )}{' '}
        <motion.span variants={rise} className="mt-3 block max-w-[34ch] text-lead text-fg/80">
          {rest}
        </motion.span>
      </motion.p>

      <motion.p variants={rise} className="mt-10 max-w-[62ch] text-body text-fg/65">
        {project.description}
      </motion.p>

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
        <motion.div variants={rise}>
          <h4 className="text-small font-[520] text-fg/55">Business impact</h4>
          <MarkedList items={otherImpact} />
        </motion.div>
        <motion.div variants={rise}>
          <h4 className="text-small font-[520] text-fg/55">Key highlights</h4>
          <MarkedList items={project.highlights} />
        </motion.div>
      </div>

      <motion.div variants={rise} className="mt-12">
        <h4 className="sr-only">Technology stack</h4>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {project.tech.map((tech) => (
            <li key={tech} className="meta">
              {tech}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.article>
  )
}

function Collaboration() {
  return (
    <motion.aside
      aria-labelledby="collaboration-title"
      className="mt-4 flex flex-col gap-8 border-t border-rule-strong pt-10 md:flex-row md:items-end md:justify-between"
      variants={cascade(0, 0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      <div>
        <motion.h3 variants={rise} id="collaboration-title" className="text-h3 font-[560]">
          {projects.collaboration.title}
        </motion.h3>
        <motion.p variants={rise} className="mt-3 max-w-[44ch] text-body text-fg/65">
          {projects.collaboration.text}
        </motion.p>
      </div>
      <motion.div variants={rise} className="shrink-0">
        <Button to="/contact" variant="secondary" icon={ArrowRight}>
          Get in touch
        </Button>
      </motion.div>
    </motion.aside>
  )
}
