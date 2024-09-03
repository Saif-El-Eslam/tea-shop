import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
