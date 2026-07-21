import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Drives Archivo's variable WIDTH axis from the pointer's horizontal position.
 *
 * Returns a ref to attach to the surface you want to track. The hook writes
 * `--wdth` directly onto that element rather than going through React state:
 * custom properties inherit, so every `.display` inside picks it up, and a
 * pointermove never triggers a re-render.
 *
 * Disabled entirely for coarse pointers (there is no hover on touch) and under
 * `prefers-reduced-motion`, in both cases leaving the CSS default in place.
 *
 * @param {{ min?: number, max?: number }} range Width-axis bounds. Archivo
 *   supports 62–125, but the defaults stop short of both ends: the widest
 *   setting has to still fit the hero wordmark inside its 8-column track at
 *   mid viewports, and the narrowest has to stay readable.
 */
export function usePointerWidth({ min = 80, max = 112 } = {}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reduceMotion) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;

    let frame = 0;
    let next = null;

    const apply = () => {
      frame = 0;
      element.style.setProperty('--wdth', next.toFixed(1));
    };

    const onMove = (event) => {
      const rect = element.getBoundingClientRect();
      const ratio = (event.clientX - rect.left) / rect.width;
      const clamped = Math.min(Math.max(ratio, 0), 1);
      next = min + (max - min) * clamped;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      element.style.removeProperty('--wdth');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [min, max, reduceMotion]);

  return ref;
}
