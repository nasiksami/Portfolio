import { motion, useSpring, useTransform, useVelocity } from 'framer-motion';

// A sparse, clumped fringe of grass along the horizon. Seeded from the index
// so the silhouette is stable across renders: tall stems in loose clumps,
// short ones between, each a gentle curve rather than a straight tick.
const BLADES = Array.from({ length: 84 }, (_, i) => {
  const clump = Math.sin(i * 0.37) * 0.5 + Math.sin(i * 0.11 + 1.3) * 0.5;
  const seed = ((i * 7919) % 101) / 101;
  const x = (i / 83) * 1200 + (seed - 0.5) * 9;
  const height = 5 + 7 * seed + Math.max(clump, 0) * 22;
  const bend = (seed - 0.5) * 8;
  return `M${x.toFixed(1)} 40 q${(bend * 0.3).toFixed(1)} ${(-height * 0.55).toFixed(1)} ${bend.toFixed(1)} ${(-height).toFixed(1)}`;
});

/**
 * Weather for the hero: two haze banks that drift against the pointer at
 * different depths, and a fringe of grass that leans with the wind.
 *
 * Everything moves through MotionValues supplied by the hero; nothing touches
 * React state on pointer move, and every moving layer is a transform on a
 * painted gradient, never an animated filter. Under reduced motion the
 * composition is static and complete.
 */
export default function Weather({ windX, windY, reduceMotion }) {
  const farX = useTransform(windX, [-1, 1], [-40, 40]);
  const nearX = useTransform(windX, [-1, 1], [90, -90]);
  const nearY = useTransform(windY, [-1, 1], [-8, 8]);

  // Grass leans away from the direction the pointer moves. Velocity is in
  // normalised units per second; a brisk sweep across the hero is about 2.
  const velocity = useVelocity(windX);
  const leanTarget = useTransform(velocity, [-2.5, 2.5], [10, -10]);
  const lean = useSpring(leanTarget, { stiffness: 140, damping: 16, mass: 0.5 });
  const skew = useTransform(lean, (deg) => `skewX(${deg}deg)`);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        className="absolute inset-x-[-15%] bottom-[8%] h-[38%] bg-[radial-gradient(ellipse_at_30%_70%,rgb(var(--accent-rgb)/0.16),transparent_62%)]"
        style={reduceMotion ? undefined : { x: farX }}
      />
      <motion.div
        className="absolute inset-x-[-20%] bottom-0 h-[26%] bg-[radial-gradient(ellipse_at_65%_100%,rgb(var(--signal-rgb)/0.12),transparent_60%)]"
        style={reduceMotion ? undefined : { x: nearX, y: nearY }}
      />

      <svg
        className="absolute inset-x-0 bottom-0 h-8 w-full md:h-10"
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        focusable="false"
      >
        <motion.g
          style={reduceMotion ? undefined : { transform: skew, transformOrigin: '600px 40px' }}
          fill="none"
          className="stroke-content-primary/30"
          strokeWidth="1"
          strokeLinecap="round"
        >
          {BLADES.map((d) => (
            <path key={d} d={d} vectorEffect="non-scaling-stroke" />
          ))}
        </motion.g>
      </svg>
    </div>
  );
}
