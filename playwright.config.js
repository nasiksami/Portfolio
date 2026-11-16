import { defineConfig, devices } from '@playwright/test';

// Smoke tests run against the production build in dist/, served by
// scripts/serve-dist.mjs, which answers like the production hosts do
// (directory indexes, trailing-slash redirects, a real 404). So they exercise
// the same files that are deployed, the way a visitor will receive them.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'phone', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'node scripts/serve-dist.mjs 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
