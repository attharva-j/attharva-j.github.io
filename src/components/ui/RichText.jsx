import React from 'react'

// Renders a content paragraph made of segments: plain strings, { strong } or { em }.
// Emphasis lifts to full ink against the dimmed body colour.
export default function RichText({ segments }) {
  return segments.map((segment, index) => {
    if (typeof segment === 'string') return <React.Fragment key={index}>{segment}</React.Fragment>
    if (segment.strong)
      return (
        <strong key={index} className="font-[540] text-fg">
          {segment.strong}
        </strong>
      )
    return (
      <em key={index} className="text-fg">
        {segment.em}
      </em>
    )
  })
}
