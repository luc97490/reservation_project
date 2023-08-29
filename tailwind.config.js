/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    "./node_modules/flowbite-react/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        1246: "1246px",
        273: "273px",
        288: "288px",
      },
      colors: {
        primary: {
          light: "#FFFFFF",
          dark: "#161A23",
        },
        secondary: {
          light: "#FAFAFA",
          dark: "#2D2F39",
        },
        border: {
          light: "#D9D9D9",
          dark: "#5C5E64",
        },
        text: {
          light: "#667085",
          dark: "#FAFAFA",
        },
        icon: {
          light: "#5C5E64",
          dark: "#757575",
        },
        check: {
          light: "#0070FF",
          dark: "#757575",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
