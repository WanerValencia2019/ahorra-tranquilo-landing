// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ahorratranquilo.com',
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  },
});