/// <reference types='vitest' />

import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import { tanstackRouter } from '@tanstack/router-vite-plugin';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    root: import.meta.dirname,
    cacheDir: '../../node_modules/.vite/apps/host',
    server: {
      port: 4200,
      host: 'localhost',
    },
    preview: {
      port: 4200,
      host: 'localhost',
    },
    plugins: [
      tanstackRouter({
        routesDirectory: './src/app/routes',
        generatedRouteTree: './src/routeTree.gen.ts',
      }),
      react(),
      nxViteTsPaths(),
      nxCopyAssetsPlugin(['*.md']),
      federation({
        name: 'host_app',
        remotes: {
          remote_billing: env.VITE_REMOTE_BILLING_URL || 'http://localhost:4201/assets/remoteEntry.js',
          remote_wired: env.VITE_REMOTE_WIRED_URL || 'http://localhost:4202/assets/remoteEntry.js',
          remote_wireless: env.VITE_REMOTE_WIRELESS_URL || 'http://localhost:4203/assets/remoteEntry.js',
        },
        shared: ['react', 'react-dom', '@tanstack/react-router'],
      }),
    ],
    // Uncomment this if you are using workers.
    // worker: {
    //   plugins: () => [ nxViteTsPaths() ],
    // },
    build: {
      outDir: '../../dist/apps/host',
      emptyOutDir: true,
      reportCompressedSize: true,
      target: 'esnext',
      modulePreload: false,
      minify: false,
      cssCodeSplit: false,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    test: {
      name: 'host',
      watch: false,
      globals: true,
      environment: 'jsdom',
      include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default'],
      coverage: {
        reportsDirectory: '../../coverage/apps/host',
        provider: 'v8' as const,
      },
    },
  };
});
