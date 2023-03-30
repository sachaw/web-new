import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import accent from "tailwindcss-accent";

export default {
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
      boxShadow: {
        highlight: "inset 0 1px 0 0 #ffffff0d, 0 -1px 0 0 #0000000d",
      },
    },
  },
  plugins: [
    accent({
      colors: ["violet", "blue"],
      root: "blue",
      cssVarsPrefix: "tw-plugin", // result: --tw-plugin-accent-200
    }),
  ],
} satisfies Config;
