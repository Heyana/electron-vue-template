import { join } from "path";
import { defineConfig } from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import userConfig from "./config";

const IsWeb = process.env.BUILD_TARGET === "web";
const staticPath = (global.__static = resolve("static"));
function resolve(dir: string) {
  return join(__dirname, "..", dir);
}
userConfig.build.env.is_web = IsWeb;
userConfig.dev.env.is_web = IsWeb;
const root = join(__dirname, "web");
export default defineConfig({
  mode: process.env.NODE_ENV,
  root,
  define: {
    "process.env":
      process.env.NODE_ENV === "production"
        ? userConfig.build.env
        : userConfig.dev.env,
  },
  resolve: {
    alias: {
      "@web": root,
      "@desktop": join(__dirname, "desktop"),
      "@utils": join(__dirname, "..", "utils"),
    },
  },
  base: "./",
  build: {
    outDir: join(__dirname, "dist", "web"),
    emptyOutDir: true,
    target: "esnext",
    minify: "esbuild",
  },
  server: {},
  plugins: [
    vueJsx(),
    vuePlugin({
      script: {
        refSugar: true,
      },
    }),
  ],
  optimizeDeps: {},
  publicDir: staticPath,
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${join(
            __dirname,
            "web/assets/styles/global/global.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
});
