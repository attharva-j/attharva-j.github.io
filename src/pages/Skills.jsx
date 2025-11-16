// src/pages/Skills.jsx - Complete file with interactive graph
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Code2, Database, Cloud, Layers, Users, Target, GitBranch, Sparkles, X, Network } from 'lucide-react'

// Data mapping skills to projects
const skillProjectMap = {
  'LangGraph': ['lululemon'],
  'ChromaDB': ['lululemon'],
  'Neo4j': ['lululemon'],
  'OpenAI': ['lululemon', 'meeting-prep', 'support-assistant'],
  'AWS Bedrock': ['lululemon'],
  'LangSmith': ['lululemon'],
  'TypeScript': ['lululemon'],
  'Agents SDK': ['meeting-prep'],
  'Pinecone': ['meeting-prep', 'support-assistant'],
  'GitHub Actions': ['meeting-prep'],
  'Custom GPTs': ['support-assistant'],
  'AWS': ['lululemon', 'meeting-prep', 'support-assistant'],
  'LLaMA': ['product-analysis'],
  'Snowflake Cortex': ['product-analysis'],
  'SQL': ['product-analysis', 'churn-prediction'],
  'BigQuery': ['churn-prediction'],
  'Spark': ['churn-prediction'],
  'CI/CD': ['churn-prediction'],
  'LSTM': ['sku-planning'],
  'PyCaret': ['sku-planning'],
  'Time Series': ['sku-planning'],
  'Python': ['lululemon', 'meeting-prep', 'support-assistant', 'product-analysis', 'churn-prediction', 'sku-planning']
}

const projectsData = {
  'lululemon': { 
    name: 'Lululemon Automation',
    color: '#22c1c3',
    impact: '60-70% cycle reduction'
  },
  'meeting-prep': { 
    name: 'Meeting Prep Agent',
    color: '#60a5fa',
    impact: '45-50min saved'
  },
  'support-assistant': { 
    name: 'Support Assistant',
    color: '#34d399',
    impact: '75% search reduction'
  },
  'product-analysis': { 
    name: 'Product Analysis',
    color: '#f97316',
    impact: '$135K revenue'
  },
  'churn-prediction': { 
    name: 'Churn Prediction',
    color: '#a78bfa',
    impact: '$150K retained'
  },
  'sku-planning': { 
    name: 'SKU Planning',
    color: '#fb923c',
    impact: '$150K savings'
  }
}

function SkillProjectGraph({ isOpen, onClose }) {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [hoveredProject, setHoveredProject] = useState(null)
  const [nodes, setNodes] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    // Initialize nodes with random positions
    const skillNodes = Object.keys(skillProjectMap).map((skill) => ({
      id: skill,
      type: 'skill',
      x: Math.random() * 600 + 100,
      y: Math.random() * 400 + 100,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    }))

    const projectNodes = Object.keys(projectsData).map((projectId) => ({
      id: projectId,
      type: 'project',
      x: Math.random() * 600 + 100,
      y: Math.random() * 400 + 100,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    }))

    setNodes([...skillNodes, ...projectNodes])

    // Physics simulation
    const interval = setInterval(() => {
      setNodes(prevNodes => {
        return prevNodes.map(node => {
          let { x, y, vx, vy } = node

          // Gravity towards center
          const centerX = 400
          const centerY = 300
          const dx = centerX - x
          const dy = centerY - y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance > 0) {
            vx += (dx / distance) * 0.1
            vy += (dy / distance) * 0.1
          }

          // Repulsion from other nodes
          prevNodes.forEach(other => {
            if (other.id === node.id) return
            const odx = x - other.x
            const ody = y - other.y
            const odist = Math.sqrt(odx * odx + ody * ody)
            if (odist < 100 && odist > 0) {
              vx += (odx / odist) * 0.5
              vy += (ody / odist) * 0.5
            }
          })

          // Damping
          vx *= 0.95
          vy *= 0.95

          // Update position
          x += vx
          y += vy

          // Boundary constraints
          const margin = 50
          if (x < margin) { x = margin; vx *= -0.5 }
          if (x > 750) { x = 750; vx *= -0.5 }
          if (y < margin) { y = margin; vy *= -0.5 }
          if (y > 550) { y = 550; vy *= -0.5 }

          return { ...node, x, y, vx, vy }
        })
      })
    }, 30)

    return () => clearInterval(interval)
  }, [isOpen])

  const getConnections = () => {
    const connections = []
    
    if (hoveredSkill) {
      const projectIds = skillProjectMap[hoveredSkill] || []
      projectIds.forEach(projectId => {
        const skillNode = nodes.find(n => n.id === hoveredSkill)
        const projectNode = nodes.find(n => n.id === projectId)
        if (skillNode && projectNode) {
          connections.push({
            from: skillNode,
            to: projectNode,
            color: projectsData[projectId].color
          })
        }
      })
    }

    if (hoveredProject) {
      Object.entries(skillProjectMap).forEach(([skill, projectIds]) => {
        if (projectIds.includes(hoveredProject)) {
          const skillNode = nodes.find(n => n.id === skill)
          const projectNode = nodes.find(n => n.id === hoveredProject)
          if (skillNode && projectNode) {
            connections.push({
              from: projectNode,
              to: skillNode,
              color: projectsData[hoveredProject].color
            })
          }
        }
      })
    }

    return connections
  }

  const handleProjectClick = (projectId) => {
    onClose()
    setTimeout(() => {
      window.location.href = '/projects'
    }, 300)
  }

  if (!isOpen) return null

  const connections = getConnections()
  const activeProjects = hoveredSkill ? skillProjectMap[hoveredSkill] || [] : []
  const activeSkills = hoveredProject 
    ? Object.entries(skillProjectMap)
        .filter(([_, projects]) => projects.includes(hoveredProject))
        .map(([skill]) => skill)
    : []

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="relative w-full max-w-6xl h-[90vh] bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-2xl border border-accent/20 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-slate-900/90 to-transparent backdrop-blur-sm z-10 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Network className="text-accent" size={24} />
                <div>
                  <h2 className="text-2xl font-bold text-white">Skills × Projects Network</h2>
                  <p className="text-sm text-slate-400">Hover over skills or projects to see connections • Click projects to view details</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <X size={24} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Graph Container */}
          <div ref={containerRef} className="absolute inset-0 pt-24 pb-20">
            <svg className="w-full h-full">
              {/* Connection lines */}
              {connections.map((conn, i) => (
                <motion.line
                  key={i}
                  x1={conn.from.x}
                  y1={conn.from.y}
                  x2={conn.to.x}
                  y2={conn.to.y}
                  stroke={conn.color}
                  strokeWidth="2"
                  strokeOpacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </svg>

            {/* Nodes */}
            {nodes.map(node => {
              const isSkill = node.type === 'skill'
              const isActive = isSkill 
                ? activeSkills.includes(node.id)
                : activeProjects.includes(node.id)
              const isHovered = isSkill 
                ? hoveredSkill === node.id
                : hoveredProject === node.id

              return (
                <motion.div
                  key={node.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: node.x,
                    top: node.y,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onMouseEnter={() => {
                    if (isSkill) setHoveredSkill(node.id)
                    else setHoveredProject(node.id)
                  }}
                  onMouseLeave={() => {
                    if (isSkill) setHoveredSkill(null)
                    else setHoveredProject(null)
                  }}
                  onClick={() => !isSkill && handleProjectClick(node.id)}
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    scale: isHovered ? 1.2 : isActive ? 1.1 : 1,
                    opacity: (hoveredSkill || hoveredProject) && !isActive && !isHovered ? 0.3 : 1
                  }}
                >
                  {isSkill ? (
                    <div className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                      isHovered 
                        ? 'bg-accent text-slate-900 border-accent shadow-lg shadow-accent/50' 
                        : isActive
                        ? 'bg-accent/20 text-accent border-accent'
                        : 'bg-slate-800/90 text-slate-300 border-slate-600/50'
                    }`}>
                      {node.id}
                    </div>
                  ) : (
                    <div className={`px-4 py-3 rounded-lg text-sm font-semibold border-2 transition-all min-w-[160px] text-center ${
                      isHovered
                        ? 'border-accent shadow-lg shadow-accent/50'
                        : isActive
                        ? 'border-accent/60'
                        : 'border-slate-600/50'
                    }`}
                    style={{
                      backgroundColor: isHovered || isActive 
                        ? `${projectsData[node.id].color}20` 
                        : 'rgba(30, 41, 59, 0.9)',
                      color: isHovered || isActive ? projectsData[node.id].color : '#cbd5e1'
                    }}>
                      <div className="font-bold">{projectsData[node.id].name}</div>
                      <div className="text-xs opacity-80 mt-1">{projectsData[node.id].impact}</div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/90 border border-slate-700/50">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span className="text-slate-300">Skills</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/90 border border-slate-700/50">
              <div className="w-3 h-3 rounded-lg bg-accent2"></div>
              <span className="text-slate-300">Projects</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-slate-800/90 border border-slate-700/50">
              <span className="text-slate-400">Click projects to view details</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const skillCategories = [
  {
    category: 'GenAI & LLM Systems',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Retrieval-Augmented Generation (RAG)', level: 95 },
      { name: 'Prompt Engineering & Optimization', level: 95 },
      { name: 'Agentic AI Design', level: 90 },
      { name: 'LLM Orchestration (LangGraph)', level: 90 },
      { name: 'OpenAI Agents SDK', level: 90 },
      { name: 'Custom GPTs Development', level: 85 },
      { name: 'LLaMA / Open-source LLMs', level: 85 },
      { name: 'BERT & Transformer Models', level: 80 }
    ]
  },
  {
    category: 'ML & Predictive Analytics',
    icon: Target,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'Demand Forecasting', level: 90 },
      { name: 'Churn Prediction', level: 90 },
      { name: 'LSTM & RNN', level: 85 },
      { name: 'Decision Trees & Ensemble Methods', level: 85 },
      { name: 'PyCaret & AutoML', level: 80 },
      { name: 'Model Explainability (SHAP, LIME)', level: 80 },
      { name: 'NLP & Sentiment Analysis', level: 85 },
      { name: 'Customer Segmentation', level: 85 }
    ]
  },
  {
    category: 'Vector DBs & Data Infrastructure',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Pinecone', level: 90 },
      { name: 'ChromaDB', level: 85 },
      { name: 'Neo4j (Graph DB)', level: 80 },
      { name: 'Snowflake & Snowflake Cortex', level: 85 },
      { name: 'BigQuery', level: 85 },
      { name: 'PostgreSQL / MySQL', level: 80 },
      { name: 'S3 & Data Lakes', level: 85 }
    ]
  },
  {
    category: 'Cloud & MLOps',
    icon: Cloud,
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'AWS (Lambda, EC2, Bedrock)', level: 85 },
      { name: 'GCP', level: 75 },
      { name: 'CI/CD (GitHub Actions, Airflow)', level: 85 },
      { name: 'Docker & Containerization', level: 80 },
      { name: 'ML Lifecycle Ownership', level: 90 },
      { name: 'LangSmith (Observability)', level: 85 },
      { name: 'Model Monitoring & Deployment', level: 85 }
    ]
  },
  {
    category: 'Programming & Tools',
    icon: Code2,
    color: 'from-indigo-500 to-purple-500',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'SQL', level: 90 },
      { name: 'TypeScript / JavaScript', level: 80 },
      { name: 'Spark', level: 75 },
      { name: 'Git & Version Control', level: 90 },
      { name: 'Cursor AI / VS Code', level: 90 },
      { name: 'Jupyter / PyCharm', level: 85 }
    ]
  },
  {
    category: 'Frameworks & Libraries',
    icon: Layers,
    color: 'from-yellow-500 to-orange-500',
    skills: [
      { name: 'LangChain / LangGraph', level: 90 },
      { name: 'Pandas / NumPy', level: 90 },
      { name: 'Scikit-learn', level: 85 },
      { name: 'TensorFlow / PyTorch', level: 80 },
      { name: 'FastAPI / Flask', level: 80 },
      { name: 'Streamlit', level: 75 }
    ]
  },
  {
    category: 'Leadership & Strategy',
    icon: Users,
    color: 'from-pink-500 to-rose-500',
    skills: [
      { name: 'Cross-functional Collaboration', level: 95 },
      { name: 'Technical Mentorship', level: 90 },
      { name: 'Enterprise AI Strategy', level: 85 },
      { name: 'Stakeholder Communication', level: 90 },
      { name: 'Project Management', level: 85 },
      { name: 'Knowledge Scaling', level: 85 }
    ]
  },
  {
    category: 'Domain Expertise',
    icon: GitBranch,
    color: 'from-cyan-500 to-blue-500',
    skills: [
      { name: 'SaaS & Enterprise Software', level: 90 },
      { name: 'Retail & E-commerce', level: 85 },
      { name: 'MarTech & Customer Analytics', level: 85 },
      { name: 'Pricing Analytics', level: 80 },
      { name: 'Supply Chain Optimization', level: 80 },
      { name: 'CX Optimization', level: 85 }
    ]
  }
]

export default function Skills(){
  const [isGraphOpen, setIsGraphOpen] = useState(false)
  
  return (
    <section className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h2 className="text-3xl font-bold">Skills & Expertise</h2>
        <p className="text-slate-300 text-lg max-w-3xl">
          Comprehensive technical expertise across the AI/ML stack, from research to production deployment.
        </p>
      </motion.div>

      {/* Interactive Graph Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-8 bg-gradient-to-br from-accent/5 to-accent2/5 border-accent/20"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="text-accent" size={28} />
              <h3 className="text-2xl font-bold">Interactive Skills × Projects Map</h3>
            </div>
            <p className="text-slate-300">
              Explore how my skills connect to real projects through an interactive gravity-based network visualization. 
              Hover over skills to see related projects, or click projects to dive deeper.
            </p>
          </div>
          <button
            onClick={() => setIsGraphOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-accent to-accent2 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-accent/30 transition-all whitespace-nowrap"
          >
            <Network size={20} />
            Open Network Map
          </button>
        </div>
      </motion.div>

      {/* Traditional Skills Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {skillCategories.map((category, idx) => {
          const Icon = category.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card p-6 space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-20`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">{category.category}</h3>
              </div>

              {/* Skills with Progress Bars */}
              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">{skill.name}</span>
                      <span className="text-xs text-slate-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + idx * 0.1 + i * 0.05 }}
                        className={`h-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Certifications & Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-8"
      >
        <h3 className="text-2xl font-bold mb-6">Continuous Learning</h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-accent">10+</div>
            <div className="text-sm text-slate-400">Production Systems Deployed</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-accent">$900K+</div>
            <div className="text-sm text-slate-400">Cumulative Cost Savings</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-accent">5+</div>
            <div className="text-sm text-slate-400">Enterprise Clients</div>
          </div>
        </div>
      </motion.div>

      {/* Graph Modal */}
      <SkillProjectGraph 
        isOpen={isGraphOpen} 
        onClose={() => setIsGraphOpen(false)} 
      />
    </section>
  )
}