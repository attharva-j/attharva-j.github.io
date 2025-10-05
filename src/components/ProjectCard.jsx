import React from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ title, description, tags = [], links = {} }){
  return (
    <motion.div whileHover={{ y: -6 }} className="glass-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-slate-300 mt-2">{description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map(t => <span key={t} className="text-xs px-2 py-1 rounded-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]">{t}</span>)}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {links.demo && <a className="text-xs bg-accent px-2 py-1 rounded text-slate-900 font-semibold" href={links.demo}>Demo</a>}
          {links.repo && <a className="text-xs border border-[rgba(255,255,255,0.04)] px-2 py-1 rounded" href={links.repo}>Repo</a>}
        </div>
      </div>
    </motion.div>
  )
}
