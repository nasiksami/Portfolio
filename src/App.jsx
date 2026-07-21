import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
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
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <hr className="hairline" />
        <About />
        <Suspense fallback={<SectionFallback />}>
          <hr className="hairline" />
          <Projects />
          <hr className="hairline" />
          <Skills />
          <hr className="hairline" />
          <Experience />
          <hr className="hairline" />
          <Publications />
          <hr className="hairline" />
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
