import React from 'react'
import { motion } from 'framer-motion'

const jobs = [
  {
    company: 'Altimetrik — GenAI Engineer',
    when: 'Nov 2024 - Present',
    bullets: [
      'Architected GenAI-powered change request automation for schema/feature updates for Lululemon.',
      'Integrated OpenAI + AWS Bedrock with LangSmith observability.'
    ]
  },
  {
    company: 'Carlson Analytics Lab — Analytics Lead',
    when: 'Jul 2023 - May 2024',
    bullets: [
      'Led loyalty program analytics — segmentation and targeted campaigns, increasing engagement by 23%.'
    ]
  },
  {
    company: 'Altimetrik India — Associate Data Scientist',
    when: 'Nov 2020 - May 2023',
    bullets: [
      'SKU planning optimization and LSTM forecasting, saving $150K.'
    ]
  }
]

export default function Experience(){
  return (
    <section className="space-y-6">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold">Experience</motion.h2>

      <div className="space-y-4">
        {jobs.map((j, idx) => (
          <motion.div key={idx} whileHover={{ scale: 1.01 }} className="glass-card">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{j.company}</h3>
                <div className="text-slate-400 text-sm">{j.when}</div>
              </div>
            </div>
            <ul className="mt-3 ml-5 list-disc text-slate-300">
              {j.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
