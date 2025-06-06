import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    host: '0.0.0.0',
    hmr: {
      host: '127.0.0.1',
      port: 3001
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/FlickrGallery.js'),
      name: "FlickrGallery",
      fileName: (format) => `flickrgallery.${format}.js`,
      formats: ['es', 'umd'] // ES Module und UMD für Modulnutzung
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        },
        exports: 'named'
      },
    },
  },
})
