// A small static server for dist/ that behaves like the production hosts
// (GitHub Pages and Apache-style hosting), so local checks and the smoke
// tests see what a visitor will:
//   • a directory URL serves its index.html
//   • a directory URL without the trailing slash redirects to add it
//   • an unknown URL returns 404 with dist/404.html
// `vite preview` instead answers every unknown URL with the home page.
//
//   node scripts/serve-dist.mjs [port]        (default 4173)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.argv[2] ?? process.env.PORT ?? 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
};

const isFile = async (path) => (await stat(path).catch(() => null))?.isFile() ?? false;
const isDirectory = async (path) => (await stat(path).catch(() => null))?.isDirectory() ?? false;

async function send(response, status, path, method) {
  const body = await readFile(path);
  response.writeHead(status, {
    'Content-Type': TYPES[extname(path).toLowerCase()] ?? 'application/octet-stream',
    'Content-Length': body.length,
  });
  response.end(method === 'HEAD' ? undefined : body);
}

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    const target = normalize(join(dist, pathname));

    // Never serve anything outside dist/.
    if (target !== dist && !target.startsWith(dist + sep)) {
      response.writeHead(403).end();
      return;
    }

    if (await isDirectory(target)) {
      if (!pathname.endsWith('/')) {
        response.writeHead(301, { Location: pathname + '/' + url.search }).end();
        return;
      }
      const index = join(target, 'index.html');
      if (await isFile(index)) {
        await send(response, 200, index, request.method);
        return;
      }
    } else if (await isFile(target)) {
      await send(response, 200, target, request.method);
      return;
    }

    await send(response, 404, join(dist, '404.html'), request.method);
  } catch (error) {
    response.writeHead(500, { 'Content-Type': 'text/plain' }).end(String(error));
  }
}).listen(port, () => {
  console.log('Serving dist/ at http://localhost:' + port);
});
