import { useEffect } from 'react';

// Give the lazy sections a bounded number of frames to mount before giving up.
const MAX_FRAMES = 90;

/**
 * Scrolls to `location.hash` on first load.
 *
 * The browser resolves the hash while parsing the document, when the React
 * root is still empty — so the target does not exist yet and the jump is
 * silently dropped. Sections below the fold are lazy on top of that, so even
 * after the first render the element may be a frame or two away. This waits
 * for the element to appear, then scrolls once.
 *
 * Scrolling is instant rather than smooth: `html` carries `scroll-behavior:
 * smooth` for in-page nav clicks, but animating 15,000px on arrival is slow
 * and disorienting. `scrollIntoView` honours the section's `scroll-margin-top`,
 * so the fixed header does not cover the heading.
 */
export function useHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return undefined;

    // A visitor who scrolls while we are still waiting has taken over; don't
    // yank them somewhere else.
    let cancelled = false;
    const onUserScroll = () => {
      cancelled = true;
    };
    window.addEventListener('wheel', onUserScroll, { passive: true, once: true });
    window.addEventListener('touchmove', onUserScroll, { passive: true, once: true });

    let frame = 0;
    let frames = 0;

    const tick = () => {
      if (cancelled) return;
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'instant', block: 'start' });
        return;
      }
      if (frames++ < MAX_FRAMES) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('wheel', onUserScroll);
      window.removeEventListener('touchmove', onUserScroll);
    };
  }, []);
}
