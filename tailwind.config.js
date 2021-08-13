module.exports = {
  purge: {
    enable: true,
    content: [
      "./pages/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
      // "./redux/**/*.{js,ts,jsx,tsx}",
    ],
  },

  darkMode: false,
  variants: {
    color: ["responsive", "hover", "focus", "group-hover"],
    borderColor: ["responsive", "hover", "focus", "group-hover"],
  },
  theme: {},

  variants: {
    extend: {},
  },
  plugins: [],
};
