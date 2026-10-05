/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          deep: '#081926',
          indigo: '#0f2b3e',
          foam: '#a7f3d0',
          cyan: '#7dd3fc',
          coral: '#fda4af',
          sky: '#bae6fd',
          mist: '#e0f2fe',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
