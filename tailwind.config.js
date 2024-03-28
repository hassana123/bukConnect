/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom1: ["poppins", "sans-serif"],
        custom2: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
