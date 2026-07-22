import { motion, useReducedMotion } from 'framer-motion';

const REVEAL_MARGIN = '9999px 0px -60px 0px';

/**
 * Scroll-triggered atlas reveal. The expanded top margin guarantees that hash
 * navigation and fast scrolling can never leave content hidden.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
  variant = 'drift',
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const states =
    variant === 'rise'
      ? { hidden: { opacity: 0, y: 32 }, shown: { opacity: 1, y: 0 } }
      : {
          hidden: { opacity: 0, x: -14, y: 14, filter: 'blur(7px)' },
          shown: { opacity: 1, x: 0, y: 0, filter: 'blur(0px)' },
        };

  return (
    <MotionTag
      className={className}
      initial={states.hidden}
      whileInView={states.shown}
      viewport={{ once: true, margin: REVEAL_MARGIN }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
