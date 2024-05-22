/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#00510b',
        'light-green': '#D4DA00',
        'light-white': 'rgba(255,255,255,0.17)'
      }
    }
  },
  plugins: []
}
