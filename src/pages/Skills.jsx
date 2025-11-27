import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Code2, Database, Cloud, Layers, Users, Target, GitBranch, Sparkles, X, Network } from 'lucide-react'
import * as d3 from 'd3'

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
  const svgRef = useRef(null)
  const [hoveredNode, setHoveredNode] = useState(null)
  const simulationRef = useRef(null)
  const [isMaximized, setIsMaximized] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Show tooltip on first open
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(true)
      const timer = setTimeout(() => setShowTooltip(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !svgRef.current) return

    const width = isMaximized ? window.innerWidth - 40 : 1000
    const height = isMaximized ? window.innerHeight - 40 : 600

    // Clear existing content
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    // Create container group for zoom/pan
    const container = svg.append('g')

    // Prepare nodes data
    const nodesData = [
      // Skill nodes (left side)
      ...Object.keys(skillProjectMap).map(skill => ({
        id: skill,
        name: skill,
        type: 'skill',
        group: 1
      })),
      // Project nodes (right side)
      ...Object.keys(projectsData).map(projectId => ({
        id: projectId,
        name: projectsData[projectId].name,
        fullName: projectsData[projectId].fullName,
        impact: projectsData[projectId].impact,
        type: 'project',
        group: 2
      }))
    ]

    // Prepare links data
    const linksData = []
    Object.entries(skillProjectMap).forEach(([skill, projectIds]) => {
      projectIds.forEach(projectId => {
        linksData.push({
          source: skill,
          target: projectId
        })
      })
    })

    // Create force simulation
    const simulation = d3.forceSimulation(nodesData)
      .force('link', d3.forceLink(linksData)
        .id(d => d.id)
        .distance(150)
        .strength(0.5))
      .force('charge', d3.forceManyBody()
        .strength(-800)
        .distanceMax(400))
      .force('x', d3.forceX(d => d.type === 'skill' ? width * 0.3 : width * 0.7)
        .strength(0.8))
      .force('y', d3.forceY(height / 2)
        .strength(0.3))
      .force('collision', d3.forceCollide()
        .radius(d => d.type === 'skill' ? 50 : 60)
        .strength(0.8))

    simulationRef.current = simulation

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        container.attr('transform', event.transform)
      })

    svg.call(zoom)

    // Create arrow marker for links
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 30)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#22c1c3')
      .style('opacity', 0.6)

    // Create glow filter
    const defs = svg.select('defs')
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%')
    
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '5')
      .attr('result', 'coloredBlur')
    
    const feMerge = filter.append('feMerge')
    feMerge.append('feMergeNode').attr('in', 'coloredBlur')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

    // Create links
    const link = container.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(linksData)
      .enter()
      .append('line')
      .attr('stroke', '#334155')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.4)
      .attr('marker-end', 'url(#arrowhead)')

    // Create node groups
    const node = container.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodesData)
      .enter()
      .append('g')
      .attr('class', 'node')
      .style('cursor', d => d.type === 'project' ? 'pointer' : 'grab')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('mouseenter', function(event, d) {
        setHoveredNode(d.id)
        
        // Highlight this node
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('filter', 'url(#glow)')
          .attr('stroke-width', 4)

        // Find connected nodes
        const connectedNodes = new Set()
        linksData.forEach(l => {
          if (l.source.id === d.id) connectedNodes.add(l.target.id)
          if (l.target.id === d.id) connectedNodes.add(l.source.id)
        })
        connectedNodes.add(d.id)

        // Highlight connected links
        link
          .transition()
          .duration(200)
          .attr('stroke', l => 
            (l.source.id === d.id || l.target.id === d.id) ? '#22c1c3' : '#334155')
          .attr('stroke-width', l => 
            (l.source.id === d.id || l.target.id === d.id) ? 3 : 2)
          .attr('stroke-opacity', l => 
            (l.source.id === d.id || l.target.id === d.id) ? 0.8 : 0.2)

        // Highlight connected nodes
        node
          .transition()
          .duration(200)
          .attr('opacity', n => connectedNodes.has(n.id) ? 1 : 0.3)

        node.select('circle')
          .transition()
          .duration(200)
          .attr('stroke-width', n => connectedNodes.has(n.id) ? 3 : 2)
          .attr('stroke', n => {
            if (n.id === d.id) return '#22c1c3'
            if (connectedNodes.has(n.id)) return '#60a5fa'
            return n.type === 'skill' ? '#64748b' : '#3b82f6'
          })
      })
      .on('mouseleave', function() {
        setHoveredNode(null)

        // Reset all styles
        d3.select(this)
          .select('circle')
          .transition()
          .duration(200)
          .attr('filter', null)
          .attr('stroke-width', 2)

        link
          .transition()
          .duration(200)
          .attr('stroke', '#334155')
          .attr('stroke-width', 2)
          .attr('stroke-opacity', 0.4)

        node
          .transition()
          .duration(200)
          .attr('opacity', 1)

        node.select('circle')
          .transition()
          .duration(200)
          .attr('stroke-width', 2)
          .attr('stroke', d => d.type === 'skill' ? '#64748b' : '#3b82f6')
      })
      .on('click', function(event, d) {
        if (d.type === 'project') {
          onClose()
          setTimeout(() => {
            window.location.href = '/projects'
          }, 300)
        }
      })

   // Add circles for skills
    node.filter(d => d.type === 'skill')
      .append('circle')
      .attr('r', 45)
      .attr('fill', 'rgba(51, 65, 85, 0.9)')
      .attr('stroke', '#64748b')
      .attr('stroke-width', 2)

    // Add circles for projects (larger)
    node.filter(d => d.type === 'project')
      .append('circle')
      .attr('r', 55)
      .attr('fill', 'rgba(30, 58, 138, 0.9)')
      .attr('stroke', '#3b82f6')
      .attr('stroke-width', 2)

    // Add text for skills
    node.filter(d => d.type === 'skill')
      .each(function(d) {
        const text = d3.select(this).append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('fill', '#f1f5f9')
          .attr('font-size', '12px')
          .attr('font-weight', '600')
          .attr('pointer-events', 'none')
        
        // Wrap text if too long
        const words = d.name.split(' ')
        if (words.length > 1) {
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', '-0.4em')
            .text(words[0])
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', '1.2em')
            .text(words.slice(1).join(' '))
        } else {
          text.text(d.name)
        }
      })

    // Add text for projects (name)
    node.filter(d => d.type === 'project')
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.5em')
      .attr('fill', '#f1f5f9')
      .attr('font-size', '14px')
      .attr('font-weight', '700')
      .attr('pointer-events', 'none')
      .text(d => d.name)

    // Add text for projects (impact)
    node.filter(d => d.type === 'project')
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .attr('fill', '#22c1c3')
      .attr('font-size', '11px')
      .attr('font-weight', '500')
      .attr('pointer-events', 'none')
      .text(d => d.impact)

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
      d3.select(this).style('cursor', 'grabbing')
    }

    function dragged(event, d) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
      d3.select(this).style('cursor', d => d.type === 'project' ? 'pointer' : 'grab')
    }

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

      node
        .attr('transform', d => `translate(${d.x},${d.y})`)
    })

    // Cleanup
    return () => {
      simulation.stop()
    }
  }, [isOpen, isMaximized])

  if (!isOpen) return null

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
          animate={{ 
            scale: 1, 
            opacity: 1,
            width: isMaximized ? 'calc(100vw - 2rem)' : '1100px',
            height: isMaximized ? 'calc(100vh - 2rem)' : '700px'
          }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className={`relative ${isMaximized ? 'w-full h-full' : 'w-full max-w-[1100px] h-[700px]'} bg-gradient-to-br from-[#0a0f1e] via-[#0f1628] to-[#1a1f35] rounded-2xl border border-slate-700/30 shadow-2xl overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-slate-900/80 to-transparent backdrop-blur-sm z-20 border-b border-slate-700/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-slate-700/30 to-slate-800/30">
                  <Network className="text-slate-300" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">Skills × Projects Network</h2>
                  <p className="text-sm text-slate-400">
                    {hoveredNode 
                      ? hoveredNode in skillProjectMap
                        ? `${hoveredNode} → Used in ${skillProjectMap[hoveredNode]?.length || 0} projects`
                        : projectsData[hoveredNode]
                        ? `${projectsData[hoveredNode].fullName} → ${projectsData[hoveredNode].impact}`
                        : 'Hover to explore connections'
                      : 'Hover to explore • Drag nodes • Scroll to zoom • Click projects for details'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Maximize/Minimize Button */}
                <div className="relative">
                  <motion.button
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="p-2 rounded-lg hover:bg-slate-700/30 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={isMaximized ? "Minimize" : "Maximize"}
                  >
                    {isMaximized ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                      </svg>
                    )}
                  </motion.button>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {showTooltip && !isMaximized && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full right-0 mt-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap shadow-lg border border-slate-700 z-50"
                      >
                        <div className="flex items-center gap-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                          </svg>
                          <span>Maximize for better readability</span>
                        </div>
                        <div className="absolute -top-1 right-4 w-2 h-2 bg-slate-900 border-t border-l border-slate-700 rotate-45"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-700/30 transition-colors"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Graph Container */}
          <div className="absolute inset-0 pt-24 pb-20 flex items-center justify-center">
            <svg ref={svgRef} className="w-full h-full" />
          </div>

          {/* Legend */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-center gap-4 text-sm z-20">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/70 border border-slate-700/50 backdrop-blur-sm">
              <div className="w-3 h-3 rounded-full bg-[#334155]"></div>
              <span className="text-slate-300">Skills ({Object.keys(skillProjectMap).length})</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/70 border border-slate-700/50 backdrop-blur-sm">
              <div className="w-3 h-3 rounded-lg bg-[#1e3a8a]"></div>
              <span className="text-slate-300">Projects (6)</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-slate-800/70 border border-slate-700/50 backdrop-blur-sm">
              <span className="text-slate-400">
                Total connections: {Object.values(skillProjectMap).flat().length}
              </span>
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