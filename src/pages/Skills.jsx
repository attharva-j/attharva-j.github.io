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
  'Snowflake': ['product-analysis'],
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
    name: 'Lululemon',
    fullName: 'Workflow Automation',
    impact: '60-70% faster'
  },
  'meeting-prep': { 
    name: 'Meeting Prep',
    fullName: 'AI Agent',
    impact: '45-50min saved'
  },
  'support-assistant': { 
    name: 'Support',
    fullName: 'RAG Assistant',
    impact: '75% reduction'
  },
  'product-analysis': { 
    name: 'Product',
    fullName: 'Analytics',
    impact: '$135K revenue'
  },
  'churn-prediction': { 
    name: 'Churn',
    fullName: 'Prediction',
    impact: '$150K retained'
  },
  'sku-planning': { 
    name: 'SKU',
    fullName: 'Planning',
    impact: '$150K savings'
  }
}

function SkillProjectGraph({ isOpen, onClose }) {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [hoveredProject, setHoveredProject] = useState(null)
  const [nodes, setNodes] = useState([])
  const [links, setLinks] = useState([])
  const [draggedNode, setDraggedNode] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const skills = Object.keys(skillProjectMap)
    const projects = Object.keys(projectsData)
    
    const width = 1000
    const height = 600
    const centerX = width / 2
    const centerY = height / 2
    const skillRadius = 180
    const projectRadius = 180

    const skillNodes = skills.map((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2
      return {
        id: skill,
        type: 'skill',
        x: centerX - 250 + Math.cos(angle) * skillRadius,
        y: centerY + Math.sin(angle) * skillRadius,
        originalX: centerX - 250 + Math.cos(angle) * skillRadius,
        originalY: centerY + Math.sin(angle) * skillRadius,
        vx: 0,
        vy: 0
      }
    })

    const projectNodes = projects.map((project, i) => {
      const angle = (i / projects.length) * Math.PI * 2 - Math.PI / 2
      return {
        id: project,
        type: 'project',
        x: centerX + 250 + Math.cos(angle) * projectRadius,
        y: centerY + Math.sin(angle) * projectRadius,
        originalX: centerX + 250 + Math.cos(angle) * projectRadius,
        originalY: centerY + Math.sin(angle) * projectRadius,
        vx: 0,
        vy: 0
      }
    })

    const linkList = []
    Object.entries(skillProjectMap).forEach(([skill, projectIds]) => {
      projectIds.forEach(projectId => {
        linkList.push({ source: skill, target: projectId })
      })
    })

    setNodes([...skillNodes, ...projectNodes])
    setLinks(linkList)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!draggedNode) return

    const animate = () => {
      setNodes(prevNodes => {
        return prevNodes.map(node => {
          if (node.id === draggedNode) {
            return node
          }

          const draggedNodeData = prevNodes.find(n => n.id === draggedNode)
          if (!draggedNodeData) return node

          const isConnected = links.some(link => 
            (link.source === draggedNode && link.target === node.id) ||
            (link.target === draggedNode && link.source === node.id)
          )

          if (isConnected) {
            const dx = draggedNodeData.x - node.x
            const dy = draggedNodeData.y - node.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const idealDist = 200
            const force = (dist - idealDist) * 0.05

            node.vx += (dx / dist) * force
            node.vy += (dy / dist) * force
          }

          const toDx = node.originalX - node.x
          const toDy = node.originalY - node.y
          node.vx += toDx * 0.05
          node.vy += toDy * 0.05

          node.vx *= 0.85
          node.vy *= 0.85

          return {
            ...node,
            x: node.x + node.vx,
            y: node.y + node.vy
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [draggedNode, links])

  const handleMouseDown = (e, nodeId) => {
    e.stopPropagation()
    const node = nodes.find(n => n.id === nodeId)
    if (!node) return

    const rect = containerRef.current.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left - node.x,
      y: e.clientY - rect.top - node.y
    })
    setDraggedNode(nodeId)
  }

  const handleMouseMove = (e) => {
    if (!draggedNode) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - dragOffset.x
    const y = e.clientY - rect.top - dragOffset.y

    setNodes(prevNodes => 
      prevNodes.map(node => 
        node.id === draggedNode 
          ? { ...node, x, y }
          : node
      )
    )
  }

  const handleMouseUp = () => {
    setDraggedNode(null)
  }

  useEffect(() => {
    if (draggedNode) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [draggedNode, dragOffset])

  const handleProjectClick = (projectId) => {
    if (draggedNode) return
    onClose()
    setTimeout(() => {
      window.location.href = '/projects'
    }, 300)
  }

  if (!isOpen) return null

  const activeProjects = hoveredSkill ? skillProjectMap[hoveredSkill] || [] : []
  const activeSkills = hoveredProject 
    ? Object.entries(skillProjectMap)
        .filter(([_, projects]) => projects.includes(hoveredProject))
        .map(([skill]) => skill)
    : []

  const nodeMap = new Map(nodes.map(n => [n.id, n]))

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="relative w-full max-w-[1100px] h-[700px] bg-gradient-to-br from-[#0a0f1e] via-[#0f1628] to-[#1a1f35] rounded-2xl border border-slate-700/30 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-slate-900/80 to-transparent backdrop-blur-sm z-20 border-b border-slate-700/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-slate-700/30 to-slate-800/30">
                  <Network className="text-slate-300" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Skills × Projects Network</h2>
                  <p className="text-sm text-slate-400">Hover to explore • Drag nodes to rearrange • Click projects for details</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-700/30 transition-colors"
              >
                <X size={24} className="text-slate-400" />
              </button>
            </div>
          </div>

          <div 
            ref={containerRef}
            className="absolute inset-0 pt-24 pb-20"
            style={{ cursor: draggedNode ? 'grabbing' : 'default' }}
          >
            <svg className="w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="skill-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4a5568" />
                  <stop offset="100%" stopColor="#2d3748" />
                </linearGradient>
                <linearGradient id="project-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b4f6b" />
                  <stop offset="100%" stopColor="#2c3e5a" />
                </linearGradient>
              </defs>

              {links.map((link, i) => {
                const sourceNode = nodeMap.get(link.source)
                const targetNode = nodeMap.get(link.target)
                if (!sourceNode || !targetNode) return null

                const isActive = 
                  (hoveredSkill === link.source && activeProjects.includes(link.target)) ||
                  (hoveredProject === link.target && activeSkills.includes(link.source))

                return (
                  <line
                    key={`${link.source}-${link.target}`}
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isActive ? "#64748b" : "#334155"}
                    strokeWidth={isActive ? "2" : "1"}
                    strokeOpacity={isActive ? 0.8 : 0.2}
                  />
                )
              })}
            </svg>

            {nodes.map(node => {
              const isSkill = node.type === 'skill'
              const isActive = isSkill 
                ? activeSkills.includes(node.id)
                : activeProjects.includes(node.id)
              const isHovered = isSkill 
                ? hoveredSkill === node.id
                : hoveredProject === node.id
              const isDragging = draggedNode === node.id

              return (
                <motion.div
                  key={node.id}
                  className="absolute select-none pointer-events-auto"
                  style={{
                    left: node.x,
                    top: node.y,
                    transform: 'translate(-50%, -50%)',
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, node.id)}
                  onMouseEnter={() => {
                    if (!draggedNode) {
                      if (isSkill) setHoveredSkill(node.id)
                      else setHoveredProject(node.id)
                    }
                  }}
                  onMouseLeave={() => {
                    if (!draggedNode) {
                      if (isSkill) setHoveredSkill(null)
                      else setHoveredProject(null)
                    }
                  }}
                  onClick={() => !isSkill && handleProjectClick(node.id)}
                  animate={{
                    scale: isHovered ? 1.1 : isActive ? 1.05 : isDragging ? 1.15 : 1,
                    opacity: (hoveredSkill || hoveredProject) && !draggedNode ? (isActive || isHovered ? 1 : 0.3) : 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {isSkill ? (
                    <div className={`px-4 py-2 rounded-full text-sm font-medium border transition-all backdrop-blur-sm ${
                      isHovered || isDragging
                        ? 'bg-gradient-to-br from-[#5a7a9e] to-[#4a6a8e] border-slate-500 text-white shadow-lg' 
                        : isActive
                        ? 'bg-gradient-to-br from-[#4a5568] to-[#2d3748] border-slate-600 text-slate-200'
                        : 'bg-gradient-to-br from-[#374151] to-[#1f2937] border-slate-700 text-slate-400'
                    }`}>
                      {node.id}
                    </div>
                  ) : (
                    <div className={`px-5 py-3 rounded-xl text-sm font-semibold border-2 transition-all backdrop-blur-sm min-w-[140px] text-center ${
                      isHovered || isDragging
                        ? 'bg-gradient-to-br from-[#6b8caf] to-[#5a7c9f] border-slate-400 text-white shadow-xl'
                        : isActive
                        ? 'bg-gradient-to-br from-[#3b4f6b] to-[#2c3e5a] border-slate-600 text-slate-200'
                        : 'bg-gradient-to-br from-[#2d3748] to-[#1a202c] border-slate-700 text-slate-400'
                    }`}>
                      <div className="font-bold">{projectsData[node.id].name}</div>
                      <div className="text-xs opacity-90 mt-1">{projectsData[node.id].impact}</div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#4a5568] to-[#2d3748]"></div>
              <span className="text-slate-300">Skills ({Object.keys(skillProjectMap).length})</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <div className="w-3 h-3 rounded-lg bg-gradient-to-br from-[#3b4f6b] to-[#2c3e5a]"></div>
              <span className="text-slate-300">Projects (6)</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
              <span className="text-slate-400">Total connections: {links.length}</span>
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
    color: 'from-indigo-500/20 to-purple-500/20',
    borderColor: 'border-indigo-500/30',
    skills: [
      'Retrieval-Augmented Generation (RAG)',
      'Prompt Engineering & Optimization',
      'Agentic AI Design',
      'LLM Orchestration (LangGraph)',
      'OpenAI Agents SDK',
      'Custom GPTs Development',
      'LLaMA / Open-source LLMs',
      'BERT & Transformer Models'
    ]
  },
  {
    category: 'ML & Predictive Analytics',
    icon: Target,
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    skills: [
      'Demand Forecasting',
      'Churn Prediction',
      'LSTM & RNN',
      'Decision Trees & Ensemble Methods',
      'PyCaret & AutoML',
      'Model Explainability (SHAP, LIME)',
      'NLP & Sentiment Analysis',
      'Customer Segmentation'
    ]
  },
  {
    category: 'Vector DBs & Data Infrastructure',
    icon: Database,
    color: 'from-emerald-500/20 to-green-500/20',
    borderColor: 'border-emerald-500/30',
    skills: [
      'Pinecone',
      'ChromaDB',
      'Neo4j (Graph DB)',
      'Snowflake & Snowflake Cortex',
      'BigQuery',
      'PostgreSQL / MySQL',
      'S3 & Data Lakes'
    ]
  },
  {
    category: 'Cloud & MLOps',
    icon: Cloud,
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-500/30',
    skills: [
      'AWS (Lambda, EC2, Bedrock)',
      'GCP',
      'CI/CD (GitHub Actions, Airflow)',
      'Docker & Containerization',
      'ML Lifecycle Ownership',
      'LangSmith (Observability)',
      'Model Monitoring & Deployment'
    ]
  },
  {
    category: 'Programming & Tools',
    icon: Code2,
    color: 'from-violet-500/20 to-purple-500/20',
    borderColor: 'border-violet-500/30',
    skills: [
      'Python',
      'SQL',
      'TypeScript / JavaScript',
      'Spark',
      'Git & Version Control',
      'Cursor AI / VS Code',
      'Jupyter / PyCharm'
    ]
  },
  {
    category: 'Frameworks & Libraries',
    icon: Layers,
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30',
    skills: [
      'LangChain / LangGraph',
      'Pandas / NumPy',
      'Scikit-learn',
      'TensorFlow / PyTorch',
      'FastAPI / Flask',
      'Streamlit'
    ]
  },
  {
    category: 'Leadership & Strategy',
    icon: Users,
    color: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'border-pink-500/30',
    skills: [
      'Cross-functional Collaboration',
      'Technical Mentorship',
      'Enterprise AI Strategy',
      'Stakeholder Communication',
      'Project Management',
      'Knowledge Scaling'
    ]
  },
  {
    category: 'Domain Expertise',
    icon: GitBranch,
    color: 'from-sky-500/20 to-blue-500/20',
    borderColor: 'border-sky-500/30',
    skills: [
      'SaaS & Enterprise Software',
      'Retail & E-commerce',
      'MarTech & Customer Analytics',
      'Pricing Analytics',
      'Supply Chain Optimization',
      'CX Optimization'
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-8 bg-gradient-to-br from-slate-800/30 to-slate-700/20 border-slate-600/30"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-slate-600/30 to-slate-700/30">
                <Sparkles className="text-slate-300" size={28} />
              </div>
              <h3 className="text-2xl font-bold">Interactive Skills × Projects Network</h3>
            </div>
            <p className="text-slate-300">
              Explore the relationships between my technical skills and real-world projects through an interactive network visualization. 
              Hover to see connections, click projects to learn more.
            </p>
          </div>
          <button
            onClick={() => setIsGraphOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-slate-500 hover:to-slate-600 hover:shadow-xl transition-all whitespace-nowrap border border-slate-500/30"
          >
            <Network size={20} />
            Explore Network
          </button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {skillCategories.map((category, idx) => {
          const Icon = category.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              whileHover={{ y: -4 }}
              className={`glass-card p-6 space-y-4 bg-gradient-to-br ${category.color} border ${category.borderColor}`}
            >
              <div className="flex items-center gap-3 pb-3 border-b border-slate-700/50">
                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${category.color} border ${category.borderColor}`}>
                  <Icon className="w-5 h-5 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-100">{category.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 + i * 0.02 }}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 hover:text-slate-200 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      <SkillProjectGraph 
        isOpen={isGraphOpen} 
        onClose={() => setIsGraphOpen(false)} 
      />
    </section>
  )
}