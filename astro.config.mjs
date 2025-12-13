// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

export default defineConfig({
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  },
});
