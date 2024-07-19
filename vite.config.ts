import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { templateCompilerOptions } from "@tresjs/core";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ ...templateCompilerOptions })],
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ["vue"],
          three: ["three"],
          tresjs: ["@tresjs/core", "@tresjs/cientos"],
        },
      },
    },
  },
});
