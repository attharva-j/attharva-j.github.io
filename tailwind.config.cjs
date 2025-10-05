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
        poppins: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
        inter: ['Inter', 'system-ui', 'Arial']
      }
    }
  },
  plugins: []
}
