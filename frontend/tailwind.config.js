// frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",       // Navy blue
        secondary: "#1E293B",     // Darker blue
        accent: "#22C55E",        // Lime green for charts/highlights
        warning: "#F59E0B",       // Amber for trends/warnings
        danger: "#EF4444",        // Red for negative stats
        light: "#F8FAFC",         // Light background
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Poppins", "sans-serif"]
      },
      spacing: {
        "128": "32rem",
        "144": "36rem"
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.5rem"
      }
    }
  },
  darkMode: "class", // You can toggle dark mode with a 'dark' class
  plugins: []
};
