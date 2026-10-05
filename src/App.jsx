import React from 'react'
import { MotionConfig } from 'framer-motion'
import { SmoothScroll } from './motion/SmoothScroll'
import { SECTIONS } from './lib/sections'
import { useActiveSection } from './hooks/useActiveSection'
import { useRouteScroll } from './hooks/useRouteScroll'
import Navbar from './components/shell/Navbar'
import PipelineRail from './components/shell/PipelineRail'
import Footer from './components/shell/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'

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
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
