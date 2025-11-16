import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Target, Zap, Award, BookOpen, Users } from 'lucide-react'

export default function About(){
  const principles = [
    {
      icon: Target,
      title: 'Production-First Mindset',
      description: 'Every AI system I build is designed for production from day one — auditable, observable, and maintainable.'
    },
    {
      icon: Zap,
      title: 'Cross-Functional Collaboration',
      description: 'I thrive at the intersection of business, engineering, and data science, translating domain knowledge into technical solutions.'
    },
    {
      icon: Sparkles,
      title: 'Measurable Impact',
      description: 'Focused on driving tangible business outcomes — from cost savings to revenue growth and operational efficiency.'
    }
  ]

  return (
    <section className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h2 className="text-3xl font-bold">About Me</h2>
        <p className="text-slate-300 text-lg max-w-3xl">
          GenAI Engineer and ML Architect building enterprise-grade AI systems that solve real business problems.
        </p>
      </motion.div>

      {/* Introduction */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-8 space-y-6"
      >
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-300 text-lg leading-relaxed">
            I'm a GenAI engineer who specializes in building <strong className="text-white">robust, auditable, and production-ready AI systems</strong>. 
            My work spans the full lifecycle — from architecture and development to deployment and observability.
          </p>
          
          <p className="text-slate-300 leading-relaxed">
            What sets my approach apart is a strong focus on <strong className="text-white">cross-functional collaboration</strong>. 
            I partner closely with analysts, engineers, and business stakeholders to convert domain knowledge into 
            reliable AI products that drive measurable outcomes. Whether it's a RAG system processing 100GB of support data 
            or an agentic workflow that saves teams 45+ minutes per meeting, my solutions are built to scale.
          </p>

          <p className="text-slate-300 leading-relaxed">
            Currently at <strong className="text-accent">Altimetrik</strong>, I'm leading GenAI initiatives for Fortune 500 clients, 
            architecting systems that have delivered <strong className="text-white">$900K+ in cost savings</strong> and 
            <strong className="text-white"> 60-70% efficiency improvements</strong>.
          </p>
        </div>
      </motion.div>

      {/* Core Principles */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Core Principles</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((principle, idx) => {
            const Icon = principle.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card p-6 space-y-4"
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-accent/20 to-accent2/20 border border-accent/30 w-fit">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-lg font-semibold">{principle.title}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{principle.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Education & Recognition */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-8 space-y-6"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="text-accent" size={24} />
            <h3 className="text-2xl font-bold">Education</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="font-semibold text-lg">Master of Science in Business Analytics</div>
              <div className="text-accent">Carlson School of Management, University of Minnesota</div>
              <div className="text-sm text-slate-400">May 2024</div>
              <p className="text-sm text-slate-300 mt-2">
                Specialized in predictive analytics, machine learning, and data-driven decision making. 
                Led analytics projects for real-world clients as Analytics Lead at Carlson Analytics Lab.
              </p>
            </div>

            <div className="h-px bg-slate-700/50"></div>

            <div className="space-y-2">
              <div className="font-semibold text-lg">B.Eng, Computer Engineering</div>
              <div className="text-accent">University of Pune, India</div>
              <div className="text-sm text-slate-400">May 2020</div>
              <p className="text-sm text-slate-300 mt-2">
                Foundation in computer science, algorithms, and software engineering. 
                Transitioned directly into data science and machine learning roles.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-8 space-y-6"
        >
          <div className="flex items-center gap-2">
            <Award className="text-accent" size={24} />
            <h3 className="text-2xl font-bold">Recognition</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="font-semibold text-lg">GEM Award</div>
              <div className="text-accent">Altimetrik Corp.</div>
              <div className="text-sm text-slate-300 mt-2">
                Recognized for exceptional performance and innovation in GenAI engineering. 
                Awarded for delivering transformative AI solutions that drove significant business value.
              </div>
            </div>

            <div className="h-px bg-slate-700/50"></div>

            <div className="space-y-2">
              <div className="font-semibold text-lg">Snowflake Summit 2025 Speaker</div>
              <div className="text-accent">Upcoming Conference Presentation</div>
              <div className="text-sm text-slate-300 mt-2">
                Selected to present <em>"Gaining Customer Insights and Loyalty with Generative AI"</em> — 
                sharing enterprise AI implementation strategies and real-world case studies.
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Professional Journey */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card p-8 space-y-6"
      >
        <div className="flex items-center gap-2">
          <Users className="text-accent" size={24} />
          <h3 className="text-2xl font-bold">Professional Journey</h3>
        </div>

        <div className="space-y-4 text-slate-300">
          <p className="leading-relaxed">
            My career in AI engineering began at <strong className="text-white">Altimetrik India</strong>, where I built ML pipelines 
            for Fortune 500 retail and sportswear brands. I delivered <strong className="text-accent">$620K+ in cost savings</strong> through 
            SKU optimization, demand forecasting, and churn prediction models processing 14M+ monthly records.
          </p>

          <p className="leading-relaxed">
            During my master's program, I served as <strong className="text-white">Analytics Lead</strong> at the Carlson Analytics Lab, 
            leading cross-functional teams on loyalty program optimization projects that increased engagement by 23% for a major Minneapolis mall.
          </p>

          <p className="leading-relaxed">
            Today, I'm pushing the boundaries of GenAI at <strong className="text-white">Altimetrik Corp</strong>, architecting 
            enterprise RAG systems and agentic workflows for clients like Lululemon. My focus is on making AI practical, 
            reliable, and transformative for business operations.
          </p>
        </div>
      </motion.div>

      {/* Beyond Work */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-8"
      >
        <h3 className="text-2xl font-bold mb-4">Beyond Work</h3>
        <p className="text-slate-300 leading-relaxed">
          When I'm not building AI systems, I'm exploring the latest research in LLMs and agentic systems, 
          contributing to open-source ML projects, and mentoring junior engineers. I'm passionate about making 
          AI accessible and practical — demystifying complex concepts and showing how they translate to real business value.
        </p>
        <p className="text-slate-300 leading-relaxed mt-4">
          I'm always open to interesting conversations about AI, collaboration opportunities, and speaking engagements. 
          Feel free to reach out!
        </p>
      </motion.div>
    </section>
  )
}
