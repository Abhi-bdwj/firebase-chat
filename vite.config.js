import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Set this to your subfolder path if needed
  build: {
    outDir: 'dist',
    sourcemap: false, // Optional: Disable source maps for production
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Customize chunking if needed
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
