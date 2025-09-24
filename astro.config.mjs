// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Prevent CSS from being auto-injected to reduce render blocking
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'assets/[name].[hash][extname]';
            }
            return 'assets/[name].[hash][extname]';
          }
        }
      }
    }
  }
});
