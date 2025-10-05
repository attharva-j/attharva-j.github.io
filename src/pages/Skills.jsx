import React from 'react'
import { motion } from 'framer-motion'

const groups = [
  { title: 'GenAI & LLMs', skills: ['RAG', 'Prompt Engineering', 'Agents SDK', 'LLaMA', 'Custom GPTs'] },
  { title: 'ML & Forecasting', skills: ['LSTM', 'RNN', 'Decision Trees', 'PyCaret'] },
  { title: 'Platform & Infra', skills: ['Pinecone', 'ChromaDB', 'Snowflake', 'AWS', 'GitHub Actions'] },
]

export default function Skills(){
  return (
    <section>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold mb-4">Skills</motion.h2>

      <div className="grid md:grid-cols-3 gap-4">
        {groups.map((g, idx) => (
          <motion.div key={idx} whileHover={{ y: -6 }} className="glass-card">
            <div className="font-semibold mb-2">{g.title}</div>
            <div className="flex flex-wrap gap-2">
              {g.skills.map(s => <span key={s} className="text-xs px-2 py-1 rounded-full bg-[rgba(255,255,255,0.02)]">{s}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
