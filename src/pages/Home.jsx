import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Code2, Brain, Zap } from 'lucide-react'
import ResumeButton from '../components/ResumeButton'
import { BackgroundPaths } from '../components/BackgroundPaths'

export default function Home(){
  const stats = [
    { label: 'Production Systems', value: '10+', icon: Zap },
    { label: 'Cost Savings', value: '$900K+', icon: Sparkles },
    { label: 'Years Experience', value: '5+', icon: Brain },
    { label: 'Enterprise Clients', value: '10+', icon: Code2 }
  ]

  return (
    <section className="relative space-y-8">
      {/* Background Paths Animation */}
      <BackgroundPaths />
      
      {/* Content with higher z-index */}
      <div className="relative z-10 space-y-8">{/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 to-accent2/20 border border-accent/30">
            <Sparkles size={16} className="text-accent" />
            <span className="text-sm font-medium dark:dark:text-slate-200 text-slate-800 dark:text-slate-700 text-slate-300">Available for Consulting</span>
          </div>
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 dark:text-white text-slate-900">
              Building Production-Grade
              <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent"> GenAI Systems</span>
            </h1>
            <p className="text-lg dark:dark:text-slate-300 dark:text-slate-700 text-slate-300 text-slate-600 leading-relaxed">
              GenAI Engineer specializing in enterprise RAG architectures, agentic workflows, and scalable AI pipelines. 
              I transform complex ML systems into auditable, production-ready solutions that drive measurable business impact.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a 
              href="/projects" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent2 px-6 py-3 rounded-lg font-semibold text-slate-900 hover:shadow-lg hover:shadow-accent/20 transition-all"
            >
              View Projects
              <Code2 size={18} />
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 border-2 border-accent/30 px-6 py-3 rounded-lg dark:dark:text-slate-200 text-slate-800 dark:text-slate-700 text-slate-300 font-semibold hover:bg-accent/10 transition-all"
            >
              Get in Touch
            </a>
            <ResumeButton variant="ghost" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-accent to-accent2 p-1">
                <div className="w-full h-full rounded-lg dark:bg-slate-900 bg-white flex items-center justify-center text-3xl font-bold dark:text-white text-slate-900">
                  AJ
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold dark:text-white text-slate-900">Atharva Joshi</h3>
                <p className="text-accent font-medium">GenAI Engineer & ML Architect</p>
                <p className="text-sm dark:dark:text-slate-400 text-slate-600 text-slate-600 mt-1">Salt Lake City, UT</p>
                <div className="flex gap-3 mt-3">
                  <a href="mailto:atharvajoshi77@gmail.com" className="text-xs dark:dark:text-slate-400 text-slate-600 text-slate-600 hover:text-accent transition">Email</a>
                  <a href="https://linkedin.com/in/attharvaj3147" className="text-xs dark:dark:text-slate-400 text-slate-600 text-slate-600 hover:text-accent transition">LinkedIn</a>
                  <a href="https://github.com/attharva-j" className="text-xs dark:dark:text-slate-400 text-slate-600 text-slate-600 hover:text-accent transition">GitHub</a>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm dark:dark:text-slate-300 dark:text-slate-700 text-slate-300 dark:text-slate-700 text-slate-300 uppercase tracking-wide">Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {['RAG Systems', 'AI Agents', 'LangGraph', 'Vector DBs', 'LLM Fine-tuning', 'MLOps'].map(skill => (
                  <span key={skill} className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t dark:border-slate-700/50 border-slate-300/50">
              <h4 className="font-semibold text-sm dark:dark:text-slate-300 dark:text-slate-700 text-slate-300 dark:text-slate-700 text-slate-300 mb-3">Key Achievements</h4>
              <ul className="space-y-2 text-sm dark:dark:text-slate-400 text-slate-600 text-slate-600">
                <li className="flex gap-2">
                  <span className="text-accent">→</span>
                  <span>60-70% reduction in schema change cycle time (Lululemon)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span>
                  <span>$900K+ in cumulative cost savings across projects</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent">→</span>
                  <span>Speaker at Snowflake Summit 2025</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Decorative gradient orbs */}
          <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-accent2/20 rounded-full blur-3xl opacity-20"></div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
      >
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div 
              key={idx}
              whileHover={{ y: -4 }}
              className="glass-card text-center p-4"
            >
              <Icon className="w-8 h-8 mx-auto mb-2 text-accent" />
              <div className="text-3xl font-bold dark:text-white text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm dark:dark:text-slate-400 text-slate-600 text-slate-600">{stat.label}</div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Featured Work Teaser */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.6 }}
        className="glass-card p-6 mt-12"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold dark:text-white text-slate-900">Recent Impact</h3>
          <a href="/projects" className="text-accent hover:text-accent2 transition font-medium text-sm">
            View All Projects →
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="text-accent font-bold text-xl">60-70%</div>
            <div className="text-sm dark:dark:text-slate-300 dark:text-slate-700 text-slate-300 dark:text-slate-700 text-slate-300">Faster change implementation for Lululemon's data workflows</div>
          </div>
          <div className="space-y-2">
            <div className="text-accent font-bold text-xl">45-50 min</div>
            <div className="text-sm dark:dark:text-slate-300 dark:text-slate-700 text-slate-300 dark:text-slate-700 text-slate-300">Saved per meeting with AI-powered prep assistant</div>
          </div>
          <div className="space-y-2">
            <div className="text-accent font-bold text-xl">75%</div>
            <div className="text-sm dark:dark:text-slate-300 dark:text-slate-700 text-slate-300 dark:text-slate-700 text-slate-300">Reduction in support search time via RAG system</div>
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  )
}