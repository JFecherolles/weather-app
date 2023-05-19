import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  plugins: [react()],
  root: './',
  publicDir: 'public',
  envDir: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  define: {
    'process.env.VITE_API_KEY': JSON.stringify(import.meta.env.VITE_API_KEY || ''),
  },
  base: '/weather-app/',
})
