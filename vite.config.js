/* eslint-disable no-undef */
import { defineConfig } from "vite";
import { createVuePlugin as vue } from "vite-plugin-vue2";
import { visualizer } from "rollup-plugin-visualizer";
// import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  root: "src",
  base: "/codebuddy/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    hmr: {
      port: 8301
    }
  },
  plugins: [
    vue(),
    visualizer({
      // emitFile: true,
      // file: "stats.html",
      filename: "stats.html",
      open: true,
      gzipSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@scss": path.resolve(__dirname, "./src", "scss"),
      stream: "stream-browserify",
    },
  },
});
