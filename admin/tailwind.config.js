/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gondola: {
          50: "#fbf5f8",
          100: "#f7e9f1",
          200: "#f0d8e5",
          300: "#e5bcd3",
          400: "#d495b8",
          500: "#c1729e",
          600: "#ab5786",
          700: "#8f466f",
          800: "#773d5e",
          900: "#653751",
          950: "#1f0f18",
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
