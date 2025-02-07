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
        c01_heavy_blue: '#2e3c4c',
        c02_heavy_blue: '#35495e',
        c03_blue: '#5fafe2',
        c04_blue: '#75b8e6',
        c05_blue: '#96c0ea',
        c06_gray: '#ebebeb',
        c07_orange: '#e94833',
      },
    },
  },
  plugins: [],
}