//tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        padlockBounce: {
          '0%, 100%': { marginBottom: '-65px' },
          '50%': { marginBottom: '-60px' },
        },
        typing: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
        glow: {
          "0%, 100%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(3)" },
        },
      },
      animation: {
        padlockBounce: 'padlockBounce 3s ease-in-out infinite',
        typing: "typing 0.8s steps(22, end) forwards",
        glow: "glow 1s ease-in-out infinite",
      },
      colors: {
        c01_heavy_blue: "#2e3c4c",
        c02_heavy_blue: "#35495e",
        c03_blue: "#5fafe2",
        c04_blue: "#75b8e6",
        c05_blue: "#96c0ea",
        c06_gray: "#ebebeb",
        c07_orange: "#e94833",
        c_deep_black: "#1d1d1b",
        c_deep_middle_black: "#1a1b1f",
        c_deep_gray_black: "#2b2e33",
        c_components_gray: "#424242",
        c_button_red: "#e9454b",
        c_common_red: "#e33e44",
        c_logo_red: "#db1f27",
        c_older_yellow: "#b28e45",
        c_text_blue: "#62a1d8",
      },
    },
  },
  plugins: [],
};
