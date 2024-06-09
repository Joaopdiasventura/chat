/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width:{
        "60": "60%"
      },
      height:{
        "60": "60%"
      }
    },
  },
  plugins: [],
}