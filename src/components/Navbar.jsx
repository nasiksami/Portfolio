import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiMenu, FiMoon, FiSun, FiSunrise, FiX } from 'react-icons/fi';
import { navLinks, profile } from '../data/profile';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { PIN_MODES, useSkyPin } from '../hooks/useSkyPin';
import Button from './ui/Button';

const SECTION_IDS = navLinks.map((link) => link.id);
const recordNumber = (index) => String(index + 1).padStart(2, '0');

const PIN_LABEL = { live: 'Live sky', day: 'Pin day', night: 'Pin night' };
const PIN_SHORT = { live: 'Live', day: 'Day', night: 'Night' };
const PIN_ICON = { live: FiSunrise, day: FiSun, night: FiMoon };

/**
 * "Pin the sky": Live follows the scroll arc; Day and Night freeze it. Three
 * pressed-state buttons rather than a toggle, so the current mode is always
 * legible and any mode is one click away.
 */
function SkyPin({ pin, setPin }) {
  return (
    <div
      role="group"
      aria-label="Sky"
      className="flex items-center rounded-[0.4rem] border border-edge bg-surface-base/60 p-0.5"
    >
      {PIN_MODES.map((mode) => {
        const Icon = PIN_ICON[mode];
        const isActive = pin === mode;
        return (
          <button
            key={mode}
            type="button"
            onClick={() => setPin(mode)}
            aria-pressed={isActive}
            aria-label={PIN_LABEL[mode]}
            className={[
              'meta-sm tap justify-center gap-1.5 rounded-[0.3rem] px-2 transition-colors sm:px-2.5',
              isActive
                ? 'bg-content-primary text-surface-base'
                : 'text-content-muted hover:text-content-primary',
            ].join(' ')}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            <span aria-hidden="true" className="hidden md:inline">
              {PIN_SHORT[mode]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

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
            'group tap gap-2.5 transition-colors',
            compact ? 'w-full justify-between py-4' : 'py-2',
            isActive ? 'text-content-primary' : 'text-content-muted hover:text-content-primary',
          ].join(' ')}
        >
          <span className={['meta-sm', isActive ? 'text-signal' : ''].join(' ')}>
            {recordNumber(index)}
          </span>
          <span className={compact ? 'display text-[clamp(2.4rem,9vw,3.6rem)]' : 'meta-sm'}>
            {link.label}
          </span>
          {compact && (
            <span
              aria-hidden="true"
              className={[
                'ml-4 h-px flex-1 transition-colors',
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
  const { pin, setPin } = useSkyPin();
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
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeAtDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    desktop.addEventListener('change', closeAtDesktop);
    return () => desktop.removeEventListener('change', closeAtDesktop);
  }, []);

  // Focus trap, Escape, scroll lock and focus restore for the mobile menu.
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

    const focusFrame = requestAnimationFrame(() => focusable()[0]?.focus());

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
      cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const headerClass = [
    'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
    scrolled ? 'border-b border-edge/60 bg-surface-base/85 backdrop-blur-md' : 'bg-transparent',
  ].join(' ');

  return (
    <>
      <header className={headerClass}>
        <nav aria-label="Primary" className="shell flex h-16 items-center justify-between gap-4 md:h-20">
          <a href="#top" className="tap group gap-2.5 text-content-primary">
            <span className="display text-[1.65rem] leading-none">Nasik</span>
            <span
              aria-hidden="true"
              className="mt-1 h-px w-6 bg-content-primary/50 transition-all duration-300 group-hover:w-9 group-hover:bg-signal"
            />
          </a>

          <ul className="hidden items-center gap-6 lg:flex">
            <NavItems activeId={activeId} selectId={selectId} />
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <SkyPin pin={pin} setPin={setPin} />

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
              className="tap -mr-2 justify-center rounded-[0.35rem] px-2 text-content-primary lg:hidden"
            >
              {menuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigate"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-edge bg-surface-raised lg:hidden"
          >
            <div className="shell relative flex min-h-full flex-col justify-between py-8">
              <ul className="border-b border-edge [&>li]:border-t [&>li]:border-edge">
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
