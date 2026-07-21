import { useCallback, useEffect, useRef, useState } from 'react';

// Fraction of the viewport that marks the "you are here" line. A section
// becomes active once its top scrolls above this line, which matches how
// people perceive the current section while scrolling.
const ACTIVE_LINE = 0.35;

// How long to hold a clicked target before letting scrolling take over again.
const PIN_TIMEOUT_MS = 1200;

/**
 * Tracks which section is currently in view so the nav can highlight it.
 *
 * Section positions are measured on every scroll rather than resolved once up
 * front, because the lower sections are lazy-loaded (see App.jsx) and simply
 * do not exist in the DOM when this hook first runs.
 *
 * @param {string[]} ids Section element ids, in document order.
 * @returns {{ activeId: string, selectId: (id: string) => void }}
 *   `activeId` is the section in view — empty while the hero is showing.
 *   `selectId` marks a nav click so the highlight lands on the clicked item
 *   immediately instead of flickering through everything on the way there.
 */
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState('');

  // A clicked target is "pinned" until the smooth scroll actually arrives.
  const pinnedRef = useRef(null);
  const pinTimerRef = useRef(0);
  const computeRef = useRef(() => {});

  const selectId = useCallback((id) => {
    pinnedRef.current = id;
    setActiveId(id);
    window.clearTimeout(pinTimerRef.current);
    // Safety valve: release the pin even if we never land exactly on the
    // target — an interrupted scroll, or a final section too short to win.
    pinTimerRef.current = window.setTimeout(() => {
      pinnedRef.current = null;
      computeRef.current();
    }, PIN_TIMEOUT_MS);
  }, []);

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const line = window.innerHeight * ACTIVE_LINE;

      // Last section whose top has passed the line wins.
      let current = '';
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) current = id;
      }

      // The final section is usually too short to ever push its top above the
      // line, so it could never win on its own. Once the page is scrolled to
      // the bottom, the last section that exists takes it.
      const reachedBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (reachedBottom) {
        for (let i = ids.length - 1; i >= 0; i -= 1) {
          if (document.getElementById(ids[i])) {
            current = ids[i];
            break;
          }
        }
      }

      if (pinnedRef.current) {
        // Still travelling toward the clicked section — hold the highlight.
        if (current !== pinnedRef.current) return;
        pinnedRef.current = null;
        window.clearTimeout(pinTimerRef.current);
      }

      setActiveId(current);
    };

    computeRef.current = compute;

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    // Lazy sections change the page height as they mount. Recomputing on that
    // covers both the first paint and loading straight into a #hash deep link,
    // neither of which fires a scroll event.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(pinTimerRef.current);
    };
  }, [ids]);

  return { activeId, selectId };
}
