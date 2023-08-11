import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-plugin-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [million.vite({ auto: true }), react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
