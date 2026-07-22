import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { navLinks, profile } from '../data/profile';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useTheme } from '../hooks/useTheme';
import Button from './ui/Button';

const SECTION_IDS = navLinks.map((link) => link.id);
const recordNumber = (index) => String(index + 1).padStart(2, '0');

function NavItems({ activeId, selectId, onSelect, compact = false }) {
  return navLinks.map((link, index) => {
    const isActive = activeId === link.id;
    return (
      <li key={link.id}>
        <a
          href={'#' + link.id}
          onClick={() => {
            selectId(link.id);
            onSelect?.();
          }}
          aria-current={isActive ? 'page' : undefined}
          className={[
            'group tap gap-2 transition-colors',
            compact ? 'w-full justify-between py-4' : 'py-2',
            isActive ? 'text-content-primary' : 'text-content-muted hover:text-content-primary',
          ].join(' ')}
        >
          <span className={['meta-sm', isActive ? 'text-signal' : 'text-content-muted'].join(' ')}>
            {recordNumber(index)}
          </span>
          <span className={compact ? 'display text-4xl' : 'meta-sm'}>{link.label}</span>
          {compact && (
            <span
              aria-hidden="true"
              className={[
                'h-px flex-1 transition-colors',
                isActive ? 'bg-signal' : 'bg-edge',
              ].join(' ')}
            />
          )}
        </a>
      </li>
    );
  });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeId, selectId } = useScrollSpy(SECTION_IDS);
  const { theme, toggle } = useTheme();
  const reduceMotion = useReducedMotion();
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusable = () =>
      Array.from(
        menuRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled])'
        ) ?? []
      );

    requestAnimationFrame(() => focusable()[0]?.focus());

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const headerClass = [
    'fixed inset-x-0 top-0 z-50 transition-all duration-300',
    scrolled
      ? 'border-b border-edge/70 bg-surface-base/90 shadow-[0_10px_40px_rgb(0_0_0/0.08)] backdrop-blur-xl'
      : 'bg-transparent',
  ].join(' ');

  return (
    <>
      <header className={headerClass}>
        <nav aria-label="Primary" className="shell flex h-20 items-center justify-between gap-6">
          <a href="#top" className="tap group gap-2 text-content-primary">
            <span className="display text-2xl leading-none">Nasik</span>
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-signal shadow-[0_0_0_5px_rgb(var(--signal)/0.12)] transition-transform group-hover:scale-125"
            />
            <span className="sr-only">⁄</span>
          </a>

          <ul className="hidden items-center gap-5 lg:flex xl:hidden">
            <NavItems activeId={activeId} selectId={selectId} />
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggle}
              aria-label={'Switch to ' + (theme === 'dark' ? 'paper' : 'ink') + ' theme'}
              className="meta-sm tap gap-2 rounded-full border border-edge/80 bg-surface-base/60 px-3 text-content-secondary transition-colors hover:border-accent hover:text-accent"
            >
              <span
                aria-hidden="true"
                className={[
                  'h-2.5 w-2.5 rounded-full border border-current',
                  theme === 'dark' ? '' : 'bg-current',
                ].join(' ')}
              />
              <span aria-hidden="true" className="hidden sm:inline">
                {theme === 'dark' ? 'Ink' : 'Paper'}
              </span>
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
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="tap -mr-2 justify-center rounded-full px-2 text-content-primary lg:hidden"
            >
              {menuOpen ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      <nav
        aria-label="Section index"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 rounded-full border border-edge/70 bg-surface-base/85 p-2 shadow-2xl backdrop-blur-xl xl:block"
      >
        <ul className="flex flex-col items-center gap-1">
          {navLinks.map((link, index) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.id}>
                <a
                  href={'#' + link.id}
                  onClick={() => selectId(link.id)}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={link.label}
                  className={[
                    'group meta-sm tap relative h-10 w-10 justify-center rounded-full transition-all',
                    isActive
                      ? 'bg-signal text-on-signal'
                      : 'text-content-muted hover:bg-surface-overlay hover:text-content-primary',
                  ].join(' ')}
                >
                  {recordNumber(index)}
                  <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-content-primary px-3 py-1.5 text-surface-base group-hover:block">
                    {link.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={reduceMotion ? false : { opacity: 0, clipPath: 'circle(0% at 92% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 92% 0%)' }}
            exit={reduceMotion ? undefined : { opacity: 0, clipPath: 'circle(0% at 92% 0%)' }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            className="invert-surface fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto lg:hidden"
          >
            <div className="atlas-grid" aria-hidden="true" />
            <div className="shell relative flex min-h-full flex-col justify-between py-8">
              <ul className="ledger">
                <NavItems
                  activeId={activeId}
                  selectId={selectId}
                  onSelect={() => setMenuOpen(false)}
                  compact
                />
              </ul>
              <Button
                href={profile.resumeUrl}
                external
                variant="outline"
                className="mt-10 w-full"
                onClick={() => setMenuOpen(false)}
              >
                Download resume
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
