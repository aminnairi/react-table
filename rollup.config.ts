import { defineConfig } from "rollup";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input: "src/hooks/index.ts",
  output: {
    format: "esm",
    file: "dist/index.js"
  },
  external: [
    "react"
  ],
  plugins: [
    typescript(),
    terser()
  ]
});