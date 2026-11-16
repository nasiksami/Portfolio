import { createContext, useContext } from 'react';

/** The canonical origin. Every canonical, Open Graph and sitemap URL hangs off it. */
export const SITE_URL = 'https://nasik.ca';

/**
 * Every public route. `path` always ends in a slash: each route is written to
 * dist/<path>/index.html at build time (scripts/prerender.mjs), so the static
 * host serves it as a directory.
 */
export const ROUTES = [
  { path: '/', page: 'home' },
  { path: '/projects/telecom-rag/', page: 'case', slug: 'telecom-rag' },
  { path: '/projects/incident-management/', page: 'case', slug: 'incident-management' },
  { path: '/projects/heritage-hive/', page: 'case', slug: 'heritage-hive' },
];

/**
 * Relative prefix from a route back to the site root. The site is served both
 * at a domain root (nasik.ca) and under a subdirectory (the GitHub Pages
 * preview), so links between pages are relative, never root-absolute.
 */
export function rootFor(path) {
  const depth = path.split('/').filter(Boolean).length;
  return depth === 0 ? './' : '../'.repeat(depth);
}

/**
 * Resolves a pathname to a route by its tail, so it works under any base
 * path. Used by the dev server, where pages are not pre-rendered; the built
 * pages carry their route on the root element instead.
 */
export function matchRoute(pathname) {
  const normalized = pathname.replace(/index\.html$/, '').replace(/\/?$/, '/');
  return (
    [...ROUTES]
      .sort((a, b) => b.path.length - a.path.length)
      .find((route) => normalized.endsWith(route.path)) ?? ROUTES[0]
  );
}

// An image served straight from the source tree by the dev server.
const DEV_SOURCE = /\/src\/assets\//;

const SiteContext = createContext({ route: ROUTES[0], root: './' });

export const SiteProvider = SiteContext.Provider;

/**
 * Where this page sits on the site, and helpers for linking from it:
 *   to('projects/telecom-rag/')  → a page or file, relative to the site root
 *   home('about')                → a section of the home page
 *   asset(importedUrl)           → an imported image
 *
 * `asset` exists because Vite resolves an imported image differently in the
 * two builds: an absolute URL in the browser bundle, a root-absolute path in
 * the server bundle. Rewriting both to the same page-relative path keeps the
 * server's markup and the client's first render identical, and correct under
 * any base path. The dev server serves sources directly and is left alone.
 */
export function useSite() {
  const { route, root } = useContext(SiteContext);
  const isHome = route.page === 'home';
  return {
    route,
    root,
    isHome,
    to: (target) => root + target.replace(/^\.?\//, ''),
    home: (id) => (isHome ? '#' + id : root + '#' + id),
    asset: (url) =>
      DEV_SOURCE.test(url) ? url : root + 'assets/' + url.slice(url.lastIndexOf('/') + 1),
  };
}
