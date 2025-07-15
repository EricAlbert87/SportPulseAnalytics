import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/SportPulse-Analytics/', // Adjust to your repo name
  build: {
    outDir: 'dist',
  },
});