import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // three.js is lazy-loaded on its own, so its chunk is expected to be large.
  build: { chunkSizeWarningLimit: 600 },
});
