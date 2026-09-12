import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/rjv_studio_tvr/',
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5174,
    // strictPort: true, // disabled to allow any available port
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
