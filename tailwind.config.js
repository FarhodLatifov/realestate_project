/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#171715',
        'brand-light': '#f5f3ee',
        'brand-text-dark': '#1b1b19',
        'brand-text-light': '#f7f5ef',
        'brand-accent': '#b9975b',
        'brand-muted': '#77746d',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
