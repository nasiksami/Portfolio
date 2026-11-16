import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative asset paths: the site is served at a domain root (nasik.ca) and
  // under a subdirectory (the GitHub Pages preview).
  base: './',
  // The server build is only used at build time, by scripts/prerender.mjs.
  // Bundling these UI packages keeps that step independent of how each one
  // ships its CommonJS and ES module entry points; React itself is loaded
  // from node_modules.
  ssr: { noExternal: ['react-icons', 'framer-motion', '@formspree/react'] },
  build: {
    rollupOptions: {
      // .mjs so Node loads the server bundle as an ES module.
      output: {
        entryFileNames: (chunk) =>
          chunk.name === 'entry-server' ? '[name].mjs' : 'assets/[name]-[hash].js',
      },
    },
  },
});
