// src/components/ResumePreview.jsx
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ExternalLink } from 'lucide-react'

export default function ResumePreview({ isOpen, onClose }) {
  if (!isOpen) return null

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Atharva_Joshi_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenNewTab = () => {
    window.open('/resume.pdf', '_blank')
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl h-[90vh] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-slate-900/95 to-transparent backdrop-blur-sm z-10 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Resume Preview</h2>
                <p className="text-sm text-slate-400">Atharva Joshi - GenAI Engineer</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenNewTab}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-200 transition-all border border-slate-600/50"
                  title="Open in new tab"
                >
                  <ExternalLink size={18} />
                  <span className="hidden sm:inline">Open</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-accent2 text-slate-900 font-semibold hover:shadow-lg hover:shadow-accent/30 transition-all"
                >
                  <Download size={18} />
                  <span className="hidden sm:inline">Download</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                  title="Close"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="absolute inset-0 pt-20">
            <iframe
              src="/resume.pdf"
              className="w-full h-full bg-white"
              title="Resume Preview"
              style={{ border: 'none' }}
            />
          </div>

          {/* Fallback message if PDF doesn't load */}
          <div className="absolute inset-0 pt-20 flex items-center justify-center pointer-events-none">
            <div className="text-center text-slate-400 p-8 bg-slate-900/50 rounded-lg backdrop-blur-sm">
              <p className="mb-4">If the preview doesn't load, you can:</p>
              <div className="flex gap-4 justify-center pointer-events-auto">
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-accent2 text-slate-900 font-semibold hover:shadow-lg transition-all"
                >
                  Download PDF
                </button>
                <button
                  onClick={handleOpenNewTab}
                  className="px-6 py-3 rounded-lg bg-slate-700 text-white font-semibold hover:bg-slate-600 transition-all"
                >
                  Open in New Tab
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}