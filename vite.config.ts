import { defineConfig } from "vite";
import { resolve } from "path";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@core": resolve(__dirname, "./src/Core"),
      "@ui": resolve(__dirname, "./src/Components/UI"),
      "@components": resolve(__dirname, "./src/Components"),
    },
  },
});
