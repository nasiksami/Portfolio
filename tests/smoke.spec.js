import { expect, test } from '@playwright/test';

// What a visitor must always be able to do. These check structure and
// behaviour, not wording, so editing the copy in src/data never breaks them.

const SECTIONS = ['about', 'experience', 'publications', 'projects', 'skills', 'contact'];

test.beforeEach(async ({ page }) => {
  // Fail on anything the browser reports as an error.
  page.on('pageerror', (error) => {
    throw error;
  });
  await page.goto('/');
});

test('the page loads with a name and a title', async ({ page }) => {
  await expect(page).toHaveTitle(/Nasik Sami Khan/);
  await expect(page.locator('h1')).toHaveText(/Nasik Sami Khan/);
});

test('every section renders with its heading', async ({ page }) => {
  for (const id of SECTIONS) {
    const section = page.locator('#' + id);
    await section.scrollIntoViewIfNeeded();
    await expect(section.locator('h2')).toBeVisible();
  }
});

test('the page never scrolls sideways', async ({ page }) => {
  await page.locator('#contact').scrollIntoViewIfNeeded();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test('images load', async ({ page }) => {
  for (const id of SECTIONS) await page.locator('#' + id).scrollIntoViewIfNeeded();
  await page.waitForLoadState('networkidle');
  const broken = await page.evaluate(() =>
    [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.src)
  );
  expect(broken).toEqual([]);
});

test('the resume downloads as a PDF', async ({ page, request }) => {
  const href = await page.getByRole('link', { name: /resume/i }).first().getAttribute('href');
  const response = await request.get(new URL(href, page.url()).toString());
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('pdf');
});

test('the project filter narrows the list', async ({ page }) => {
  const projects = page.locator('#projects');
  await projects.scrollIntoViewIfNeeded();
  const all = await projects.locator('article').count();
  expect(all).toBeGreaterThan(1);

  const filter = projects.getByRole('button', { name: 'Full-Stack' });
  await filter.click();
  await expect(filter).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(() => projects.locator('article').count()).toBeLessThan(all);
});

test('the sky can be pinned to night', async ({ page }) => {
  await page.getByRole('button', { name: 'Pin night' }).first().click();
  await expect(page.locator('html')).toHaveAttribute('data-sky-pin', 'night');
});

test('an empty contact form is rejected without sending', async ({ page }) => {
  let sent = false;
  await page.route('**/formspree.io/**', (route) => {
    sent = true;
    return route.abort();
  });

  const contact = page.locator('#contact');
  await contact.scrollIntoViewIfNeeded();
  await contact.getByRole('button', { name: 'Send message' }).click();

  await expect(contact.getByRole('alert').first()).toBeVisible();
  expect(sent).toBe(false);
});
