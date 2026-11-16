import { expect, test } from '@playwright/test';

// The site is pre-rendered: every route is a static HTML file with its
// content in the markup. These tests read the HTML the server sends, before
// any script runs, because that is what a search engine or an AI crawler
// sees. They check structure and a few fixed identifiers (the name, the job
// title), not the wording of the copy.

const ROUTES = [
  '/',
  '/projects/telecom-rag/',
  '/projects/incident-management/',
  '/projects/heritage-hive/',
];

const text = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');

test.describe('the HTML the server sends', () => {
  for (const route of ROUTES) {
    test(`${route} has its content and its own head`, async ({ request }) => {
      const response = await request.get(route);
      expect(response.status()).toBe(200);
      const html = await response.text();

      // Exactly one h1, with text in it.
      const headings = html.match(/<h1[\s>][\s\S]*?<\/h1>/g) ?? [];
      expect(headings).toHaveLength(1);
      expect(text(headings[0]).trim().length).toBeGreaterThan(3);

      // A real page, not an empty shell.
      expect(text(html).length).toBeGreaterThan(2000);
      expect(html).toContain('Nasik Sami Khan');

      // Head: one title, a description, a canonical on the real domain,
      // social tags with absolute URLs, structured data that parses.
      expect(html.match(/<title>/g)).toHaveLength(1);
      expect(html).toMatch(/<meta name="description" content="[^"]{50,}"/);
      expect(html).toContain(`<link rel="canonical" href="https://nasik.ca${route}"`);
      expect(html).toContain(`<meta property="og:url" content="https://nasik.ca${route}"`);
      expect(html).toContain('<meta property="og:image" content="https://nasik.ca/og-image.png"');
      expect(html).toContain('<meta name="twitter:card" content="summary_large_image"');
      expect(html).not.toMatch(/<meta name="robots" content="[^"]*noindex/);

      const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
      expect(blocks.length).toBeGreaterThan(0);
      for (const block of blocks) expect(() => JSON.parse(block[1])).not.toThrow();
    });
  }

  test('the home page carries every section', async ({ request }) => {
    const html = text(await (await request.get('/')).text());
    expect(html).toContain('AI Software Developer');
    for (const heading of ['Experience & education', 'Publications & awards', 'Selected work', 'Skills & technologies']) {
      expect(html).toContain(heading);
    }
    // A project, a publication and the contact address, all without scripts.
    expect(html).toContain('Telecom QA RAG System');
    expect(html).toContain('Leveraging LLM for Enhanced Incident Management in Wireless Networks');
    expect(html).toContain('nasiksami@gmail.com');
  });

  test('the home page describes the person in structured data', async ({ request }) => {
    const html = await (await request.get('/')).text();
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
    const types = graph.map((node) => node['@type']);
    expect(types).toEqual(expect.arrayContaining(['Person', 'WebSite', 'ProfilePage', 'ScholarlyArticle']));

    const person = graph.find((node) => node['@type'] === 'Person');
    expect(person.jobTitle).toBe('AI Software Developer');
    expect(person.sameAs).toHaveLength(3);
  });

  test('case studies have a breadcrumb in structured data', async ({ request }) => {
    for (const route of ROUTES.slice(1)) {
      const html = await (await request.get(route)).text();
      const graph = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1])['@graph'];
      const crumbs = graph.find((node) => node['@type'] === 'BreadcrumbList');
      expect(crumbs.itemListElement).toHaveLength(3);
      expect(crumbs.itemListElement[2].item).toBe('https://nasik.ca' + route);
    }
  });
});

test.describe('the static host', () => {
  test('an unknown URL returns the 404 page', async ({ request }) => {
    const response = await request.get('/no-such-page/deeper');
    expect(response.status()).toBe(404);
    const html = await response.text();
    expect(html).toContain('This page does not exist');
    expect(html).toContain('noindex');
  });

  test('a route without its trailing slash redirects to it', async ({ request }) => {
    const response = await request.get('/projects/telecom-rag');
    expect(response.status()).toBe(200);
    expect(response.url()).toMatch(/\/projects\/telecom-rag\/$/);
  });

  test('the sitemap lists every route and robots.txt points to it', async ({ request }) => {
    const sitemap = await (await request.get('/sitemap.xml')).text();
    for (const route of ROUTES) expect(sitemap).toContain(`<loc>https://nasik.ca${route}</loc>`);
    expect(sitemap.match(/<url>/g)).toHaveLength(ROUTES.length);

    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toContain('Sitemap: https://nasik.ca/sitemap.xml');
    expect(robots).not.toMatch(/Disallow: \/\s*$/m);
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the home page is readable', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    for (const id of ['about', 'experience', 'publications', 'projects', 'skills', 'contact']) {
      const heading = page.locator('#' + id + ' h2').first();
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
    }
    // Content that scripts would otherwise reveal on scroll is simply there.
    await expect(page.locator('#projects article').first()).toBeVisible();
  });

  test('a case study is readable', async ({ page }) => {
    await page.goto('/projects/incident-management/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#architecture figure')).toBeVisible();
    await expect(page.locator('#results table')).toBeVisible();
  });
});

test.describe('hydration and navigation', () => {
  for (const route of ROUTES) {
    test(`${route} hydrates without errors`, async ({ page }) => {
      const problems = [];
      page.on('pageerror', (error) => problems.push(error.message));
      page.on('console', (message) => {
        if (message.type() === 'error') problems.push(message.text());
      });
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      // Hydrated: the sky control responds.
      await page.getByRole('button', { name: 'Pin night' }).first().click();
      await expect(page.locator('html')).toHaveAttribute('data-sky-pin', 'night');
      expect(problems).toEqual([]);
    });
  }

  test('a project card leads to its case study and back', async ({ page }) => {
    await page.goto('/');
    const projects = page.locator('#projects');
    await projects.scrollIntoViewIfNeeded();
    await projects.getByRole('link', { name: /case study/i }).first().click();
    await expect(page).toHaveURL(/\/projects\/telecom-rag\/$/);
    await expect(page.locator('h1')).toHaveText(/Telecom/);

    await page.getByRole('navigation', { name: 'Breadcrumb' }).getByRole('link', { name: 'Home' }).click();
    await expect(page.locator('h1')).toHaveText(/Nasik Sami Khan/);
  });

  test('case-study images and links resolve from a nested page', async ({ page, request }) => {
    await page.goto('/projects/heritage-hive/');
    const hrefs = await page.locator('a[href]').evaluateAll((links) =>
      links.map((link) => link.href).filter((href) => href.startsWith(location.origin))
    );
    for (const href of new Set(hrefs)) {
      const response = await request.get(href.split('#')[0]);
      expect(response.status(), href).toBe(200);
    }
  });
});
