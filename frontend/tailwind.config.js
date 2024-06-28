/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5ab9ea",
        secondary: "#84ceeb",
        "accent-1": "#A0DEFF",
        "accent-2": "#CAF4FF",
      },
    },
  },
  plugins: [],
};
