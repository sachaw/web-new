import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme.js";
import accent from "tailwindcss-accent";
import kobalte from "@kobalte/tailwindcss";

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Cascadia Code", ...fontFamily.mono],
        sans: ["Inter var", ...fontFamily.sans],
      },
      boxShadow: {
        highlight: "inset 0 1px 0 0 #ffffff0d, 0 2px 0 0 #ffffff0d",
        inset: "inset 0 2px 0 0 #ffffff0d, 0 1px 0 0 #ffffff0d",
      },
    },
  },
  plugins: [
    kobalte({}),
    accent({
      colors: ["violet", "blue", "green", "yellow", "orange", "red"],
      root: "blue",
      cssVarsPrefix: "tw-plugin", // result: --tw-plugin-accent-200
    }),
  ],
} satisfies Config;
