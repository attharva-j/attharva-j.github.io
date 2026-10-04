import React from 'react'
import { MotionConfig } from 'framer-motion'
import { SmoothScroll } from './motion/SmoothScroll'
import { SECTIONS } from './lib/sections'
import { useActiveSection } from './hooks/useActiveSection'
import { useRouteScroll } from './hooks/useRouteScroll'
import Navbar from './components/shell/Navbar'
import PipelineRail from './components/shell/PipelineRail'
import Section from './components/shell/Section'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
// Legacy sections: replaced one by one in later stages.
import LegacyAbout from './pages/About'
import LegacyExperience from './pages/Experience'
import LegacySkills from './pages/Skills'
import LegacyContact from './pages/Contact'

const SECTION_IDS = SECTIONS.map((section) => section.id)

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Site />
      </SmoothScroll>
    </MotionConfig>
  )
}

function Site() {
  const activeId = useActiveSection(SECTION_IDS)
  useRouteScroll()

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar activeId={activeId} />
      <PipelineRail />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <Section id="about" className="section-y">
          <div className="container">
            <LegacyAbout />
          </div>
        </Section>
        <Projects />
        <Section id="experience" className="section-y">
          <div className="container">
            <LegacyExperience />
          </div>
        </Section>
        <Section id="skills" className="section-y">
          <div className="container">
            <LegacySkills />
          </div>
        </Section>
        <Section id="contact" className="section-y">
          <div className="container">
            <LegacyContact />
          </div>
        </Section>
      </main>
    </>
  )
}
