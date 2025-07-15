import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/sportpulseanalytics/', // Match your repo name
  build: {
    outDir: 'dist',
    minify: 'esbuild', // Faster minification, catches syntax errors
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: '[name].[hash][extname]', // Ensure unique asset names
      },
    },
  },
  server: {
    open: true,
    strictPort: true, // Fail if port is occupied
  },
});