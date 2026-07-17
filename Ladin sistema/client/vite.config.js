import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/novatech/',
  server: {
    host: true,
    proxy: {
      '/api': 'http://localhost:5050',
    },
  },
})
