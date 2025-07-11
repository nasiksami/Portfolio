import React, { useState, useEffect, useRef } from 'react';
// import logo from '/src/assets/Logo.png';

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Resume', href: '#resume', id: 'resume' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Publications', href: '#publications', id: 'publications' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

function ModeToggle() {
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button
      className="ml-4 p-2 rounded hover:bg-gray-800/60 transition"
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
    >
      {dark ? (
        <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      ) : (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
      )}
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const offsets = navLinks.map(link => {
        const el = document.getElementById(link.id);
        if (!el) return { id: link.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: link.id, top: Math.abs(rect.top - 80) };
      });
      const min = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActive(min.id);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trap focus and close on ESC for mobile menu
  useEffect(() => {
    if (!open) return;
    const focusable = mobileMenuRef.current?.querySelectorAll('a,button');
    if (focusable && focusable.length) focusable[0].focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab' && focusable && focusable.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950/90 dark:bg-white/90 backdrop-blur border-b border-gray-800 dark:border-gray-200" aria-label="Main navigation">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <a href="#home" className="flex items-center group">
            {/* <img src={logo} alt="Logo" className="w-9 h-9 rounded-full border-2 border-blue-400 shadow-md bg-white/80 dark:bg-gray-900/80 group-hover:scale-105 transition-transform" /> */}
            <span className="ml-2 font-bold text-lg tracking-tight text-white dark:text-gray-900">Nasik Sami Khan</span>
          </a>
        </div>
        <div className="flex items-center">
          <button className="md:hidden p-2 rounded-lg hover:bg-blue-400/10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <svg className="w-6 h-6 text-white dark:text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
          <ul className="hidden md:flex space-x-6 font-medium">
            {navLinks.map(link => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`hover:text-blue-400 dark:hover:text-blue-600 transition-colors duration-200 text-white dark:text-gray-900 ${active === link.id ? 'font-bold underline underline-offset-8 text-blue-400 dark:text-blue-600' : ''}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <ModeToggle />
        </div>
      </div>
      {open && (
        <ul
          ref={mobileMenuRef}
          className="md:hidden px-4 pb-4 space-y-2 font-medium bg-gray-950 dark:bg-white border-t border-gray-800 dark:border-gray-200 animate-slide-fade-in"
          role="menu"
          aria-label="Mobile navigation"
        >
          {navLinks.map(link => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`block py-2 hover:text-blue-400 dark:hover:text-blue-600 transition-colors duration-200 text-white dark:text-gray-900 ${active === link.id ? 'font-bold underline underline-offset-8 text-blue-400 dark:text-blue-600' : ''}`}
                onClick={() => setOpen(false)}
                role="menuitem"
                tabIndex={0}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
      <style>{`
        @keyframes slideFadeIn {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-fade-in {
          animation: slideFadeIn 0.35s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </nav>
  );
} 