module.exports = {
  content: ["./*.{html,js}", "./node_modules/flowbite/**/*.js"],
  safelist: ["w-64", "w-1/2", "rounded-l-lg", "rounded-r-lg", "bg-gray-200", "grid-cols-4", "grid-cols-7", "h-6", "leading-6", "h-9", "leading-9", "shadow-lg"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "105rem",
        "10xl": "120rem",
      },
      zIndex: {
        1: 1,
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        100: 100,
      },
    },
  },
  variants: {
    fill: [],
    extend: {
      borderColor: ["focus-visible"],
      opacity: ["disabled"],
    },
  },
  plugins: [require("flowbite/plugin"), require("@tailwindcss/aspect-ratio"), require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
