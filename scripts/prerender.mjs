// Turns the client build into static pages.
//
// `npm run build` runs three steps:
//   1. vite build                      → dist/ (assets and an empty index.html)
//   2. vite build --ssr                → dist-ssr/entry-server.mjs
//   3. node scripts/prerender.mjs      → this file
//
// For every route in src/site.js this renders the React tree to HTML and
// writes dist/<route>/index.html with the content in the markup and that
// route's own <head>. It also writes dist/404.html and dist/sitemap.xml.
// The client bundle then hydrates the markup rather than rendering it.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const server = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.mjs')).href);
const { ROUTES, SITE_URL, headFor, render, rootFor } = server;

const template = await readFile(join(dist, 'index.html'), 'utf8');
const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
const ROOT_ELEMENT = '<div id="root"></div>';
if (!SEO_BLOCK.test(template) || !template.includes(ROOT_ELEMENT)) {
  throw new Error('index.html is missing the seo markers or the root element.');
}

// Asset URLs have to be relative to each page, because the site is served
// both at a domain root and under a subdirectory. Vite writes them as
// "./assets/…" in the template and as "/assets/…" in server-rendered markup;
// both become "<prefix>assets/…", where prefix leads back to the site root.
const rebase = (html, prefix) =>
  html.replace(/(["'(=,\s])\.?\/assets\//g, (_match, before) => before + prefix + 'assets/');

for (const route of ROUTES) {
  const prefix = rootFor(route.path);
  const app = await render(route);
  const page = rebase(
    template
      .replace(SEO_BLOCK, () => headFor(route, prefix))
      .replace(ROOT_ELEMENT, () => `<div id="root" data-route="${route.path}">${app}</div>`),
    prefix
  );

  const file = join(dist, route.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page);
  console.log('prerendered', route.path, (page.length / 1024).toFixed(1) + ' kB');
}

// ── sitemap.xml ─────────────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  ROUTES.map(
    (route) =>
      '  <url>\n' +
      `    <loc>${SITE_URL}${route.path}</loc>\n` +
      `    <lastmod>${today}</lastmod>\n` +
      '  </url>\n'
  ).join('') +
  '</urlset>\n';
await writeFile(join(dist, 'sitemap.xml'), sitemap);
console.log('wrote sitemap.xml with', ROUTES.length, 'URLs');

// ── 404.html ────────────────────────────────────────────────────────────────
// Served for any unknown URL, at any depth, so it cannot use relative paths
// and does not load the app. It is self-contained: inline styles, and links
// that point at the site root. On the GitHub Pages preview the site lives
// under /<repository>/, so a few lines of script correct the links there.
const links = ROUTES.map((route) => {
  const label =
    route.page === 'home'
      ? 'Home'
      : route.slug.replace(/-/g, ' ').replace(/\b[a-z]/g, (c) => c.toUpperCase()).replace('Rag', 'RAG') +
        ' case study';
  return `        <li><a data-path="${route.path.slice(1)}" href="${route.path}">${label}</a></li>`;
}).join('\n');

const notFound = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page not found | Nasik Sami Khan</title>
    <meta name="robots" content="noindex" />
    <style>
      :root { color-scheme: dark; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 2rem 1.25rem;
        background: #0f1724;
        color: #e9eef5;
        font: 400 1.0625rem/1.6 "Public Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
      }
      main { width: 100%; max-width: 38rem; }
      .code { margin: 0; font-size: 0.8125rem; letter-spacing: 0.14em; text-transform: uppercase; color: #9fb0c6; }
      h1 { margin: 0.75rem 0 0; font: 500 clamp(2.25rem, 8vw, 3.5rem)/1.05 Fraunces, Georgia, "Times New Roman", serif; letter-spacing: -0.02em; }
      p { margin: 1.25rem 0 0; color: #c3cfde; }
      ul { margin: 2rem 0 0; padding: 0; list-style: none; border-top: 1px solid #2c3a4f; }
      li { border-bottom: 1px solid #2c3a4f; }
      a { display: block; padding: 0.95rem 0; color: #e9eef5; text-decoration: none; }
      a:hover, a:focus-visible { color: #f0b37e; }
      a:focus-visible { outline: 2px solid #f0b37e; outline-offset: 4px; border-radius: 2px; }
      .mail { display: inline; padding: 0; text-decoration: underline; text-underline-offset: 0.22em; }
    </style>
  </head>
  <body>
    <main>
      <p class="code">Error 404</p>
      <h1>This page does not exist</h1>
      <p>
        The address may be mistyped, or the page may have moved. These pages do exist:
      </p>
      <ul>
${links}
      </ul>
      <p>
        You can also reach me at
        <a class="mail" href="mailto:nasiksami@gmail.com">nasiksami@gmail.com</a>.
      </p>
    </main>
    <script>
      // The GitHub Pages preview serves the site from /<repository>/.
      (function () {
        if (!/\\.github\\.io$/.test(location.hostname)) return;
        var base = '/' + location.pathname.split('/')[1] + '/';
        var links = document.querySelectorAll('a[data-path]');
        for (var i = 0; i < links.length; i += 1) {
          links[i].setAttribute('href', base + links[i].getAttribute('data-path'));
        }
      })();
    </script>
  </body>
</html>
`;
await writeFile(join(dist, '404.html'), notFound);
console.log('wrote 404.html');

// The server bundle has done its job and is not part of the site.
await rm(join(root, 'dist-ssr'), { recursive: true, force: true });
