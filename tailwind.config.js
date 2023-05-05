/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  variants: {},
  plugins: [],
  theme: {
    extend: {
      height: {
        18: "4.5rem", // 1rem = 4단위, 따라서 4.5rem = 18단위
      },
    },
  },
};
