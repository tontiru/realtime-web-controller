import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: /\.(js|jsx|ts|tsx|mjs|cjs)$/,
    }),
  ],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': '/src',
      'components': '/src/components',
      'contexts': '/src/contexts',
      'lib': '/src/lib',
    },
  },
});
