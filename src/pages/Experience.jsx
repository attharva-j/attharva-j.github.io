import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Award, TrendingUp } from 'lucide-react'

const experiences = [
  {
    company: 'Altimetrik Corp.',
    location: 'San Francisco, CA',
    role: 'Gen AI Engineer',
    period: 'Nov 2024 - Present',
    type: 'Full-time',
    highlights: [
      'Architected org-wide GenAI-powered change request automation framework using LangGraph to orchestrate LLM agents across parsing, impact analysis, SQL generation, and validation',
      'Implemented dual retrieval strategy with ChromaDB (RAG over PDF knowledge base) and Neo4j lineage graph, enabling semantic grounding and structural impact analysis',
      'Integrated OpenAI and AWS Bedrock with LangSmith for production-grade tracing, observability, and auditability',
      'Led cross-functional adoption by exposing pipeline via GitHub MCP and TypeScript UI, reducing turnaround from weeks to days',
      'Engineered modular ingestion pipeline integrating 5+ data sources to vectorize 100K+ user story fragments',
      'Built agentic workflow using OpenAI Agents SDK, dynamically synthesizing meeting insights from Pinecone Vector DB',
      'Documented and standardized AWS-based deployment using GitHub Actions, improving implementation velocity by 60%',
      'Mentored 2 junior engineers in productionizing pipelines, scaling knowledge across teams'
    ],
    impact: {
      efficiency: '60-70% reduction in request-to-implementation cycle',
      timeSaved: '45-50 minutes per meeting',
      revenueImpact: 'Increased deal win rates'
    }
  },
  {
    company: 'Carlson Analytics Lab',
    location: 'Minneapolis, MN',
    role: 'Analytics Lead',
    period: 'Jul 2023 - May 2024',
    type: 'Full-time',
    highlights: [
      'Led cross-functional analytics initiative aligning marketing, customer engagement, and strategy teams to enhance loyalty program ROI',
      'Spearheaded customer segmentation of 13K+ insiders using K-Means clustering, increasing targeting precision and campaign efficiency by 30%',
      'Unlocked 23% surge in engagement by designing personalized promotional strategies using association rule mining',
      'Collaborated with stakeholders to translate business requirements into actionable data insights',
      'Managed end-to-end analytics projects from data collection to presentation of findings'
    ],
    impact: {
      engagement: '23% increase in customer engagement',
      efficiency: '30% improvement in campaign targeting',
      scale: '13K+ customers segmented'
    }
  },
  {
    company: 'Altimetrik India',
    location: 'Bangalore, India',
    role: 'Associate Data Scientist',
    period: 'Nov 2020 - May 2023',
    type: 'Full-time',
    highlights: [
      'Delivered $150K in cost savings by optimizing SKU planning using ML pipelines for leading Japanese sportswear and Canadian athleisure brands',
      'Boosted quarterly profits by 18% via seasonal product forecasting with LSTM models',
      'Reduced inventory re-stock delays by 70% (from 7 to 2 days) using Python-based time series models',
      'Saved $70.5K through BERT-based employee sentiment classification for workforce insights',
      'Engineered churn prediction models using decision trees that retained $150K in annual revenue for CleverTap',
      'Built automated customer journey pipelines in BigQuery, realizing $400K in savings annually through faster analysis of 14M+ monthly records',
      'Implemented CI/CD pipelines for ML model deployment and monitoring',
      'Collaborated with product teams to integrate ML insights into customer-facing features'
    ],
    impact: {
      costSavings: '$620K+ total savings',
      revenueRetained: '$150K annual revenue',
      efficiency: '70% reduction in restock delays',
      scale: '14M+ monthly records processed'
    }
  }
]

export default function Experience(){
  return (
    <section className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h2 className="text-3xl font-bold">Professional Experience</h2>
        <p className="text-slate-300 text-lg max-w-3xl">
          4+ years building enterprise-grade AI/ML systems with proven scalability and measurable business impact.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative space-y-8">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-accent via-accent2 to-transparent hidden md:block"></div>

        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="relative"
          >
            {/* Timeline dot */}
            <div className="hidden md:block absolute left-0 top-6 w-4 h-4 rounded-full bg-accent border-4 border-slate-900"></div>

            <div className="md:ml-12 glass-card p-6 md:p-8 space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    <Briefcase size={16} />
                    <span>{exp.company}</span>
                  </div>
                  <p className="text-sm text-slate-400">{exp.location}</p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1">
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-accent/10 text-accent border border-accent/20">
                    {exp.period}
                  </span>
                  <span className="text-xs text-slate-400">{exp.type}</span>
                </div>
              </div>

              {/* Impact Metrics */}
              <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={16} className="text-accent" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Key Impact</span>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {Object.entries(exp.impact).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="text-lg font-bold text-white">{value}</div>
                      <div className="text-xs text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Key Contributions</div>
                <ul className="space-y-2">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                      <span className="text-accent mt-1 flex-shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Awards & Recognition */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <Award className="text-accent" size={24} />
          <h3 className="text-2xl font-bold">Awards & Recognition</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="font-semibold text-accent">GEM Award</div>
            <div className="text-sm text-slate-300">Altimetrik Corp. — Recognition for exceptional performance and innovation in GenAI engineering</div>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-accent">Snowflake Summit 2025 Speaker</div>
            <div className="text-sm text-slate-300">"Gaining Customer Insights and Loyalty with Generative AI" — Presenting enterprise AI implementation strategies</div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}