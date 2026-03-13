import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Only set base for production builds (GitHub Pages), not local dev
  base: command === 'build' ? '/paradise-nursery/' : '/',
}))

