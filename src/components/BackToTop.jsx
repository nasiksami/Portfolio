import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

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
              behavior: reduceMotion ? 'auto' : 'smooth',
            })
          }
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.22 }}
          className="meta-sm tap fixed bottom-5 right-5 z-50 justify-center gap-2 rounded-full border border-signal bg-signal px-4 py-3 text-on-signal shadow-xl transition-transform hover:-translate-y-1 md:bottom-7 md:right-7"
        >
          <FiArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          <span aria-hidden="true" className="hidden sm:inline">Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
