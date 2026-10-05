import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { skills } from '../../content'
import { useSmoothScroll } from '../../motion/SmoothScroll'
import { cascade, inView, rise } from '../../motion/variants'
import { duration, ease } from '../../motion/tokens'
import SectionHeading from '../shell/SectionHeading'
import Label from '../ui/Label'

const SKILL_NAMES = Object.keys(skills.skillProjectMap)
const PROJECT_IDS = Object.keys(skills.projectLabels)
const CONNECTIONS = SKILL_NAMES.flatMap((skill) =>
  skills.skillProjectMap[skill].map((project) => ({ skill, project }))
)

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-y relative">
      <div className="shell">
        <SectionHeading id="skills-title">Skills</SectionHeading>
        <motion.p
          className="mt-6 max-w-[60ch] text-lead text-fg/65"
          variants={rise}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
        >
          {skills.summary}
        </motion.p>

        <Network />
        <SkillIndex />
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Skills x projects network

function Network() {
  const [active, setActive] = useState(null) // { type: 'skill' | 'project', id }
  const [pinned, setPinned] = useState(null)
  const current = pinned ?? active

  const linked = useMemo(() => {
    if (!current) return null
    const pairs =
      current.type === 'skill'
        ? CONNECTIONS.filter((c) => c.skill === current.id)
        : CONNECTIONS.filter((c) => c.project === current.id)
    return {
      skills: new Set(pairs.map((c) => c.skill)),
      projects: new Set(pairs.map((c) => c.project)),
      pairs: new Set(pairs.map((c) => `${c.skill}|${c.project}`))
    }
  }, [current])

  const { scrollTo } = useSmoothScroll()
  const openProject = useCallback(
    (id) => {
      scrollTo(`#project-${id}`, {
        offset: -96,
        onComplete: () => document.getElementById(`project-${id}-title`)?.focus({ preventScroll: true })
      })
    },
    [scrollTo]
  )

  const describe = () => {
    if (!current) return ''
    if (current.type === 'skill') {
      const names = [...linked.projects].map((id) => skills.projectLabels[id].name)
      return `${current.id}: used in ${names.length} ${names.length === 1 ? 'project' : 'projects'}, ${names.join(', ')}.`
    }
    const label = skills.projectLabels[current.id]
    return `${label.name} ${label.fullName}: built with ${[...linked.skills].join(', ')}.`
  }

  const hover = (type, id) => ({
    onMouseEnter: () => setActive({ type, id }),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive({ type, id }),
    onBlur: () => setActive(null)
  })

  const skillState = (skill) => (!linked ? 'idle' : linked.skills.has(skill) ? 'on' : 'off')
  const projectState = (id) => (!linked ? 'idle' : linked.projects.has(id) ? 'on' : 'off')

  return (
    <motion.div
      className="mt-[clamp(4rem,8vw,7rem)]"
      variants={cascade(0, 0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
    >
      <motion.h3 variants={rise} className="text-h3 font-[560]">
        {skills.network.title}
      </motion.h3>
      <motion.p variants={rise} className="mt-3 max-w-[60ch] text-body text-fg/65">
        {skills.network.description}
      </motion.p>
      <p className="sr-only" aria-live="polite">
        {describe()}
      </p>

      <motion.div variants={rise}>
        <Graph
          linked={linked}
          hover={hover}
          skillState={skillState}
          projectState={projectState}
          onSkillClick={(skill) =>
            setPinned((p) => (p?.type === 'skill' && p.id === skill ? null : { type: 'skill', id: skill }))
          }
          pinned={pinned}
          openProject={openProject}
        />
      </motion.div>

      <motion.p variants={rise} className="meta mt-8 flex flex-wrap gap-x-6 gap-y-1">
        <span>{SKILL_NAMES.length} skills</span>
        <span>{PROJECT_IDS.length} projects</span>
        <span>{CONNECTIONS.length} connections</span>
      </motion.p>
    </motion.div>
  )
}

// Desktop: two columns joined by measured curves. Below lg the curves are
// dropped and the same state simply highlights the matching projects.
function Graph({ linked, hover, skillState, projectState, onSkillClick, pinned, openProject }) {
  const frameRef = useRef(null)
  const skillRefs = useRef({})
  const projectRefs = useRef({})
  const [paths, setPaths] = useState([])
  const [shown, setShown] = useState(false)
  // Curves cascade in once on first view; after that they respond instantly.
  const [settled, setSettled] = useState(false)
  const reveal = () => {
    setShown(true)
    window.setTimeout(() => setSettled(true), CONNECTIONS.length * 18 + duration.base * 1000)
  }

  useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame) return undefined
    const desktop = window.matchMedia('(min-width: 1024px)')

    const measure = () => {
      if (!desktop.matches) {
        setPaths([])
        return
      }
      const box = frame.getBoundingClientRect()
      setPaths(
        CONNECTIONS.map(({ skill, project }, index) => {
          const s = skillRefs.current[skill].getBoundingClientRect()
          const t = projectRefs.current[project].getBoundingClientRect()
          const x1 = s.right - box.left + 14
          const y1 = s.top + s.height / 2 - box.top
          const x2 = t.left - box.left - 18
          const y2 = t.top + 14 - box.top
          const mid = (x1 + x2) / 2
          return { key: `${skill}|${project}`, index, d: `M${x1} ${y1} C${mid} ${y1} ${mid} ${y2} ${x2} ${y2}` }
        })
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    desktop.addEventListener('change', measure)
    document.fonts?.ready.then(measure)
    return () => {
      observer.disconnect()
      desktop.removeEventListener('change', measure)
    }
  }, [])

  const lineOpacity = (key) => {
    if (!shown) return 0
    if (!linked) return 0.16
    return linked.pairs.has(key) ? 0.85 : 0.05
  }

  return (
    <motion.div
      ref={frameRef}
      className="relative mt-12 grid gap-10 lg:grid-cols-12 lg:gap-x-[clamp(2rem,4vw,4rem)]"
      onViewportEnter={reveal}
      viewport={{ once: true, amount: 0.3 }}
    >
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 hidden h-full w-full text-fg lg:block">
        {paths.map((path) => (
          <path
            key={path.key}
            d={path.d}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{
              opacity: lineOpacity(path.key),
              transition: `opacity ${duration.base}s cubic-bezier(${ease.out.join(',')})`,
              transitionDelay: settled ? '0ms' : `${path.index * 18}ms`
            }}
          />
        ))}
      </svg>

      <ul aria-label="Skills" className="flex flex-wrap gap-2 lg:col-span-4 lg:flex-col lg:gap-0">
        {SKILL_NAMES.map((skill) => {
          const state = skillState(skill)
          const isPinned = pinned?.type === 'skill' && pinned.id === skill
          return (
            <li key={skill} className="relative">
              <button
                ref={(node) => {
                  skillRefs.current[skill] = node
                }}
                type="button"
                aria-pressed={isPinned}
                onClick={() => onSkillClick(skill)}
                {...hover('skill', skill)}
                className={`relative px-3 py-1.5 text-left font-mono text-[0.8125rem] tabular shadow-[inset_0_0_0_1px_rgb(var(--rule))] transition-opacity duration-base ease-out lg:px-0 lg:py-[0.3rem] lg:shadow-none ${
                  state === 'off' ? 'opacity-50' : state === 'on' ? 'opacity-100' : 'opacity-75'
                }`}
              >
                {state === 'on' && (
                  <span aria-hidden="true" className="absolute -left-3 top-[calc(50%-3px)] hidden h-1.5 w-1.5 bg-signal lg:block" />
                )}
                {skill}
              </button>
            </li>
          )
        })}
      </ul>

      <ul aria-label="Projects" className="flex flex-col justify-between gap-2 lg:col-span-4 lg:col-start-9">
        {PROJECT_IDS.map((id) => {
          const label = skills.projectLabels[id]
          const state = projectState(id)
          return (
            <li key={id}>
              <button
                ref={(node) => {
                  projectRefs.current[id] = node
                }}
                type="button"
                onClick={() => openProject(id)}
                {...hover('project', id)}
                aria-label={`${label.name}, ${label.fullName}, ${label.impact}. Go to project`}
                className={`group grid w-full grid-cols-[1fr_auto] items-baseline gap-x-4 border-t border-rule py-3 text-left transition-[opacity,transform] duration-base ease-out hover:translate-x-1 focus-visible:translate-x-1 ${
                  state === 'off' ? 'opacity-70' : 'opacity-100'
                }`}
              >
                <span>
                  <span className="block text-body font-[540]">{label.name}</span>
                  <span className="block text-small text-fg/75">{label.fullName}</span>
                </span>
                <span className={`font-mono text-small tabular ${state === 'on' ? 'text-signal' : 'text-fg/80'}`}>
                  {label.impact}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Every skill, grouped by area: a flowing index rather than a grid of boxes.

function SkillIndex() {
  return (
    <div className="mt-[clamp(5rem,10vw,9rem)]">
      <Label>Skills by area</Label>
      <motion.div
        className="mt-8 gap-x-[clamp(2rem,4vw,4rem)] md:columns-2 xl:columns-4"
        variants={cascade(0, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {skills.categories.map((group) => (
          <motion.section
            key={group.category}
            variants={rise}
            className="mb-12 break-inside-avoid border-t border-rule pt-5"
            aria-label={group.category}
          >
            <h4 className="text-[1.0625rem] font-[560] tracking-[-0.01em]">{group.category}</h4>
            <ul className="mt-3 flex flex-col gap-1">
              {group.skills.map((skill) => (
                <li key={skill} className="text-[0.9375rem] leading-relaxed text-fg/65">
                  {skill}
                </li>
              ))}
            </ul>
          </motion.section>
        ))}
      </motion.div>
    </div>
  )
}
