import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv'

config()

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
    'process.env': {},
    'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY),
  },
  base: '/weather-app/',
})
