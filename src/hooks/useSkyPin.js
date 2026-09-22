import { useCallback, useState } from 'react';
import { STORAGE_KEY } from '../sky';

export const PIN_MODES = ['live', 'day', 'night'];

// Stored values stay 'light' | 'dark' so a preference saved by either earlier
// design carries over: dark → pinned night, light → pinned day.
const TO_STORED = { day: 'light', night: 'dark' };

/**
 * "Pin the sky": Live follows the scroll arc; Day and Night freeze it.
 *
 * The inline script in index.html applies a stored pin before first paint, so
 * this only reads back what is already on <html>. localStorage is written
 * only when the visitor clicks — never on mount — so an untouched site keeps
 * following the arc.
 */
export function useSkyPin() {
  const [pin, setPinState] = useState(() => {
    if (typeof document === 'undefined') return 'live';
    return document.documentElement.dataset.skyPin || 'live';
  });

  const setPin = useCallback((mode) => {
    const root = document.documentElement;
    if (mode === 'live') delete root.dataset.skyPin;
    else root.dataset.skyPin = mode;

    try {
      if (mode === 'live') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, TO_STORED[mode]);
    } catch {
      // Private browsing or blocked storage — the pin still applies for this
      // page, it just won't persist.
    }

    setPinState(mode);
    // Let the sky writer drop or restore its inline value immediately.
    window.dispatchEvent(new Event('skypin'));
  }, []);

  return { pin, setPin };
}
