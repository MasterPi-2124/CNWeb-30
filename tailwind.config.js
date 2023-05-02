/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
          red: '#AA261B',
          orange: '#C94800',
          white: '#FFFFFF',
          black: '#000000',
          'light-grey': '#D9D9D9',
          blue: '#1366E2',
          green: '#2CFF8',
          yellow: '#FCD1',
          'dark-blue': '#000616',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'background-1' : "url('../assets/imgs/background.jpg')",
      },
      fontFamily: {
        segoe: ['var(--font-segoe)']
      }
    },
  },
  plugins: [],
}
