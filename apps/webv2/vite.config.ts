import { join } from 'path';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import unfonts from 'unplugin-fonts/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 4200,
    host: 'localhost',
  },
  plugins: [
    react(),
    tsconfigPaths(),
    TanStackRouterVite({
      routesDirectory: join(__dirname, 'src/routes'),
      generatedRouteTree: join(__dirname, 'src/routeTree.gen.ts'),
      routeFileIgnorePrefix: '-',
      quoteStyle: 'single',
    }),
    unfonts({
      custom: {
        families: [
          {
            name: 'Geist',
            src: './src/assets/fonts/geist/*.woff2',
          },
        ],
      },
    }),
  ],
});
