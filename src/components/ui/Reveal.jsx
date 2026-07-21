import { motion, useReducedMotion } from 'framer-motion';

/**
 * Scroll-triggered entrance: a left-to-right wipe, as if the line were being
 * printed onto the page.
 *
 * Animates once when the element enters the viewport. Honours the OS
 * reduced-motion setting by rendering the plain element with no motion
 * wrapper at all, so no content ever depends on animation to become visible.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
  /** `wipe` reads as printing; `rise` suits large display type. */
  variant = 'wipe',
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const states =
    variant === 'rise'
      ? { hidden: { opacity: 0, y: 28 }, shown: { opacity: 1, y: 0 } }
      : {
          hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
          shown: { opacity: 1, clipPath: 'inset(0 0% 0 0)' },
        };

  return (
    <MotionTag
      className={className}
      initial={states.hidden}
      whileInView={states.shown}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
