import React from 'react'

// Quiet list: a short hairline marks each item instead of a bullet.
export default function MarkedList({ items, className = 'mt-4' }) {
  return (
    <ul className={`flex flex-col gap-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="grid grid-cols-[0.875rem_1fr] gap-3 text-[0.9375rem] leading-relaxed text-fg/80">
          <span aria-hidden="true" className="mt-[0.8em] h-px w-full bg-rule-strong" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
