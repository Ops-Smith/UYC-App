import { CapacitorConfig } from '@capacitor/cli';

const LIVE_URL =
  process.env.ADMIN_APP_URL ||
  "https://uyc-app-admin.onrender.com/";

const config: CapacitorConfig = {
  appId: "com.uniqueyouths.admin",
  appName: "Unique Youth Admin",
  webDir: "dist",
  server: {
    url: LIVE_URL,
    cleartext: false,
  },
};

export default config;