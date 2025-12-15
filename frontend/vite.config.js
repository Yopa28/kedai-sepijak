import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],

  // 🟢 PERBAIKAN PENTING DI SINI: Ubah ke root (/)
  base: "/",

  server: {
    proxy: {
      // Proxy ini hanya berjalan saat development lokal, jadi aman.
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});