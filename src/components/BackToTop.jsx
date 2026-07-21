import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              // Respect the OS setting rather than forcing a smooth scroll.
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'auto'
                : 'smooth',
            })
          }
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          className="meta-sm fixed bottom-6 right-6 z-50 flex items-center gap-2 border border-content-primary bg-surface-base px-3 py-2.5 text-content-primary transition-colors hover:bg-accent hover:border-accent hover:text-on-accent"
        >
          <FiArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          <span aria-hidden="true">Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
