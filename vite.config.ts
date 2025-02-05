import { defineConfig } from 'vitest/config';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'robots.txt'],
      manifest: {
        name: 'Spotify App',
        short_name: 'Spotify App',
        description: 'Aplicación React con Vite en modo offline',
        theme_color: '#ffffff',
      },
      workbox: {
        globPatterns: ['**/*.{ts,tsx,js,css,html,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.spotify\.com\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'spotify-api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
              networkTimeoutSeconds: 6,
            },
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['**/__test__/**/*.{test,spec}.{ts,tsx}'], // Detecta tests en __test__
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
