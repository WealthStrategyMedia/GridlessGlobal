// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Static output keeps us on Netlify's free tier: the whole site is prerendered
// to HTML/CSS/JS at build time. Anything dynamic (payments, form relays) runs in
// Netlify Functions under netlify/functions/.
export default defineConfig({
  site: 'https://gridlessglobal.com',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Keep build-time image work modest so Netlify free-tier builds stay fast.
    responsiveStyles: true,
  },
});
