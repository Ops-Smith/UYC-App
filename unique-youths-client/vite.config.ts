import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor libraries
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "react-vendor";
            }
            if (id.includes("@capacitor")) {
              return "capacitor";
            }
          }
          // Split specific pages/components safely using path matching
          if (id.includes("src/pages/Dashboard")) {
            return "page-dashboard";
          }
          if (id.includes("src/components/LandingPage")) {
            return "page-landing";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    cssMinify: true,
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
});