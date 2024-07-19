import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { templateCompilerOptions } from "@tresjs/core";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ ...templateCompilerOptions })],
  build: {
    chunkSizeWarningLimit: 1100, // slightly larger than vendors bundle
    rollupOptions: {
      output: {
        manualChunks: {
          vendors: ["vue", "three", "@tresjs/core", "@tresjs/cientos"],
        },
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
      },
    },
  },
});
