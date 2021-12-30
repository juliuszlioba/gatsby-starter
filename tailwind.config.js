const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      yellow: colors.amber,
      site_primary: "var(--color-site-primary)",
      site_secondary: "var(-color-site-secondary)",
    },
    extend: {
      boxShadow: {
        "lg-flat":
          "0 0 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        "xl-flat":
          "0 0 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
}
