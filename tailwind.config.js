/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        audax: {
          gold: '#C5A880',
          'gold-light': '#DFC49F',
          'gold-dark': '#9E7E55',
          'gold-bright': '#D4AF37',
          black: '#08080A',
          dark: '#0F1014',
          card: '#16171D',
          border: '#262833',
          muted: '#8E92A4',
          light: '#F5F5F7'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Cabinet Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        serif: ['Cinzel', 'serif']
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.3em'
      }
    },
  },
  plugins: [],
}
