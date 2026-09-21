import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/GetLaporanBPHTB': {
        target: 'https://e-bphtb.batubarakab.go.id',
        changeOrigin: true,
        secure: false,
      },
      '/api/GetLaporan': {
        target: 'https://e-pbb.batubarakab.go.id',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
