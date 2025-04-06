import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "editor-vendor": ["@monaco-editor/react"],
          "prettier-vendor": [
            "prettier/standalone",
            "prettier/plugins/babel",
            "prettier/plugins/html",
            "prettier/plugins/postcss",
            "prettier/plugins/estree",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
  },
  server: {
    port: 5173,
    open: true,
  },
});
