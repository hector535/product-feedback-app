/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "375px",
      },
      fontFamily: {
        jost: ["Jost", "sans-serif"],
      },
      spacing: {
        7.5: "1.875rem",
      },
      height: {
        7.5: "1.875rem",
      },
      fontSize: {
        //13px size 19px line-height
        "xs-2": ["0.8125rem", { lineHeight: "1.1875rem" }],
      },
      borderRadius: {
        //10px
        "lg-2": "0.625rem",
      },
      colors: {
        primary: "#AD1FEA",
        secondary: {
          200: "#F7F8FD",
          300: "#F2F4FF",
          325: "#F2F4FE",
          350: "#CFD7FF",
          400: "#4661E6",
          500: "#3A4374",
          600: "#373F68",
        },
        neutral: {
          50: "#fff",
          900: "#647196",
        },
        "accent-orange": "#F49F85",
        "accent-sky": "#62BCFA",
        "accent-red": "#D73737",
      },
    },
  },
  plugins: [],
};
