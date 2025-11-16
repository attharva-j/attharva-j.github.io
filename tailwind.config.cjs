module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f1724',
        accent: '#22c1c3',
        accent2: '#60a5fa',
        muted: '#94a3b8'
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'Arial']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  },
  plugins: []
}