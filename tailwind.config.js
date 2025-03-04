/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#1a202c", // Dark mode background
        darkText: "#e2e8f0", // Light text for dark mode
      },
    },
  },
  plugins: [],
};
