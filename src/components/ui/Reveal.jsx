import { useEffect, useRef } from 'react';

const REVEAL_MARGIN = '9999px 0px -60px 0px';

/**
 * Scroll-triggered reveal: opacity and transform only, so it stays on the
 * compositor.
 *
 * The hidden state lives in the stylesheet, not in inline styles, and only
 * applies under `.js` (set by the inline script in index.html). So the
 * pre-rendered markup is visible to crawlers and to visitors without
 * JavaScript, the server and client render identical HTML, and
 * prefers-reduced-motion is honoured by a media query rather than a branch.
 * See the "Reveal" block in index.css.
 *
 * The expanded top margin guarantees that hash navigation and fast scrolling
 * can never leave content hidden.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  variant = 'drift',
}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      element.dataset.revealed = '';
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.dataset.revealed = '';
          observer.disconnect();
        }
      },
      { rootMargin: REVEAL_MARGIN }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={className}
      style={delay ? { '--reveal-delay': delay + 's' } : undefined}
    >
      {children}
    </Tag>
  );
}
