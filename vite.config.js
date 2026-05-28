import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// Vite configuration with enhanced CommonJS handling
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Enable transformation of mixed ESM/CJS modules that may use require()
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
