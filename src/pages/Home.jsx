import { lazy, Suspense } from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';

// Below-the-fold sections are code-split so the initial bundle only carries
// what is needed to hydrate the hero. Their markup is already in the
// pre-rendered page; these chunks only make it interactive.
const Projects = lazy(() => import('../sections/Projects'));
const Skills = lazy(() => import('../sections/Skills'));
const Experience = lazy(() => import('../sections/Experience'));
const Publications = lazy(() => import('../sections/Publications'));
const Contact = lazy(() => import('../sections/Contact'));

/** Reserves vertical space while a lazy section loads, avoiding layout shift. */
function SectionFallback() {
  return <div className="min-h-[60vh]" aria-hidden="true" />;
}

/*
  Sections are sky → horizon rule → ground. The ground dissolves back into the
  sky at its foot, so the only hard edge between sections is the next horizon.
*/
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={<SectionFallback />}>
        <Experience />
        <Publications />
        <Projects />
        <Skills />
        <Contact />
      </Suspense>
    </>
  );
}
