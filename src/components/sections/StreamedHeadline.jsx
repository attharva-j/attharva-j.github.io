import React, { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// The hero's typographic moment: the headline arrives the way a model streams a
// completion, sub-word token by token, with a signal caret riding the last token.
// Tokens are presentation only. `space` marks a token that follows a word gap;
// the gap is rendered outside the token so a line wrap never strands the caret.
const SUBWORD_TOKENS = [
  { text: 'Build' },
  { text: 'ing' },
  { text: 'Production', space: true },
  { text: '-Grade' },
  { text: 'Gen', space: true },
  { text: 'AI' },
  { text: 'Systems', space: true }
]
// Uneven gaps (ms) read as real streaming rather than a metronome.
const GAPS = [120, 70, 140, 90, 150, 80, 130]

const joinTokens = (tokens) => tokens.map((t) => (t.space ? ` ${t.text}` : t.text)).join('')

// Caret phases: waiting (blinks while "thinking"), streaming (solid),
// done (two blinks), rest (solid).
export default function StreamedHeadline({ words, startDelay = 900, className = '' }) {
  const reduceMotion = useReducedMotion()
  const text = words.join(' ')
  // If the content ever changes, fall back to whole-word tokens.
  const tokens =
    joinTokens(SUBWORD_TOKENS) === text ? SUBWORD_TOKENS : words.map((word, i) => ({ text: word, space: i > 0 }))
  const [count, setCount] = useState(reduceMotion ? tokens.length : 0)
  const [phase, setPhase] = useState(reduceMotion ? 'rest' : 'waiting')

  useEffect(() => {
    if (reduceMotion) {
      setCount(tokens.length)
      setPhase('rest')
      return undefined
    }
    const timers = []
    let at = startDelay
    tokens.forEach((_, index) => {
      at += GAPS[index % GAPS.length]
      timers.push(
        setTimeout(() => {
          setCount(index + 1)
          setPhase(index + 1 === tokens.length ? 'done' : 'streaming')
        }, at)
      )
    })
    timers.push(setTimeout(() => setPhase('rest'), at + 1400))
    return () => timers.forEach(clearTimeout)
  }, [reduceMotion, startDelay, tokens.length])

  const caretAt = Math.max(count - 1, 0)
  const caretClass = { waiting: 'animate-caret-wait', streaming: '', done: 'animate-caret-blink', rest: '' }[phase]

  return (
    <p className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {tokens.map((token, index) => (
          <React.Fragment key={index}>
            {token.space && ' '}
            <span className="relative">
              <span className={`transition-opacity duration-fast ease-out ${index < count ? 'opacity-100' : 'opacity-0'}`}>
                {token.text}
              </span>
              {index === caretAt && (
                <span
                  className={`absolute bottom-[0.12em] h-[0.82em] w-[0.42em] bg-signal ${caretClass}`}
                  style={{ left: count === 0 ? 0 : 'calc(100% + 0.1em)' }}
                />
              )}
            </span>
          </React.Fragment>
        ))}
      </span>
    </p>
  )
}
