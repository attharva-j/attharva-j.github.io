import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, GitBranch, Zap, Database, Brain, Target } from 'lucide-react'

const projects = [
  {
    title: 'AI-Powered Workflow Automation — Leading Athleisure Brand',
    company: 'Altimetrik Corp.',
    icon: Sparkles,
    description: 'First-of-its-kind GenAI-powered change request automation framework reducing manual effort across analysts, engineers, and QE teams.',
    impact: [
      '60-70% reduction in request-to-implementation cycle time',
      'Eliminated error-prone dependencies in schema modifications',
      'Established repeatable blueprint for data workflow governance'
    ],
    tech: ['LangGraph', 'LangSmith', 'OpenAI', 'AWS Bedrock', 'ChromaDB', 'Neo4j', 'GitHub MCP', 'TypeScript'],
    highlights: [
      'Dual retrieval strategy: ChromaDB for semantic grounding + Neo4j for lineage analysis',
      'LLM orchestration across parsing, impact analysis, SQL generation, and validation',
      'Production-grade observability with LangSmith tracing',
      'Self-serve schema changes via TypeScript UI while maintaining engineering oversight'
    ]
  },
  {
    title: 'Customer Meeting Prep Agent',
    company: 'Enterprise Monitoring Platform',
    icon: Brain,
    description: 'Modular ingestion pipeline integrating 5+ data sources to vectorize 100K+ user story fragments for context-aware meeting insights.',
    impact: [
      '45-50 minutes saved per meeting in prep time',
      'Increased deal win rates through better personalization',
      'Enhanced seller confidence across organization'
    ],
    tech: ['OpenAI Agents SDK', 'Pinecone', 'AWS', 'GitHub Actions'],
    highlights: [
      'Agentic workflow dynamically fetching and synthesizing insights',
      'Documented AWS-based deployment for 60% faster implementation',
      'Reusable enterprise template enabling parallel team adoption',
      'Mentored 2 junior engineers in production pipeline development'
    ]
  },
  {
    title: 'RAG-Based Support Assistant',
    company: 'Pricing Analytics Company',
    icon: Database,
    description: 'Vectorized knowledge base from 100GB of historical support data across multiple formats using OpenAI embeddings and Pinecone.',
    impact: [
      '75% reduction in manual support search time',
      'Faster case resolution across support teams',
      'Scalable RAG architecture for enterprise support'
    ],
    tech: ['OpenAI Embeddings', 'Pinecone', 'Custom GPTs', 'AWS'],
    highlights: [
      'Structured and ingested multi-format historical data',
      'CustomGPT assistant with retrieval-augmented responses',
      'Production-ready vector search infrastructure'
    ]
  },
  {
    title: 'Product Performance Analysis',
    company: 'Leading Women\'s Apparel Brand',
    icon: Target,
    description: 'LLM-powered analysis of multi-channel product reviews identifying hidden customer segments.',
    impact: [
      '$135K in potential revenue unlocked',
      'Discovered new customer segments',
      'Actionable insights from unstructured data'
    ],
    tech: ['LLaMA', 'Snowflake Cortex', 'Python', 'SQL'],
    highlights: [
      'Multi-channel review sentiment analysis',
      'Customer segmentation using LLM embeddings',
      'Snowflake Cortex integration for scalable analysis'
    ]
  },
  {
    title: 'Churn Prediction & Journey Automation',
    company: 'CleverTap (MarTech SaaS)',
    icon: Zap,
    description: 'Decision tree models for churn prediction and automated customer journey pipelines processing 14M+ monthly records.',
    impact: [
      '$150K annual revenue retained',
      '$400K annual savings through automation',
      '14M+ records processed monthly'
    ],
    tech: ['BigQuery', 'CI/CD', 'Spark', 'Python'],
    highlights: [
      'Production ML pipeline with CI/CD integration',
      'Automated customer journey analysis at scale',
      'Real-time churn risk scoring'
    ]
  },
  {
    title: 'ML-Powered SKU Planning & Forecasting',
    company: 'Japanese Sportswear & Canadian Athleisure',
    icon: GitBranch,
    description: 'LSTM models for seasonal forecasting and optimization pipelines for inventory planning.',
    impact: [
      '$150K cost savings through optimization',
      '18% quarterly profit boost',
      '70% reduction in restock delays (7→2 days)'
    ],
    tech: ['LSTM', 'PyCaret', 'Python', 'Time Series'],
    highlights: [
      'Seasonal demand forecasting with LSTM',
      'SKU-level optimization across product lines',
      'Automated restock trigger systems'
    ]
  }
]

export default function Projects(){
  return (
    <section className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h2 className="text-3xl font-bold">Featured Projects</h2>
        <p className="text-slate-300 text-lg max-w-3xl">
          Production-ready AI systems delivering measurable business impact across enterprise clients. 
          Focus on RAG architectures, agentic workflows, and scalable ML pipelines.
        </p>
      </motion.div>

      <div className="space-y-6">
        {projects.map((project, idx) => {
          const Icon = project.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card p-6 md:p-8 space-y-6"
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-accent/20 to-accent2/20 border border-accent/30">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                  <p className="text-sm text-accent">{project.company}</p>
                  <p className="text-slate-300 mt-3">{project.description}</p>
                </div>
              </div>

              {/* Impact Metrics */}
              <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Business Impact</div>
                <div className="grid md:grid-cols-3 gap-4">
                  {project.impact.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-accent mt-0.5">→</span>
                      <span className="text-sm text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Key Highlights</div>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-300">
                      <span className="text-accent2 mt-0.5">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Technology Stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800/50 text-slate-300 border border-slate-700/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-8 text-center"
      >
        <h3 className="text-xl font-bold mb-3">Interested in collaboration?</h3>
        <p className="text-slate-300 mb-6">Let's discuss how AI can transform your business operations.</p>
        <a 
          href="/contact" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent2 px-6 py-3 rounded-lg font-semibold text-slate-900 hover:shadow-lg hover:shadow-accent/20 transition-all"
        >
          Get in Touch
        </a>
      </motion.div>
    </section>
  )
}