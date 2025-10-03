import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Detect if we're on GitHub Pages or StackBlitz/local
const isGitHubPages = window.location.hostname.includes('github.io')
const isStackBlitz = window.location.hostname.includes('stackblitz')
const basename = isGitHubPages ? '/boltnew' : ''

// Add error boundary
const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('Root element not found!')
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    )
  } catch (error) {
    console.error('Error mounting React app:', error)
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: sans-serif;">
        <h1>❌ Xəta baş verdi</h1>
        <p>Aplikasiya yüklənərkən problem yarandı.</p>
        <pre style="text-align: left; background: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto;">
          ${error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    `
  }
}
