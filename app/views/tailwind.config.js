/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flex: {},
      fontSize: {
        '2xs': '.6rem',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-x': 'bounceX .7s infinite'
      },
      flexBasis: {
        '1/7': `${1/7*100}%`,
        '1/8': `${1/8*100}%`,
        '1/9': `${1/9*100}%`,
        '1/10': `${1/10*100}%`,
      }
    },
  },
  plugins: [],
  important: "#app"
}
