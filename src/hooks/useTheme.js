import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

/**
 * Paper/ink theme with localStorage persistence.
 *
 * Paper (light) is the default; the `.dark` class on <html> opts into ink.
 * An inline script in index.html applies the stored choice before first paint,
 * so this hook only needs to read back what is already on the element.
 *
 * The stored values stay 'light' | 'dark' rather than 'paper' | 'ink' so an
 * existing visitor's saved preference carries over from the previous design,
 * and so the value matches what `prefers-color-scheme` reports.
 *
 * The preference is written only when the visitor actually toggles. Persisting
 * on mount would stamp a choice nobody made, which permanently opts them out
 * of the follow-the-OS behaviour below.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Follow the OS only while the visitor has not made an explicit choice.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        return;
      }
      setTheme(event.matches ? 'dark' : 'light');
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Private browsing or blocked storage — the toggle still works for
        // the current page, it just won't persist.
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
