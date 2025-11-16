import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, Twitter, MapPin, Calendar, Briefcase, MessageSquare } from 'lucide-react'
import ResumeButton from '../components/ResumeButton'

export default function Contact(){
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'atharvajoshi77@gmail.com',
      href: 'mailto:atharvajoshi77@gmail.com',
      description: 'Best for detailed inquiries'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: '/in/atharvaj',
      href: 'https://linkedin.com/in/attharvaj3147',
      description: 'Let\'s connect professionally'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@attharva-j',
      href: 'https://github.com/attharva-j',
      description: 'Check out my code'
    },
    {
      icon: Twitter,
      label: 'Medium',
      value: '@atharvajoshi',
      href: 'https://medium.com/@athex25',
      description: 'Read my articles'
    }
  ]

  const collaborationTypes = [
    {
      icon: Briefcase,
      title: 'Consulting',
      description: 'Enterprise AI strategy, RAG architecture design, and ML system optimization'
    },
    {
      icon: MessageSquare,
      title: 'Speaking',
      description: 'Conference talks, workshops, and technical presentations on GenAI and MLOps'
    },
    {
      icon: Calendar,
      title: 'Collaboration',
      description: 'Open-source projects, research partnerships, and technical advisory roles'
    }
  ]

  return (
    <section className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h2 className="text-3xl font-bold">Let's Connect</h2>
        <p className="text-slate-300 text-lg max-w-3xl">
          Open to consulting, collaborations, and speaking opportunities. Let's discuss how AI can transform your business.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 space-y-6"
        >
          <div className="glass-card p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-accent">
                <MapPin size={18} />
                <span className="font-semibold">Location</span>
              </div>
              <p className="text-slate-300">Salt Lake City, Utah</p>
              <p className="text-sm text-slate-400">Open to remote opportunities & travel</p>
            </div>

            <div className="h-px bg-slate-700/50"></div>

            <div className="space-y-4">
              {contactMethods.map((method, idx) => {
                const Icon = method.icon
                return (
                  <a
                    key={idx}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all border border-slate-700/30 hover:border-accent/30"
                  >
                    <div className="flex items-start gap-3">
                      <Icon size={20} className="text-accent mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-slate-200">{method.label}</div>
                        <div className="text-xs text-accent truncate">{method.value}</div>
                        <div className="text-xs text-slate-400 mt-1">{method.description}</div>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-6 space-y-4">
            <h3 className="font-semibold">Quick Actions</h3>
            <div className="space-y-3">
              <ResumeButton variant="primary" className="w-full justify-center" />
              <a 
                href="/projects"
                className="block w-full border-2 border-accent/30 text-slate-200 px-4 py-3 rounded-lg font-semibold text-center hover:bg-accent/10 transition-all"
              >
                View Projects
              </a>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Collaboration Types */}
          <div className="glass-card p-8 space-y-6">
            <h3 className="text-2xl font-bold">Open to Collaboration</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {collaborationTypes.map((type, idx) => {
                const Icon = type.icon
                return (
                  <div key={idx} className="space-y-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-accent/20 to-accent2/20 border border-accent/30 w-fit">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="font-semibold">{type.title}</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{type.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="glass-card p-8 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Get in Touch</h3>
              <p className="text-slate-300">
                I respond to all professional inquiries within 24-48 hours. For consulting, speaking, or collaboration opportunities, 
                please reach out via email or LinkedIn.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="mailto:atharvajoshi77@gmail.com"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-accent2 text-slate-900 px-6 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/20 transition-all"
              >
                <Mail size={20} />
                <span>Send Email</span>
              </a>
              <a
                href="https://linkedin.com/in/attharvaj3147"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-accent/30 text-slate-200 px-6 py-4 rounded-lg font-semibold hover:bg-accent/10 transition-all"
              >
                <Linkedin size={20} />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Topics of Interest */}
          <div className="glass-card p-8 space-y-4">
            <h3 className="text-xl font-bold">Topics I'm Excited About</h3>
            <div className="flex flex-wrap gap-3">
              {[
                'Enterprise RAG Systems',
                'Agentic AI Workflows',
                'LLM Fine-tuning',
                'Vector Search Optimization',
                'MLOps at Scale',
                'AI for Business Ops',
                'Production ML Systems',
                'Data Quality for AI'
              ].map(topic => (
                <span key={topic} className="px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 text-sm font-medium">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Response Time */}
          <div className="glass-card p-6 bg-accent/5 border-accent/20">
            <div className="flex items-start gap-3">
              <Calendar className="text-accent mt-1 flex-shrink-0" size={20} />
              <div>
                <div className="font-semibold text-accent mb-1">Typical Response Time</div>
                <p className="text-sm text-slate-300">
                  I typically respond to inquiries within 24-48 hours. For urgent matters, please mention it in your message 
                  or reach out via LinkedIn for faster response.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}