import React from 'react'

// Quiet sub-section label: sentence case, small, dimmed. Not an eyebrow; it sits
// in the content column and names a group, it never decorates a section title.
export default function Label({ as: Tag = 'h3', children, className = '' }) {
  return <Tag className={`text-small font-[520] text-fg/55 ${className}`}>{children}</Tag>
}
