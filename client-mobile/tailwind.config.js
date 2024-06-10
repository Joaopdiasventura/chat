/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "App.tsx"],
  theme: {
    extend: {
      height: {
        90: "90%",
        75: "7.5%",
      },
      width: {
        90: "90%",
        10: "10%",
      },
    },
  },
  plugins: [],
};
