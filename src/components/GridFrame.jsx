/**
 * Fixed page-level paper grain.
 *
 * A single tiling SVG turbulence at ~4% opacity, inlined as a data URI so it
 * costs no network request. It sits at `z-index: -1`, which works because the
 * page background is set on <html> rather than <body> (see index.css) — a
 * background on <body> would propagate to the canvas and bury this layer.
 *
 * Ink sections paint their own opaque background over it, which is correct:
 * paper has tooth, ink is flat.
 */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function GridFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.04]"
      style={{ backgroundImage: GRAIN, backgroundSize: '160px 160px' }}
    />
  );
}
