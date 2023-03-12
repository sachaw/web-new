const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Cascadia Code", ...fontFamily.mono],
        sans: ["Inter var", ...fontFamily.sans],
      },
      colors: {
        backgroundPrimary: "var(--backgroundPrimary)",
        backgroundSecondary: "var(--backgroundSecondary)",
        accent: "var(--accent)",
        accentMuted: "var(--accentMuted)",
        textPrimary: "var(--textPrimary)",
        textSecondary: "var(--textSecondary)",
        link: "var(--link)",
      },
      brightness: {
        hover: "var(--brighnessHover)",
        press: "var(--brightnessPress)",
        disabled: "var(--brightnessDisabled)",
      },
    },
  },
  plugins: [
    require("tailwindcss-accent")({
      colors: ["violet", "blue"],
      root: "blue",
      cssVarsPrefix: "tw-plugin", // result: --tw-plugin-accent-200
    }),
  ],
};
