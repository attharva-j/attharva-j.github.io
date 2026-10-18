import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Resume plug-in: the Resume buttons open the PDF only when public/resume.pdf
// exists at build time. No file, no link: the buttons show the "reach out"
// note instead. Dropping a new resume.pdf into public/ and rebuilding (or
// restarting the dev server) switches it on, with no code change.
const RESUME_PRESENT = existsSync(fileURLToPath(new URL('./public/resume.pdf', import.meta.url)))

// The hero's critical assets are only discovered after the app renders. This
// injects preload hints into the built HTML so they start on the first round
// trip. Build only; hashed names come from the bundle. Only what the first
// screen needs: the sans face, and the portrait where it sits above the fold
// (tablet and up; on phones it follows the actions).
const CRITICAL_ASSETS = [
  { match: /geist-latin-wght-normal-.*\.woff2$/, as: 'font', type: 'font/woff2' },
  { match: /portfolioimage-.*\.jpg$/, as: 'image', priority: true, media: '(min-width: 768px)' }
]

function preloadCriticalAssets() {
  return {
    name: 'preload-critical-assets',
    apply: 'build',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html
      const files = Object.keys(ctx.bundle)
      return CRITICAL_ASSETS.flatMap(({ match, as, type, priority, media }) => {
        const file = files.find((name) => match.test(name))
        if (!file) return []
        const attrs = { rel: 'preload', href: `/${file}`, as }
        if (type) attrs.type = type
        if (as === 'font') attrs.crossorigin = ''
        if (priority) attrs.fetchpriority = 'high'
        if (media) attrs.media = media
        return [{ tag: 'link', attrs, injectTo: 'head-prepend' }]
      })
    }
  }
}

export default defineConfig({
  plugins: [react(), preloadCriticalAssets()],
  base: '/',
  define: {
    __RESUME_AVAILABLE__: JSON.stringify(RESUME_PRESENT)
  }
})
