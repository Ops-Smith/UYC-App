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
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "capacitor": ["@capacitor/core", "@capacitor/android", "@capgo/capacitor-native-biometric", "@capgo/capacitor-passkey"],
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