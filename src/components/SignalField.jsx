import { motion } from 'framer-motion';

const ROUTES = [
  'M82 645 C210 512 278 548 392 414 S624 194 764 302 S972 486 1136 164',
  'M-24 246 C188 124 292 286 474 198 S780 34 936 132 S1122 318 1248 246',
  'M154 808 C292 626 448 718 572 574 S760 386 904 470 S1072 650 1234 546',
];

const NODES = [
  [112, 622],
  [268, 514],
  [392, 414],
  [548, 262],
  [764, 302],
  [924, 452],
  [1136, 164],
  [184, 194],
  [474, 198],
  [936, 132],
  [572, 574],
  [904, 470],
];

/**
 * Decorative inference map. The final focus node follows the pointer through
 * MotionValues supplied by the hero; every research route remains visible
 * when motion is disabled.
 */
export default function SignalField({ focusX, focusY, reduceMotion }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="signal-field h-full w-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="signal-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="signal-field__contours">
        <ellipse cx="646" cy="392" rx="466" ry="284" />
        <ellipse cx="646" cy="392" rx="334" ry="198" />
        <ellipse cx="646" cy="392" rx="202" ry="112" />
      </g>

      {ROUTES.map((route, index) => (
        <g key={route}>
          <path d={route} className="signal-field__ghost" />
          <motion.path
            d={route}
            className="signal-field__route"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, delay: 0.25 + index * 0.16, ease: [0.16, 1, 0.3, 1] }}
          />
        </g>
      ))}

      {NODES.map(([x, y], index) => (
        <g key={x + '-' + y}>
          <circle cx={x} cy={y} r="13" className="signal-field__node-ring" />
          <motion.circle
            cx={x}
            cy={y}
            r="3.8"
            className="signal-field__node"
            animate={reduceMotion ? undefined : { opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.4, delay: index * 0.11, repeat: Infinity }}
          />
        </g>
      ))}

      <motion.line
        x1="764"
        y1="302"
        x2={focusX}
        y2={focusY}
        className="signal-field__tether"
      />
      <motion.circle
        cx={focusX}
        cy={focusY}
        r="34"
        className="signal-field__focus-ring"
        animate={reduceMotion ? undefined : { r: [28, 38, 28], opacity: [0.25, 0.62, 0.25] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx={focusX}
        cy={focusY}
        r="6"
        className="signal-field__focus"
        filter="url(#signal-glow)"
      />
    </svg>
  );
}
