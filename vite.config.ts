import { execSync } from "child_process";
import { defineConfig } from "vite";
import { resolve } from "path";
import solidPlugin from "vite-plugin-solid";
import EnvironmentPlugin from "vite-plugin-environment";

const hash = execSync("git rev-parse --short HEAD").toString().trim();

export default defineConfig({
  plugins: [
    solidPlugin(),
    EnvironmentPlugin({
      COMMIT_HASH: hash,
    }),
  ],
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
