import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/boltnew/',            // project name
  optimizeDeps: {
    exclude: ['lucide-react'],  // səndə vardısa, qalsın; yoxdursa problem deyil
  },
})
