/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: '#161619',
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FCF1EB",
          // 200: "",
        },
      }
    },
  },
  plugins: [],
}

