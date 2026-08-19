import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-redirects",
      closeBundle() {
        // Ensure dist directory exists
        const distDir = resolve(__dirname, "dist");
        if (!existsSync(distDir)) {
          mkdirSync(distDir, { recursive: true });
        }
        
        // Copy _redirects from public to dist
        const src = resolve(__dirname, "public/_redirects");
        const dest = resolve(__dirname, "dist/_redirects");
        
        if (existsSync(src)) {
          copyFileSync(src, dest);
          console.log("✅ Copied _redirects to dist");
        } else {
          console.warn("⚠️ _redirects not found in public folder");
        }
      },
    },
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "lucide": ["lucide-react"],
          "page-profit": ["./src/pages/ProfitMatrix.tsx"],
          "page-members": ["./src/pages/Members.tsx"],
          "page-contributions": ["./src/pages/ContributionsTracker.tsx"],
          "page-draw": ["./src/pages/AjoRecipientDraw.tsx"],
          "page-slots": ["./src/pages/MemberSlotGrid.tsx"],
          "page-disbursals": ["./src/pages/MonthlyDisbursals.tsx"],
          "page-guarantors": ["./src/pages/GuarantorPortal.tsx"],
          "page-broadcast": ["./src/pages/BroadcastEngine.tsx"],
          "page-activity": ["./src/pages/ActivityLog.tsx"],
          "page-settings": ["./src/pages/Settings.tsx"],
          "page-claims": ["./src/pages/PaymentClaims.tsx"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    cssMinify: true,
    copyPublicDir: true, // This ensures public files are copied
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
});