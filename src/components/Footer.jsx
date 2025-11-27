import React from 'react'

export default function Footer(){
  return (
    <footer className="border-t dark:border-gray-800 border-gray-200">
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm dark:text-slate-400 text-slate-600">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div>Created and maintained by - Atharva J</div>
          <div className="text-xs">
            UI Component Credits: <a href="https://21st.dev" target="_blank" rel="noreferrer" className="dark:hover:text-white hover:text-slate-900 transition underline">21st.dev</a>
          </div>
        </div>
        <div className="flex gap-3">
          <a href="https://github.com/attharva-j" target="_blank" rel="noreferrer" className="dark:hover:text-white hover:text-slate-900 transition">GitHub</a>
          <a href="https://www.linkedin.com/in/attharvaj3147" target="_blank" className="dark:hover:text-white hover:text-slate-900 transition">LinkedIn</a>
          <a href="https://www.medium.com/@athex25" target="_blank" className="dark:hover:text-white hover:text-slate-900 transition">Medium</a>
        </div>
      </div>
    </footer>
  )
}