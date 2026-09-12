import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/rjv_studio_tvr/',
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
