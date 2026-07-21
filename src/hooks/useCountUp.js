import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

// Stat values are display strings, not numbers: "7", "3+", "88.4%", "9".
// Split off a leading decimal number and keep whatever suffix follows.
const NUMERIC = /^(\d+(?:\.\d+)?)(.*)$/s;

/**
 * Counts a stat value up when it scrolls into view.
 *
 * Returns `[ref, display]`. Anything that is not a leading number — or a
 * reduced-motion preference — falls straight through to the original string,
 * so the value on screen is never wrong, only sometimes un-animated.
 *
 * @param {string} value The literal value from data/profile.js.
 */
export function useCountUp(value, { duration = 1200 } = {}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const match = NUMERIC.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : '';
  // Match the source's precision so "88.4%" never renders as "88%".
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0;
  const animatable = target !== null && !reduceMotion;

  const [display, setDisplay] = useState(() => (animatable ? `0${suffix}` : value));

  useEffect(() => {
    if (!animatable) {
      setDisplay(value);
      return undefined;
    }
    if (!inView) return undefined;

    let frame = 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast start, long settle, so the final digits land softly.
      const eased = progress === 1 ? 1 : 1 - 2 ** (-10 * progress);
      setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animatable, inView, target, suffix, decimals, duration, value]);

  return [ref, display];
}
