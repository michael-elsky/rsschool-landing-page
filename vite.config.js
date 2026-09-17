import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import pugPlugin from 'vite-plugin-pug'

export default defineConfig({
  base: './',

  plugins: [pugPlugin()],

  build: {
    sourcemap: true,

    rolldownOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        catalog: resolve(import.meta.dirname, 'catalog.html'),
      },
    },
  },
})
