import React from 'react'
import { motion } from 'framer-motion'
import profilePic from '../assets/portfolioimage.jpg'

export default function Home(){
  return (
    <section className="grid md:grid-cols-2 gap-6 items-start">
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5 }} className="space-y-4">
        <div className="text-sm text-slate-400">Hello, I’m</div>
        <h1 className="text-3xl md:text-4xl font-bold">Atharva Joshi — GenAI Engineer</h1>
        <p className="text-slate-300 max-w-xl">
          I build production-grade GenAI systems: RAG architectures, agentic workflows, MCPs, and scalable inference
          pipelines for enterprise. I specialize in delivery — turning complex data systems into usable, auditable AI products.
        </p>

        <div className="flex gap-3 mt-4">
          <a href="/projects" className="inline-block bg-accent px-4 py-2 rounded-lg font-semibold text-slate-900">See projects</a>
          <a href="/contact" className="inline-block border border-[rgba(255,255,255,0.06)] px-4 py-2 rounded-lg text-slate-200">Contact</a>
          <a href="/resume.pdf" download className="inline-block px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.02)]">Resume</a>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .5 }} className="glass-card">
        <div className="flex items-center gap-4">
          <img src={profilePic} alt="avatar" className="w-20 h-20 rounded-lg object-cover border border-[rgba(255,255,255,0.04)]" />
          <div>
            <div className="font-semibold text-lg">Atharva Joshi</div>
            <div className="text-sm text-slate-400">Salt Lake City, UT</div>
            <div className="text-sm text-slate-400 mt-1">GenAI · RAG · Agents · MLOps</div>
          </div>
        </div>

        <hr className="my-4 border-[rgba(255,255,255,0.03)]" />

        <div className="text-sm text-slate-300">
          <strong>Highlights</strong>
          <ul className="mt-2 ml-4 list-disc text-slate-400">
            <li>Built enterprise RAG system that cut schema-change cycle by 60–70% (Lululemon).</li>
            <li>Vectorized 100K+ docs powering meeting-prep assistant with 45–50 minutes saved per meeting.</li>
            <li>Reduced support search time by 75% by building CustomGPT support assistants.</li>
          </ul>
        </div>
      </motion.div>
    </section>
  )
}