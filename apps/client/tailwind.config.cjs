const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.blue[500],
        secondary: colors.blue[400],
        tertiary: colors.blue[300],
        "primary-text": colors.blue[700],
      },
    },
  },
  plugins: [],
};
