import { useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ARC, KNOTS, arcAtOffset } from '../sky';

// The header's reading line: just under its bottom edge.
const HEADER_LINE = 72;

/**
 * Keeps the floating chrome — header, mobile menu, back-to-top — on the same
 * point of the day as the sky beneath it.
 *
 * Sections carry their own fixed palette and paint their own sky, so the page
 * itself never restyles on scroll. Only `[data-sky-live]` follows the scroll:
 * `--sky` is written onto that one small subtree, at most once per frame and
 * only when it changes. Writing it on <html> instead restyles every node on
 * the page and cost 10–16ms a frame.
 *
 * When the sky is pinned the stylesheet supplies the value and the writer
 * stands down. Under reduced motion the value snaps to the nearest knot.
 */
export function useSky() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const live = document.querySelector('[data-sky-live]');
    if (!live) return undefined;

    let frame = 0;
    let last = null;

    const nearestKnot = (t) =>
      KNOTS.reduce((best, k) => (Math.abs(k - t) < Math.abs(best - t) ? k : best), KNOTS[0]);

    const compute = () => {
      frame = 0;

      if (root.dataset.skyPin) {
        live.style.removeProperty('--sky');
        last = null;
        return;
      }

      let t = 0;
      for (const el of document.querySelectorAll('[data-sky]')) {
        const arc = ARC[el.dataset.sky];
        if (!arc) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top > HEADER_LINE) break;
        t = arcAtOffset(arc, HEADER_LINE - rect.top, rect.height);
      }
      if (reduceMotion) t = nearestKnot(t);

      const next = t.toFixed(3);
      if (next === last) return;
      last = next;
      live.style.setProperty('--sky', next);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('skypin', schedule);

    // Lazy sections change the page height as they mount.
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
