/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jost: ["Jost", "sans-serif"],
      },
      colors: {
        primary: "#AD1FEA",
        secondary: {
          200: "#F7F8FD",
          300: "#F2F4FF",
          400: "#4661E6",
          500: "#3A4374",
          600: "#4661E6",
        },
        neutral: {
          50: "#fff",
          900: "#647196",
        },
        "accent-orange": "#F49F85",
        "accent-sky": "#62BCFA",
      },
    },
  },
  plugins: [],
};
