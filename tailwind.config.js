//tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        customBlack: '#171717',
        customBlack_semi01: '#1f1f1f',
        customBlack_semi02: '#262626',
        customGray: '#9fb3c0',
        customBlueGray: '#636d80',
        customRose: '#c16d6c',
        customWine: '#4c151e',
      },
    },
  },
  plugins: [],
}