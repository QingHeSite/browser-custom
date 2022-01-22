import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const version =  require('./browser-extender/manifest.json').version

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  build: {
    outDir: 'browser-extender/dist'
  },
})
