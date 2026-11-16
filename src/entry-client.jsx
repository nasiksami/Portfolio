import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { matchRoute, rootFor, ROUTES } from './site';
import './index.css';

// Tells the inline script in index.html that the app is running.
window.__appStarted = true;

const container = document.getElementById('root');

// Built pages are pre-rendered and carry their route; the dev server serves
// one empty shell for every URL, so there the route comes from the address.
const route =
  ROUTES.find((candidate) => candidate.path === container.dataset.route) ??
  matchRoute(window.location.pathname);

const app = (
  <StrictMode>
    <App route={route} root={rootFor(route.path)} />
  </StrictMode>
);

if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
