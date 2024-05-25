import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5001,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
