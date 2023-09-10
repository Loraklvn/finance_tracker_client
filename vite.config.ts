import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/public': path.resolve(__dirname, './public'),
      '@/src': path.resolve(__dirname, './src'),
      '@/images': path.resolve(__dirname, './public/images'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/style': path.resolve(__dirname, './src/style'),
    },
  },
  plugins: [react()],
});
