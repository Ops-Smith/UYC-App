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
        manualChunks: {
          // Split vendor libraries into separate chunks
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "capacitor": ["@capacitor/core", "@capacitor/status-bar", "@capgo/capacitor-native-biometric"],
          // Split pages/components
          "page-dashboard": ["./src/pages/Dashboard.tsx"],
          "page-landing": ["./src/components/LandingPage.tsx"],
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