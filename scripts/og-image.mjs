// Draws the 1200×630 social preview image, public/og-image.png.
//
// Run by hand when the name, title or focus line changes:
//   node scripts/og-image.mjs
// It is not part of `npm run build`; the PNG is committed. The card uses the
// site's own pre-dawn palette, typefaces and portrait.
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const portrait = (await readFile(join(root, 'src/assets/headshot.jpg'))).toString('base64');

const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Public+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
    <style>
      * { box-sizing: border-box; margin: 0; }
      body {
        width: 1200px; height: 630px; overflow: hidden;
        background: linear-gradient(to bottom, #0f1724 0%, #141e2c 58%, #3b2444 100%);
        color: #eef2f7; font-family: "Public Sans", system-ui, sans-serif;
        display: flex; flex-direction: column; justify-content: space-between;
        padding: 72px 80px 64px;
      }
      .top { display: flex; align-items: center; justify-content: space-between; }
      .site { font-size: 24px; letter-spacing: 0.16em; text-transform: uppercase; color: #a9b8cc; }
      img { width: 132px; height: 132px; border-radius: 50%; object-fit: cover; object-position: 50% 16%; border: 2px solid #55657c; }
      h1 { font-family: Fraunces, Georgia, serif; font-weight: 500; font-size: 104px; line-height: 1; letter-spacing: -0.03em; }
      .rule { height: 2px; margin: 34px 0 30px; background: linear-gradient(to right, #f0b37e, rgba(240, 179, 126, 0.15)); }
      .role { font-size: 40px; font-weight: 600; }
      .focus { margin-top: 14px; font-size: 27px; color: #c3cfde; }
    </style>
  </head>
  <body>
    <div class="top">
      <p class="site">nasik.ca</p>
      <img alt="" src="data:image/jpeg;base64,${portrait}" />
    </div>
    <div>
      <h1>Nasik Sami Khan</h1>
      <div class="rule"></div>
      <p class="role">AI Software Developer</p>
      <p class="focus">Machine Learning · LLMs &amp; RAG · Agentic AI · Healthcare AI</p>
    </div>
  </body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate('document.fonts.ready');
await page.screenshot({ path: join(root, 'public/og-image.png'), type: 'png' });
await browser.close();
console.log('wrote public/og-image.png');
