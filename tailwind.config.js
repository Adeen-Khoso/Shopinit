/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "/src/index.css",
    "./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    colors: {
      primary_bg: "#FBEAEB",
      secondary_bg: "#FFF5F5",
      primary: "#2F3C7E",
      hov_primary: "#36448a",
      jett_black: "#1B1B1B",
      white: "#FFFFFF",
      grey: "#F2F2F2",
    },
    extend: {
      fontFamily: {
        default: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

// module.exports = {
//   content: ["./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}"],
//   presets: [require("@relume_io/relume-tailwind")],
// };
