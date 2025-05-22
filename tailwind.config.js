/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-primary': '#1A69FA',
        'background-highlight': '#DEEEFF',
        'color-accent': '#0F47B3',
        'color-secondary': '#1C1C28',
        'text-primary': '#2F2F3A',
        'text-secondary': '#6C6C84',
        'border-subtle': '#D8E4F9',
        'component-background': '#FFFFFF',
        'background-alt': '#F5F9FF',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
