import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiMoon, FiSun } from 'react-icons/fi';
import { navLinks, profile } from '../data/profile';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useTheme } from '../hooks/useTheme';
import Button from './ui/Button';

const SECTION_IDS = navLinks.map((link) => link.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);
  const { theme, toggle } = useTheme();

  // Condense the bar once the hero has scrolled past.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll and allow Escape to dismiss while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-edge bg-surface-base/80 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#top"
          className="rounded-lg font-display text-base font-bold tracking-tight text-content-primary"
        >
          Nasik<span className="text-accent">.</span>
        </a>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'text-content-primary'
                      : 'text-content-secondary hover:text-content-primary'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="rounded-lg p-2 text-content-secondary transition-colors hover:bg-surface-overlay hover:text-content-primary"
          >
            {theme === 'dark' ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
          </button>

          <Button href="#contact" size="sm" className="hidden sm:inline-flex">
            Get in touch
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="rounded-lg p-2 text-content-primary transition-colors hover:bg-surface-overlay md:hidden"
          >
            {menuOpen ? <HiX className="h-5 w-5" /> : <HiMenuAlt3 className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-edge bg-surface-base/95 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      activeId === link.id
                        ? 'bg-accent/10 text-accent'
                        : 'text-content-secondary hover:bg-surface-overlay hover:text-content-primary'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button href={profile.resumeUrl} external size="sm" className="w-full">
                  Download resume
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
