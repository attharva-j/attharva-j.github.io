import React from 'react'

// One block of the single-page document. The id doubles as the scroll target
// for its route (see lib/sections.js).
export default function Section({ id, labelledBy, className = '', children }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative ${className}`}>
      {children}
    </section>
  )
}
