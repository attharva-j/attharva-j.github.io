import React from 'react'
import { motion } from 'framer-motion'

export default function About(){
  return (
    <section className="space-y-6">
      <motion.h2 initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold">About</motion.h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card">
          <p className="text-slate-300">
            I’m a GenAI engineer who focuses on building robust, auditable, and production-ready AI systems. My work is
            cross-functional — I partner with analysts, engineers, and business stakeholders to convert domain knowledge into
            reliable AI products that drive measurable outcomes.
          </p>
          <div className="mt-4 text-slate-400">
            <strong>Core approach:</strong> reproducible pipelines, observability, and cross-functional throttling of complexity.
          </div>
        </div>

        <div className="glass-card">
          <div className="text-slate-300"><strong>Education</strong></div>
          <ul className="mt-2 text-slate-400">
            <li>MS Business Analytics — Carlson School of Management (May 2024)</li>
            <li>B.Eng Computer Engineering — University of Pune (May 2020)</li>
          </ul>

          <div className="mt-4 text-slate-300"><strong>Awards & Speaking</strong></div>
          <div className="mt-2 text-slate-400">GEM Award (Altimetrik), Speaker at Snowflake Summit 2025 — “Gaining Customer Insights and Loyalty with Generative AI”.</div>
        </div>
      </div>
    </section>
  )
}
