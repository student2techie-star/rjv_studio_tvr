// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F7FCFF",
          100: "#EEF9FE",
          200: "#DDF2FC",
          300: "#AFDBF5",
          400: "#8FC9EA",
          500: "#6FAED0",
          600: "#4F91B6",
          700: "#367593",
          800: "#245A73",
          900: "#173B52"
        }
      },
      fontFamily: {
        sans: ["'Josefin Sans'", "sans-serif"]
      }
    }
  },
  plugins: []
};
