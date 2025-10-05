import React from 'react'
import ProjectCard from '../components/ProjectCard'
import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Lululemon — GenAI Change Request Automation',
    description: 'LangGraph orchestration, ChromaDB + Neo4j dual retrieval, SQL generation with audit & rollback packs.',
    tags: ['LangGraph','ChromaDB','Neo4j','OpenAI','AWS'],
    links: {}
  },
  {
    title: 'Customer Meeting Prep Agent',
    description: 'Vectorized 100K+ user story fragments to generate contextual pre-meeting insights using Pinecone + Agents SDK.',
    tags: ['Agents SDK','Pinecone','GitHub Actions'],
    links: {}
  },
  {
    title: 'RAG-based Support Assistant',
    description: 'Built CustomGPT for support using Pinecone and OpenAI embeddings to reduce support search time by 75%.',
    tags: ['Pinecone','OpenAI','Custom GPTs'],
    links: {}
  }
]

export default function Projects(){
  return (
    <section className="space-y-6">
      <motion.h2 initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold">Projects</motion.h2>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p,i) => (
          <ProjectCard key={i} {...p} />
        ))}
      </div>
    </section>
  )
}
