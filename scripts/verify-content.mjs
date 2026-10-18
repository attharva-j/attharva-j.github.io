// Content guard. Every human-readable string from the pre-redesign commit
// (scripts/content-baseline.json) must be accounted for in exactly one way:
//   1. present verbatim in src/content/index.js
//   2. changed by an owner-approved edit (EDITS), whose replacement must be present
//   3. removed with owner approval (REMOVED)
//   4. UI chrome the redesign may rename or drop (CHROME)
// Anything else fails the build.
//
// Owner-approved edit not visible to the string check: ALO is the current
// role in the About intro and journey. "Altimetrik" still appears elsewhere,
// so the ALO mention is asserted directly below.
import { readFileSync } from 'node:fs'
import * as content from '../src/content/index.js'

const baseline = JSON.parse(readFileSync(new URL('./content-baseline.json', import.meta.url), 'utf8'))

// Owner-approved edits: original -> replacement.
const EDITS = {
  // Em-dash removal (approved: "remove em-dashes")
  // Em-dash removal, then the Oct 2026 title change to "AI Engineer"
  'Atharva Joshi — GenAI Engineer': 'Atharva Joshi - AI Engineer',
  'Atharva Joshi — GenAI engineer building RAG systems, AI agents, MCPs, and enterprise-grade AI pipelines.':
    'Atharva Joshi, AI engineer building RAG systems, AI agents, MCPs, and enterprise-grade AI pipelines.',
  'Every AI system I build is designed for production from day one — auditable, observable, and maintainable.':
    'Every AI system I build is designed for production from day one: auditable, observable, and maintainable.',
  'Focused on driving tangible business outcomes — from cost savings to revenue growth and operational efficiency.':
    'Focused on driving tangible business outcomes, from cost savings to revenue growth and operational efficiency.',
  '. My work spans the full lifecycle — from architecture and development to deployment and observability.':
    '. My work spans the full lifecycle, from architecture and development to deployment and observability.',
  '— sharing enterprise AI implementation strategies and real-world case studies.':
    ', sharing enterprise AI implementation strategies and real-world case studies.',
  "When I'm not building AI systems, I'm exploring the latest research in LLMs and agentic systems, contributing to open-source ML projects, and mentoring junior engineers. I'm passionate about making AI accessible and practical — demystifying complex concepts and showing how they translate to real business value.":
    "When I'm not building AI systems, I'm exploring the latest research in LLMs and agentic systems, contributing to open-source ML projects, and mentoring junior engineers. I'm passionate about making AI accessible and practical, demystifying complex concepts and showing how they translate to real business value.",
  'AI-Powered Workflow Automation — Leading Athleisure Brand': 'AI-Powered Workflow Automation - Leading Athleisure Brand',
  // Years of experience corrected (approved: "5+ is the correct number")
  '4+ years building enterprise-grade AI/ML systems with proven scalability and measurable business impact.':
    '5+ years building enterprise-grade AI/ML systems with proven scalability and measurable business impact.',
  // Snowflake talk is done (approved: mark as completed)
  'Upcoming Conference Presentation': 'Completed Conference Presentation',
  // Altimetrik is now a past role, ALO is current (owner request, Oct 2026)
  'Nov 2024 - Present': 'Nov 2024 - Aug 2026',
  // Title is "AI Engineer" and location is Los Angeles (owner request, Oct 2026)
  'GenAI Engineer & Data Scientist': 'AI Engineer',
  'GenAI Engineer & ML Architect': 'AI Engineer',
  'Atharva Joshi - GenAI Engineer': 'Atharva Joshi - AI Engineer',
  'Salt Lake City, UT': 'Los Angeles, CA',
  'Salt Lake City, Utah': 'Los Angeles, California',
  'Currently at': "Currently, I'm a Senior AI Engineer - Product & MarTech at ",
  ", I'm leading GenAI initiatives for Fortune 500 clients, architecting systems that have delivered":
    ', I led GenAI initiatives for Fortune 500 clients, architecting systems that delivered',
  "Today, I'm pushing the boundaries of GenAI at": ', I pushed the boundaries of GenAI,',
  ', architecting enterprise RAG systems and agentic workflows for clients like Lululemon. My focus is on making AI practical, reliable, and transformative for business operations.':
    [
      'architecting enterprise RAG systems and agentic workflows for clients like Lululemon.',
      'My focus is on making AI practical, reliable, and transformative for business operations.'
    ],
  // Medium handle (approved: "change to @athex25")
  '@atharvajoshi': '@athex25',
  // Same destinations, one canonical URL each
  'https://www.medium.com/@athex25': 'https://medium.com/@athex25',
  'https://www.linkedin.com/in/attharvaj3147': 'https://linkedin.com/in/attharvaj3147'
}

// Owner-approved removals.
const REMOVED = {
  'UI Component Credits:': 'credit removed (approved)',
  'https://21st.dev': 'credit removed (approved)',
  'Altimetrik Corp. — Recognition for exceptional performance and innovation in GenAI engineering':
    'duplicate of the About recognition entry (approved: show one)',
  '"Gaining Customer Insights and Loyalty with Generative AI" — Presenting enterprise AI implementation strategies':
    'duplicate of the About recognition entry (approved: show one)',
  // Home-page summaries that restated other entries in different words.
  '60-70% reduction in schema change cycle time': 'restates the workflow-automation project impact (approved: show one)',
  '$900K+ in cumulative cost savings across projects': 'restates the $900K+ cost savings stat (approved: show one)',
  'Speaker at Snowflake Summit 2025': 'restates the Snowflake Summit recognition entry (approved: show one)',
  "Faster change implementation for Lululemon's data workflows": 'restates the workflow-automation project impact (approved: show one)',
  'Saved per meeting with AI-powered prep assistant': 'restates the meeting-prep project impact (approved: show one)',
  'Reduction in support search time via RAG system': 'restates the support-assistant project impact (approved: show one)',
  'I typically respond to inquiries within 24-48 hours. For urgent matters, please mention it in your message or reach out via LinkedIn for faster response.':
    'second response-time paragraph (owner: keep one)'
}

// UI chrome: section headings that only name a section, button labels, and
// visualization controls. Approved as redesignable (answer 8).
const CHROME = new Set([
  'View Projects', 'Get in Touch', 'View All Projects →', 'Send Email', 'Connect on LinkedIn', 'Quick Actions',
  'Expertise', 'Key Achievements', 'Recent Impact', 'About Me', 'Core Principles', 'Education', 'Recognition',
  'Professional Journey', 'Beyond Work', 'Featured Projects', 'Business Impact', 'Key Highlights',
  'Technology Stack', 'Professional Experience', 'Key Impact', 'Key Contributions', 'Awards & Recognition',
  'Skills & Expertise', 'Skills × Projects Network', 'Explore Network', 'Hover to explore connections',
  'Hover to explore • Drag nodes • Scroll to zoom • Click projects for details', 'Minimize', 'Maximize',
  'Maximize for better readability', 'Skills (', 'Projects (6)', 'Total connections:', 'Location',
  'Typical Response Time', 'Open to Collaboration', 'Home', 'About', 'Projects', 'Experience', 'Skills', 'Contact',
  'Close menu', 'Open menu', 'Resume Preview', 'Open in new tab', 'Open', 'Download', 'Close',
  "If the preview doesn't load, you can:", 'Download PDF', 'Open in New Tab',
  // Rendering artifacts from the old D3 graph and regex labels, not copy.
  '$1', '100%', '200%', '600', '700', '500', '24', '14', '0 0 24 24', 'viewBox', 'refX', 'refY', 'markerWidth',
  'markerHeight', 'feGaussianBlur', 'stdDeviation', 'coloredBlur', 'feMerge', 'feMergeNode', 'SourceGraphic',
  'currentColor'
])

const corpus = []
const collect = (value) => {
  if (typeof value === 'string') corpus.push(value)
  else if (Array.isArray(value)) {
    value.forEach(collect)
    const flat = value.map((v) => (typeof v === 'string' ? v : v && (v.strong || v.em))).filter(Boolean)
    if (flat.length === value.length) corpus.push(flat.join(''), flat.join(' '))
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, v]) => {
      corpus.push(key)
      collect(v)
    })
  }
}
collect(content)

const present = (s) => corpus.some((c) => c.includes(s))
const problems = []

const mentionsAlo = (paragraph) => paragraph.some((segment) => segment?.strong === 'ALO')
if (!mentionsAlo(content.about.intro[2]) || !mentionsAlo(content.about.journey[2])) {
  problems.push('About intro and journey must name ALO as the current role (owner-approved edit)')
}
let checked = 0

for (const [file, strings] of Object.entries(baseline.strings)) {
  for (const s of strings) {
    checked++
    if (CHROME.has(s) || REMOVED[s]) continue
    if (EDITS[s]) {
      for (const replacement of [].concat(EDITS[s])) {
        if (!present(replacement)) problems.push(`${file}: approved edit missing -> "${replacement}"`)
      }
      continue
    }
    if (!present(s)) problems.push(`${file}: missing -> "${s}"`)
  }
}

corpus.filter((c) => /[—–]/.test(c)).forEach((c) => problems.push(`em/en-dash in content -> "${c}"`))

if (problems.length) {
  console.error(`Content check failed (${problems.length}):\n` + problems.map((p) => `  - ${p}`).join('\n'))
  process.exit(1)
}
console.log(`Content check passed: ${checked} baseline strings accounted for (commit ${baseline.commit}).`)
