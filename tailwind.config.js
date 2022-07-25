module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      color: {
        slate: "#F2F2F2",
        cyan: "#009EE0",
        gray: "#C0C0C0",
        black: "#333333",
        orange: "#FFA500",
        lime: "#83D644",
        green: "#43B02A",
        red: "#CC0033",
      },
      fontFamily: {
        RobotoSlab: ["Roboto Slab", "serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
