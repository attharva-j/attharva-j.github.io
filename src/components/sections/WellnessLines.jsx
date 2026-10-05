import React from 'react'

// One-line drawings for the About section's wellness theme. Hairline strokes
// in the current colour, round caps, no fills; they are atmosphere, not icons.
// viewBoxes are tight to each drawing so they can be sized by width alone.
const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke'
}

export function SeatedFigure(props) {
  return (
    <svg viewBox="0 0 240 210" aria-hidden="true" {...props}>
      <g {...STROKE}>
        <circle cx="120" cy="35" r="15" />
        {/* shoulders, arms resting on the knees, torso */}
        <path d="M114 51 C114 58 112 62 104 66 C96 69 88 70 84 76 C78 92 72 108 70 120 C68 132 62 144 54 152 C50 156 52 162 58 160 C62 158 66 154 68 150 C72 140 78 128 82 118 C84 108 88 96 92 88 C94 102 96 118 98 132" />
        <path d="M 126 51 C 126 58 128 62 136 66 C 144 69 152 70 156 76 C 162 92 168 108 170 120 C 172 132 178 144 186 152 C 190 156 188 162 182 160 C 178 158 174 154 172 150 C 168 140 162 128 158 118 C 156 108 152 96 148 88 C 146 102 144 118 142 132" />
        {/* crossed legs */}
        <path d="M98 132 C80 140 52 148 38 160 C30 167 34 177 46 179 C80 184 160 184 194 179 C206 177 210 167 202 160 C188 148 160 140 142 132" />
        <path d="M74 170 C102 158 138 158 166 170" />
        {/* mat */}
        <path d="M16 198 H224" />
      </g>
    </svg>
  )
}

export function TreePose(props) {
  return (
    <svg viewBox="0 0 160 300" aria-hidden="true" {...props}>
      <g {...STROKE}>
        <circle cx="80" cy="40" r="13" />
        <path d="M75 53 V60 M85 53 V60" />
        {/* shoulders and arms folding to prayer at the chest */}
        <path d="M75 60 C66 62 58 64 54 70 C46 88 42 104 48 116 C54 124 66 122 78 116" />
        <path d="M85 60 C94 62 102 64 106 70 C114 88 118 104 112 116 C106 124 94 122 82 116" />
        <path d="M78 116 L80 100 L82 116" />
        {/* torso and hips */}
        <path d="M60 82 C62 110 64 138 66 158 M100 82 C98 110 96 138 94 158" />
        <path d="M66 158 C72 166 88 166 94 158" />
        {/* standing leg */}
        <path d="M68 160 C70 200 70 240 70 280 M80 166 C80 204 79 244 78 280" />
        <path d="M62 284 H88" />
        {/* lifted leg: knee opens to the side, sole on the inner thigh */}
        <path d="M92 164 C108 174 124 186 132 200 C118 208 100 210 80 206" />
        <path d="M18 292 H142" />
      </g>
    </svg>
  )
}

export function DownwardDog(props) {
  return (
    <svg viewBox="0 0 280 160" aria-hidden="true" {...props}>
      <g {...STROKE}>
        {/* back line: hands, shoulders, lifted hips, backs of the legs */}
        <path d="M44 138 L92 88 C112 70 132 48 148 32 C150 30 154 30 156 33 C178 64 204 102 230 138" />
        {/* front line: inner arms, belly, fronts of the legs */}
        <path d="M58 138 L98 100 C116 86 134 66 148 50 C166 76 190 106 214 138" />
        {/* head hanging between the arms */}
        <circle cx="101" cy="115" r="9" />
        <path d="M98 101 L100 106" />
        <path d="M34 140 H62 M210 140 H236" />
        <path d="M14 150 H266" />
      </g>
    </svg>
  )
}

export function RolledMat(props) {
  return (
    <svg viewBox="0 0 220 110" aria-hidden="true" {...props}>
      <g {...STROKE}>
        {/* spiral end */}
        <path d="M52 55 m-34 0 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0" />
        <path d="M52 55 m-22 0 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0" />
        <path d="M52 55 m-10 0 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0" />
        {/* body */}
        <path d="M52 21 H196 C202 21 206 25 206 31 V79 C206 85 202 89 196 89 H52" />
        {/* strap */}
        <path d="M118 18 V92" />
        <path d="M128 18 V92" />
      </g>
    </svg>
  )
}

export function Kettlebell(props) {
  return (
    <svg viewBox="0 0 120 140" aria-hidden="true" {...props}>
      <g {...STROKE}>
        <path d="M34 66 C34 26 86 26 86 66" />
        <path d="M44 64 C44 40 76 40 76 64" />
        <path d="M30 124 C14 108 14 76 38 64 C52 58 68 58 82 64 C106 76 106 108 90 124 Z" />
        <path d="M24 132 H96" />
      </g>
    </svg>
  )
}

// Concentric rings that expand and settle like a slow breath. Rendered as a
// stack so each ring can scale on its own; see About for the motion.
export const BREATH_RINGS = [0.42, 0.64, 0.86, 1]
