import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // expose on all interfaces (0.0.0.0) → accessible from mobile on same Wi-Fi
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
})
