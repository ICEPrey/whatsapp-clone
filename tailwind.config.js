module.exports = {
  purge: {
    enable: true,
    content: [
      "./pages/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
      "./redux/**/*.{js,ts,jsx,tsx}",
    ],
  },

  darkMode: false,
  variants: {
    color: ["responsive", "hover", "focus", "group-hover"],
    borderColor: ["responsive", "hover", "focus", "group-hover"],
  },
  theme: {
    extend: {
      colors: {
        background: "#1a1c20",
        notactive: "#8d8f94",
      },
      width: {
        player: "1024px",
      },
      border: ["hover"],
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
