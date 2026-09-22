import { motion, useSpring, useTransform, useVelocity } from 'framer-motion';

// A deterministic fringe of grass along the horizon. Heights are seeded from
// the index so the silhouette is the same on every render.
const BLADES = Array.from({ length: 120 }, (_, i) => {
  const x = (i / 119) * 1200;
  const seed = ((i * 7919) % 97) / 97;
  const height = 10 + 34 * seed + 10 * Math.sin(i * 0.61);
  const lean = 3 * Math.sin(i * 1.7);
  return { x, height, lean };
});

/**
 * Weather for the hero: three haze bands that drift against the pointer at
 * different depths, a fringe of grass that leans with the wind, and a glow
 * where the sun meets the horizon.
 *
 * Everything moves through MotionValues supplied by the hero — no React state
 * is touched on pointer move. Under reduced motion the composition is static
 * and complete.
 */
export default function Weather({ windX, windY, reduceMotion }) {
  const farX = useTransform(windX, [-1, 1], [-50, 50]);
  const nearX = useTransform(windX, [-1, 1], [120, -120]);
  const groundY = useTransform(windY, [-1, 1], [-10, 10]);

  // Grass leans away from the direction the pointer is moving. Velocity is in
  // normalised units per second; a full sweep across the hero in a second is
  // about 2, so ±2.5 covers a brisk gesture.
  const velocity = useVelocity(windX);
  const leanTarget = useTransform(velocity, [-2.5, 2.5], [9, -9]);
  const lean = useSpring(leanTarget, { stiffness: 140, damping: 16, mass: 0.5 });
  const skew = useTransform(lean, (deg) => `skewX(${deg}deg)`);

  const still = reduceMotion ? undefined : {};

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Far haze: cool, wide, slow. */}
      <motion.div
        className="absolute -left-[12%] bottom-[16%] h-[24vh] w-[74%] rounded-[100%] bg-accent/[0.14] blur-3xl"
        style={reduceMotion ? undefined : { x: farX }}
      />
      {/* Near haze: warm, drifts the opposite way for depth. */}
      <motion.div
        className="absolute -right-[18%] bottom-[4%] h-[20vh] w-[84%] rounded-[100%] bg-signal/[0.1] blur-3xl"
        style={reduceMotion ? undefined : { x: nearX }}
      />
      {/* Ground mist hugging the horizon. */}
      <motion.div
        className="absolute inset-x-[-6%] bottom-0 h-[9vh] rounded-[100%] bg-surface-raised/70 blur-2xl"
        style={reduceMotion ? undefined : { y: groundY }}
      />

      {/* Grass fringe standing on the rule. */}
      <svg
        className="absolute inset-x-0 bottom-0 h-14 w-full md:h-20"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        focusable="false"
      >
        <motion.g
          style={reduceMotion ? still : { transform: skew, transformOrigin: '600px 60px' }}
          className="stroke-content-primary/40"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        >
          {BLADES.map((blade, i) => (
            <line
              key={i}
              x1={blade.x}
              y1="60"
              x2={blade.x + blade.lean}
              y2={60 - blade.height}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
}
