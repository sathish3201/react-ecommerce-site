import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import process from 'process'
// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env // polyfill .env for your app
  },
  base:'/'
})
