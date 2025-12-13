// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  },
});
