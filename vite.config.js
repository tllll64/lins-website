import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

const githubPagesSpaFallback = () => ({
  name: 'github-pages-spa-fallback',
  writeBundle(options) {
    const outputDirectory = options.dir || 'dist'
    copyFileSync(
      resolve(outputDirectory, 'index.html'),
      resolve(outputDirectory, '404.html'),
    )
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), githubPagesSpaFallback()],
  base: '/',
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
  preview: {
    port: process.env.PORT ? Number(process.env.PORT) : 4173,
  },
}))
