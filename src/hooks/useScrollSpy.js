import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view so the nav can highlight it.
 *
 * Uses a rootMargin that biases toward the upper third of the viewport: a
 * section counts as "active" once its top passes that line, which matches how
 * people perceive the current section while scrolling.
 *
 * @param {string[]} ids Section element ids, in document order.
 * @returns {string} The id of the active section.
 */
export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        // Several sections can intersect at once; pick the one highest on the
        // page among those currently visible.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
