/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // 👈 Esto es lo que necesita el ThemeProvider para funcionar bien
    content: [
      "./app/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  