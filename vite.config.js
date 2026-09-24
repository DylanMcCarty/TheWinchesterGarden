import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so the built assets work regardless of the repo name
  // this ends up published under on GitHub Pages
  // (https://<username>.github.io/<repo-name>/).
  base: './',
})
