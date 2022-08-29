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
        '2xs': '.6rem'
      }
    },
  },
  plugins: [],
  important: "#app"
}
