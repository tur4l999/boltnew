import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  // Detect environment
  const isStackBlitz = process.env.STACKBLITZ === 'true' || process.env.NODE_ENV === 'stackblitz'
  const isGitHubPages = mode === 'github' || mode === 'production'
  
  // Determine base path
  let base = './'
  if (command === 'build' && isGitHubPages && !isStackBlitz) {
    base = '/boltnew/'
  }

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
