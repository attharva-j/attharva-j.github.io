// One-time generator: snapshots every human-readable string from the pre-redesign
// commit so verify-content.mjs can prove nothing personal was dropped.
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { transformSync } from 'esbuild'

const BASE_COMMIT = '9f4f8be'
const FILES = [
  'index.html',
  'src/pages/Home.jsx',
  'src/pages/About.jsx',
  'src/pages/Projects.jsx',
  'src/pages/Experience.jsx',
  'src/pages/Skills.jsx',
  'src/pages/Contact.jsx',
  'src/components/Navbar.jsx',
  'src/components/Footer.jsx',
  'src/components/ResumePreview.jsx'
]

// Bare CSS keywords that appear in className strings without hyphens.
const CSS_WORDS = new Set([
  'flex', 'grid', 'block', 'inline', 'hidden', 'relative', 'absolute', 'fixed', 'sticky', 'group',
  'container', 'transition', 'rounded', 'border', 'italic', 'underline', 'uppercase', 'truncate',
  'shadow', 'grow', 'shrink', 'visible', 'invisible', 'peer', 'none', 'auto', 'transform', 'blur',
  'ease', 'linear', 'round', 'butt', 'middle', 'start', 'end', 'center', 'bold', 'normal', 'pointer',
  'prose', 'capitalize', 'noopener', 'noreferrer'
])
const isProseToken = (t) => /^[a-z]{2,}[.,!?]?$/.test(t) && !CSS_WORDS.has(t.replace(/[.,!?]$/, ''))
const looksLikeCode = (s) => {
  if (/^(https?:|mailto:)/.test(s)) return false
  if (/^[$\d][\d.,%+KkMm\- →]*$/.test(s)) return false
  if (/^\/in\//.test(s)) return false
  if (/^(\.\.?\/|easeInOut$)/.test(s)) return true
  // Single lowercase words are element names, variants and ids, not copy.
  if (/^[a-z][a-z0-9-]*$/.test(s)) return true
  if (/^[Mm][\d .,-]+/.test(s) || /rgba?\(|calc\(|url\(#|^#[0-9a-f]{3,8}$/i.test(s)) return true
  const tokens = s.split(' ')
  return tokens.every((t) => /^[a-z0-9:\-/[\].#%()_,!=>]*$/.test(t)) && !tokens.some(isProseToken)
}

const STRING_LITERAL = /"((?:[^"\\\n]|\\.)*)"/g

const strings = {}
for (const file of FILES) {
  const raw = execSync(`git show ${BASE_COMMIT}:${file}`, { encoding: 'utf8', maxBuffer: 1e7 })
  let found = []
  if (file.endsWith('.html')) {
    found = [...raw.matchAll(/<title>([^<]+)<\/title>|content="([^"]+)"/g)].map((m) => m[1] || m[2])
  } else {
    const { code } = transformSync(raw, { loader: 'jsx', jsx: 'transform', charset: 'utf8' })
    found = [...code.matchAll(STRING_LITERAL)].map((m) => JSON.parse(`"${m[1]}"`))
  }
  strings[file] = [...new Set(found.map((s) => s.replace(/\s+/g, ' ').trim()))]
    .filter((s) => /[A-Za-z0-9$]/.test(s) && s.length > 1 && !looksLikeCode(s))
}

writeFileSync(
  new URL('./content-baseline.json', import.meta.url),
  JSON.stringify({ commit: BASE_COMMIT, strings }, null, 2) + '\n'
)
console.log(Object.entries(strings).map(([f, s]) => `${f}: ${s.length}`).join('\n'))
