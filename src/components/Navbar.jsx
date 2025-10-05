import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' }
]

export default function Navbar(){
  const loc = useLocation()
  return (
    <header className="border-b border-transparent py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent2 flex items-center justify-center font-bold text-slate-800 text-lg">AJ</div>
          <div>
            <div className="text-lg font-semibold">Atharva Joshi</div>
            <div className="text-xs text-slate-400">GenAI Engineer & Data Scientist</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} label={l.label} active={loc.pathname === l.to} />
          ))}
          <a className="ml-4 inline-block bg-gradient-to-r from-accent to-accent2 text-slate-900 px-3 py-2 rounded-lg font-semibold" href="/resume.pdf" download>
            Resume
          </a>
        </nav>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

function NavLink({ to, label, active }){
  return (
    <Link to={to} className="relative px-3 py-2 rounded group">
      <div className={`text-sm font-medium ${active ? 'text-white' : 'text-slate-300'}`}>{label}</div>
      {active && (
        <motion.span layoutId="underline" className="block h-0.5 bg-accent rounded mt-1" style={{ width: '100%' }} />
      )}
    </Link>
  )
}

function MobileMenu(){
  // simple link list for mobile
  return (
    <details className="relative">
      <summary className="list-none cursor-pointer">Menu</summary>
      <div className="absolute right-0 mt-2 w-56 bg-[#08101b] rounded-lg p-3 border border-[rgba(255,255,255,0.04)]">
        {links.map(l => (
          <Link key={l.to} to={l.to} className="block py-2 text-slate-300">{l.label}</Link>
        ))}
        <a href="/resume.pdf" download className="block py-2 text-slate-300">Resume</a>
      </div>
    </details>
  )
}