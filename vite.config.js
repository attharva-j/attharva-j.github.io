import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
  base: '/'
})
