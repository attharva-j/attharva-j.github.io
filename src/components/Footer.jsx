import React from 'react'

export default function Footer(){
  return (
    <footer className="border-t border-transparent">
      <div className="container py-6 flex items-center justify-between text-sm text-slate-400">
        <div>© {new Date().getFullYear()} Atharva Joshi — GenAI Engineer</div>
        <div className="flex gap-3">
          <a href="https://github.com/attharva-j" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
          <a href="#" className="hover:text-white">LinkedIn</a>
          <a href="#" className="hover:text-white">Medium</a>
        </div>
      </div>
    </footer>
  )
}
