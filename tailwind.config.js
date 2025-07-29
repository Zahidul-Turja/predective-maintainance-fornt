/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8',     // Tech Blue
        secondary: '#64748B',   // Slate Gray
        accent: '#10B981',      // Emerald
      }
    },
  },
  plugins: [],
}

