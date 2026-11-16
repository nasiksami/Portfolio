import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { useHashScroll } from './hooks/useHashScroll';
import { useSky } from './hooks/useSky';
import { SiteProvider } from './site';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';

/**
 * The frame every page shares: skip link, floating chrome, main, footer.
 * `route` picks the page; `root` is the relative path back to the site root,
 * which every cross-page link is built from (see src/site.js).
 */
export default function App({ route, root }) {
  // A deep link (nasik.ca/#projects) may land before its lazy section has
  // hydrated or, in development, rendered. Re-run the jump once it exists.
  useHashScroll();
  // Keeps the header chrome on the same point of the day as the sky under it.
  useSky();

  return (
    <SiteProvider value={{ route, root }}>
      <a
        href="#main"
        className="meta sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-3 focus:text-on-accent"
      >
        Skip to main content
      </a>

      {/* The floating chrome follows the scroll; see useSky. */}
      <div data-sky-live className="contents">
        <Navbar />
        <BackToTop />
      </div>

      <main id="main">
        {route.page === 'case' ? <CaseStudy slug={route.slug} /> : <Home />}
      </main>

      <Footer />
    </SiteProvider>
  );
}
