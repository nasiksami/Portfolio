import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { navLinks, profile } from '../data/profile';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useTheme } from '../hooks/useTheme';
import Button from './ui/Button';

const SECTION_IDS = navLinks.map((link) => link.id);

/** Record number for a nav target, matching the §NN in each Section. */
const recordNumber = (index) => String(index + 1).padStart(2, '0');

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeId, selectId } = useScrollSpy(SECTION_IDS);
  const { theme, toggle } = useTheme();

  // Draw the rule under the bar once the hero has scrolled past.
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        // Solid, not translucent: there is no glass anywhere in this design.
        scrolled ? 'border-b border-edge bg-surface-base' : ''
      }`}
    >
      <nav aria-label="Primary" className="shell flex h-20 items-center justify-between">
        <a href="#top" className="display text-lg text-content-primary" style={{ '--wdth': 88 }}>
          Nasik
          <span className="text-accent">⁄</span>
        </a>

        {/* Desktop navigation — a numbered index, not a menu. */}
        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link, index) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => selectId(link.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`meta-sm flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? 'text-content-primary'
                      : 'text-content-muted hover:text-content-primary'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={isActive ? 'text-accent' : 'text-content-muted'}
                  >
                    §{recordNumber(index)}
                  </span>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      className="ml-0.5 h-1.5 w-1.5 bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'paper' : 'ink'} theme`}
            className="meta-sm flex items-center gap-2 text-content-muted transition-colors hover:text-accent"
          >
            <span
              aria-hidden="true"
              className={`h-3 w-3 border border-current ${
                theme === 'dark' ? '' : 'bg-current'
              }`}
            />
            <span aria-hidden="true">{theme === 'dark' ? 'Ink' : 'Paper'}</span>
          </button>

          <Button
            href="#contact"
            variant="solid"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => selectId('contact')}
          >
            Get in touch
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="text-content-primary transition-colors hover:text-accent md:hidden"
          >
            {menuOpen ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu: a full-screen inverted index page. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="invert-surface fixed inset-x-0 top-20 bottom-0 overflow-y-auto md:hidden"
          >
            <ul className="ledger shell py-4">
              {navLinks.map((link, index) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => {
                      selectId(link.id);
                      setMenuOpen(false);
                    }}
                    aria-current={activeId === link.id ? 'page' : undefined}
                    className={`flex items-baseline gap-4 py-5 transition-colors ${
                      activeId === link.id
                        ? 'text-accent'
                        : 'text-content-primary hover:text-accent'
                    }`}
                  >
                    <span aria-hidden="true" className="meta-sm text-content-muted">
                      §{recordNumber(index)}
                    </span>
                    <span className="display d-2" style={{ '--wdth': 92 }}>
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <Button
                  href={profile.resumeUrl}
                  external
                  variant="outline"
                  className="mt-6 w-full"
                >
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
