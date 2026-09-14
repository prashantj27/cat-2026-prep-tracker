import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the project from a subpath (/cat-2026-prep-tracker/), so CI builds
// use that as base; local dev/preview keep the root base.
const base = process.env.GITHUB_ACTIONS ? '/cat-2026-prep-tracker/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
  server: {
    open: true,
    port: 5173,
  },
})