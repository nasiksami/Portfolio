import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { GRID, KNOTS } from '../sky';

// Fraction of the viewport height used as the "where am I in the day" line.
// The centre is the natural reading position and keeps both halves of the
// viewport equally close to the value being shown.
const LINE = 0.5;

/**
 * Writes the time-of-day position `--sky` (0 → 1) onto <html>.
 *
 * Every colour token in index.css is derived from this one number, so this is
 * the only place the page's palette is ever driven from. Sections declare the
 * span of the arc they cover with `data-sky-in` / `data-sky-out`; the value is
 * interpolated across the section under the viewport line, so adjacent
 * sections sharing a boundary value make the sky continuous.
 *
 * Nothing here touches React state: the writer sets one custom property at
 * most once per animation frame, only when it has changed, and the value is
 * quantised to GRID so the hard ink flips in the stylesheet are never sampled
 * mid-step.
 *
 * When the sky is pinned (`data-sky-pin` on <html>) the stylesheet supplies a
 * fixed value, so the inline property is removed rather than written.
 *
 * Under prefers-reduced-motion the value snaps to the nearest knot so the
 * palette changes in discrete, verified steps instead of gliding.
 */
export function useSky() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    // Every write restyles the whole document, so never repeat an unchanged value.
    let last = null;

    const nearestKnot = (t) =>
      KNOTS.reduce((best, k) => (Math.abs(k - t) < Math.abs(best - t) ? k : best), KNOTS[0]);

    const compute = () => {
      frame = 0;

      if (root.dataset.skyPin) {
        root.style.removeProperty('--sky');
        last = null;
        return;
      }

      const sections = document.querySelectorAll('[data-sky-in]');
      if (!sections.length) return;

      const line = window.scrollY + window.innerHeight * LINE;
      let t = null;

      for (const el of sections) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        const height = el.offsetHeight;
        const from = Number(el.dataset.skyIn);
        const to = Number(el.dataset.skyOut);
        if (line < top) {
          // Above this section: the previous one (or the very start) applies.
          if (t === null) t = from;
          break;
        }
        if (line <= top + height) {
          t = from + ((line - top) / height) * (to - from);
          break;
        }
        t = to;
      }

      if (t === null) t = Number(sections[0].dataset.skyIn);
      if (reduceMotion) t = nearestKnot(t);
      t = Math.round(t / GRID) * GRID;
      t = Math.min(Math.max(t, 0), 1);

      const next = t.toFixed(4);
      if (next === last) return;
      last = next;
      root.style.setProperty('--sky', next);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('skypin', schedule);

    // Lazy sections change the page height as they mount; recompute on that
    // so a #hash deep link lands with the right sky.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('skypin', schedule);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);
}
