/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      color: {
        '100': '#4285F4'
      }
    },
  },
  plugins: [require("daisyui")],
}
