// src/components/ResumeButton.jsx
import React, { useState } from 'react'
import { FileText, Download } from 'lucide-react'
import ResumePreview from './ResumePreview'

export default function ResumeButton({ 
  variant = 'primary', 
  showIcon = true,
  className = '' 
}) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const variantStyles = {
    primary: 'bg-gradient-to-r from-accent to-accent2 text-slate-900 hover:shadow-lg hover:shadow-accent/20',
    secondary: 'border-2 border-accent/30 text-slate-200 hover:bg-accent/10',
    ghost: 'bg-slate-800/50 text-slate-200 hover:bg-slate-800',
    navbar: 'bg-gradient-to-r from-accent to-accent2 text-slate-900'
  }

  const handleClick = (e) => {
    e.preventDefault()
    setIsPreviewOpen(true)
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${variantStyles[variant]} ${className}`}
      >
        {showIcon && <FileText size={18} />}
        <span>Resume</span>
      </button>

      <ResumePreview 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
      />
    </>
  )
}

// Quick download button variant (just downloads without preview)
export function ResumeDownloadButton({ className = '' }) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Atharva_Joshi_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleDownload}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-accent to-accent2 text-slate-900 hover:shadow-lg hover:shadow-accent/20 transition-all ${className}`}
    >
      <Download size={18} />
      <span>Download Resume</span>
    </button>
  )
}