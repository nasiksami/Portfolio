import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Home from './sections/Home';
import About from './sections/About';
import Resume from './sections/Resume';
import Projects from './sections/Projects';
import Publications from './sections/Publications';
import Contact from './sections/Contact';
import Timeline from './sections/Timeline';
import Skills from './sections/Skills';
import BackToTop from './components/BackToTop';
import ExperienceTimeline from './sections/ExperienceTimeline';
import EducationTimeline from './sections/EducationTimeline';

function useSectionReveal() {
  const refs = useRef([]);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    refs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);
  return refs;
}

function App() {
  const sectionRefs = useSectionReveal();
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />
      <BackToTop />
      <main className="pt-16 max-w-4xl mx-auto px-4">
        <section id="home" ref={el => (sectionRefs.current[0] = el)} className="reveal py-6"><Home /></section>
        <section id="about" ref={el => (sectionRefs.current[1] = el)} className="reveal py-1"><About /></section>
        <section id="skills" ref={el => (sectionRefs.current[2] = el)} className="reveal py-1"><Skills /></section>
        <section id="projects" ref={el => (sectionRefs.current[3] = el)} className="reveal py-1"><Projects /></section>
        <section id="experience-timeline" ref={el => (sectionRefs.current[4] = el)} className="reveal py-1"><ExperienceTimeline /></section>
        <section id="education-timeline" ref={el => (sectionRefs.current[5] = el)} className="reveal py-1"><EducationTimeline /></section>
        <section id="resume" ref={el => (sectionRefs.current[6] = el)} className="reveal py-2"><Resume /></section>
        <section id="publications" ref={el => (sectionRefs.current[7] = el)} className="reveal py-6"><Publications /></section>
        <section id="contact" ref={el => (sectionRefs.current[8] = el)} className="reveal py-6"><Contact /></section>
      </main>
      {/* Footer */}
      <footer className="w-full bg-gray-900/90 border-t border-blue-400/10 py-6 mt-6 flex flex-col items-center text-center">
        <nav className="mb-2 flex flex-wrap justify-center gap-6 text-sm text-blue-300">
          <a href="#home" className="hover:text-blue-400 transition">Home</a>
          <a href="#about" className="hover:text-blue-400 transition">About</a>
          <a href="#resume" className="hover:text-blue-400 transition">Resume</a>
          <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
          <a href="#publications" className="hover:text-blue-400 transition">Publications</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
        </nav>
        <div className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Nasik Sami Khan. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default App; 