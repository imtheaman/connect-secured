module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        top: ["0 -15px 13px rgb(0 0 0 / 0.03)", "0 -2px 5px rgb(0 0 0 / 0.08)"],
      },
      boxShadow: {
        all: [
          "6px 8px 10px -6px rgb(0 0 0 / 0.1)",
          "-6px -8px 10px -6px rgb(0 0 0 / 0.1)",
        ],
      },
      colors: {
        "light-black": "#202020",
        "black-transparent": "rgba(0,0,0,0.25)",
      },
      screens: {
        "mid-md": "450px",
        "mid-lg": "600px",
      },
    },
  },
  plugins: [],
};
