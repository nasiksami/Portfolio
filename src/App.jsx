import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import GridFrame from './components/GridFrame';
import { useHashScroll } from './hooks/useHashScroll';
import Hero from './sections/Hero';
import About from './sections/About';

// Below-the-fold sections are code-split so the initial bundle only carries
// what is needed to paint the hero.
const Projects = lazy(() => import('./sections/Projects'));
const Skills = lazy(() => import('./sections/Skills'));
const Experience = lazy(() => import('./sections/Experience'));
const Publications = lazy(() => import('./sections/Publications'));
const Contact = lazy(() => import('./sections/Contact'));

/** Reserves vertical space while a lazy section loads, avoiding layout shift. */
function SectionFallback() {
  return <div className="min-h-[60vh]" aria-hidden="true" />;
}

export default function App() {
  // Deep links (nasik.ca/#projects) resolve before React has rendered, so the
  // browser's own jump is dropped. Re-run it once the target exists.
  useHashScroll();

  return (
    <>
      <a
        href="#main"
        className="meta sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-3 focus:text-on-accent"
      >
        Skip to main content
      </a>

      <GridFrame />
      <Navbar />

      {/*
        No dividers between sections: the paper↔ink inversion is what separates
        them, so every boundary is a hard edge rather than a hairline.
      */}
      <main id="main">
        <Hero />
        <About />
        <Suspense fallback={<SectionFallback />}>
          <Projects />
          <Skills />
          <Experience />
          <Publications />
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
