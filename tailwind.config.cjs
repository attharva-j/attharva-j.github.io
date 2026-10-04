// Inference design tokens. Values live as CSS variables in src/index.css so
// CSS, Tailwind utilities and Framer Motion all read the same source.
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ground: 'var(--ground)',
        raised: 'var(--raised)',
        rule: 'var(--rule)',
        'rule-strong': 'var(--rule-strong)',
        fg: 'var(--fg)',
        dim: 'var(--dim)',
        signal: 'var(--signal)',
        // Legacy keys, used only by pre-redesign sections still awaiting their stage.
        primary: '#0f1724',
        accent: '#22c1c3',
        accent2: '#60a5fa',
        muted: '#94a3b8'
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        inter: ['"Geist Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      fontSize: {
        micro: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        body: ['1.0625rem', { lineHeight: '1.65' }],
        lead: ['clamp(1.125rem, 0.4vw + 1.02rem, 1.3125rem)', { lineHeight: '1.55', letterSpacing: '-0.005em' }],
        h3: ['clamp(1.375rem, 1vw + 1.1rem, 1.875rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        h2: ['clamp(2.25rem, 3.6vw + 1rem, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.04em' }],
        display: ['clamp(2.5rem, 5vw + 1rem, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.045em' }],
        mega: ['clamp(4rem, 15vw, 15.5rem)', { lineHeight: '0.84', letterSpacing: '-0.06em' }]
      },
      maxWidth: {
        shell: '90rem',
        prose: '62ch'
      },
      spacing: {
        gutter: 'var(--gutter)',
        nav: 'var(--nav-h)'
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        'in-out': 'var(--ease-in-out)'
      },
      transitionDuration: {
        fast: 'var(--dur-fast)',
        base: 'var(--dur-base)',
        slow: 'var(--dur-slow)'
      },
      zIndex: {
        rail: 'var(--z-rail)',
        nav: 'var(--z-nav)',
        overlay: 'var(--z-overlay)',
        skip: 'var(--z-skip)'
      },
      borderRadius: {
        none: '0'
      }
    }
  },
  plugins: []
}
