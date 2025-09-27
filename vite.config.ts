import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // For GitHub Pages, use the repository name as base
  // For StackBlitz and local dev, use relative path
  const base = command === 'build' && mode === 'production' 
    ? '/boltnew/' 
    : './'

  return {
    plugins: [react()],
    base,
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      port: 3000,
      host: true
    }
  }
})
