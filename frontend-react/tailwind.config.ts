/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBeige: {
          DEFAULT: "#F7F4E3",
        },
        darkGreen: {
          light: "#556B2F",
          DEFAULT: "#556B2F",
          dark: "#556B2F",
        },
        lightGreen: {
          DEFAULT: "#D0E6A5",
        },
        yellow: {
          DEFAULT: "#FFBF00",
        },
        brown: {
          DEFAULT: "#8B4513",
        },
        alert: {
          DEFAULT: "#FF6F61",
        },
        messages: {
          DEFAULT: "#98FF98",
        },
        darkGray: {
          DEFAULT: "#333333",
        },
      },
    },
  },
  plugins: [],
};
