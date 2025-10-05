import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const [open, setOpen] = React.useState(false)
  const loc = useLocation()

  // close menu on route change
  React.useEffect(() => {
    setOpen(false)
  }, [loc.pathname])

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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} label={l.label} active={loc.pathname === l.to} />
          ))}
          <a className="ml-4 inline-block bg-gradient-to-r from-accent to-accent2 text-slate-900 px-3 py-2 rounded-lg font-semibold" href="/resume.pdf" download>
            Resume
          </a>
        </nav>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
            className="p-2 rounded-md focus:outline-none"
          >
            {/* Toggle between Menu and X icons */}
            {open ? <X size={22} color="white" /> : <Menu size={22} color="white" />}
          </button>
        </div>
      </div>

      {/* Full-screen mobile drawer (AnimatePresence -> slide from right) */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.36, ease: 'easeInOut' }}
            className="fixed inset-0 z-50"
            aria-hidden={!open}
          >
            {/* translucent backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black"
              style={{ mixBlendMode: 'multiply' }}
            />

            {/* sliding panel */}
            <div className="absolute inset-0 flex justify-end">
              <div className="w-full h-full bg-[#051122] backdrop-blur-sm p-8 overflow-y-auto">
                <nav className="flex flex-col items-start gap-6 mt-12">
                  {links.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="text-2xl font-semibold text-slate-100 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  ))}

                  <a href="/resume.pdf" download className="mt-6 inline-block bg-accent px-4 py-2 rounded-lg text-slate-900 font-semibold">
                    Download Resume
                  </a>

                  <div className="mt-8 flex gap-4 text-slate-400">
                    <a href="https://github.com/attharva-j" target="_blank" rel="noreferrer">GitHub</a>
                    <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
                    <a href="#" target="_blank" rel="noreferrer">Medium</a>
                  </div>
                </nav>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  )
}

function NavLink({ to, label, active }) {
  return (
    <Link to={to} className="relative px-3 py-2 rounded group">
      <div className={`text-sm font-medium ${active ? 'text-white' : 'text-slate-300'}`}>{label}</div>
      {active && <motion.span layoutId="underline" className="block h-0.5 bg-accent rounded mt-1" style={{ width: '100%' }} />}
    </Link>
  )
}