// Single source of truth for the time-of-day arc. KNOTS, FLIPS and SKY are
// written by scripts/sky-tokens.py from the same knot table as the token
// block in index.css; edit the table there and re-run with --write.

/** Arc positions of the eight palette knots (pre-dawn → aurora). */
export const KNOTS = [0.0, 0.11, 0.14, 0.3, 0.46, 0.49, 0.78, 1.0];

/** Where the ink family flips: sunrise and sunset. */
export const FLIPS = { sunrise: 0.12171, sunset: 0.48198 };

/** Sky colour at each knot, as RGB triples, for painting section gradients. */
export const SKY = [[14, 18, 38], [59, 36, 68], [244, 231, 212], [230, 239, 246], [239, 230, 214], [126, 58, 55], [10, 20, 32], [6, 17, 15]];

/** Fixed positions for the pinned skies. Night is starlight, not aurora. */
export const PINS = { day: 0.3, night: 0.78 };

/** localStorage key, unchanged from earlier designs for preference carry-over. */
export const STORAGE_KEY = 'theme';

/** Height of a sunrise or sunset band at the top of a section. */
export const CROSSING_PX = 88;

/**
 * The span of the day each section covers, in document order. Adjacent
 * sections share a boundary value so the painted sky is continuous.
 *
 * A section with `cross` opens with a CROSSING_PX band that carries the sky
 * across a brightness crossing — dawn to morning, afternoon to dusk — in its
 * top padding, where there is no text. Its palette is taken from the part of
 * the day after the band.
 */
export const ARC = {
  top: { from: 0, to: 0.11 },
  about: { from: 0.11, cross: 0.14, to: 0.3 },
  projects: { from: 0.3, to: 0.4 },
  skills: { from: 0.4, to: 0.46 },
  experience: { from: 0.46, cross: 0.49, to: 0.66 },
  publications: { from: 0.66, to: 0.84 },
  contact: { from: 0.84, to: 1 },
  footer: { from: 1, to: 1 },
};

const mix = (a, b, f) => a.map((v, i) => Math.round(v + (b[i] - v) * f));

/** Sky colour at arc position t, piecewise-linear between knots. */
export function skyAt(t) {
  if (t <= KNOTS[0]) return SKY[0];
  for (let i = 1; i < KNOTS.length; i += 1) {
    if (t <= KNOTS[i]) return mix(SKY[i - 1], SKY[i], (t - KNOTS[i - 1]) / (KNOTS[i] - KNOTS[i - 1]));
  }
  return SKY[SKY.length - 1];
}

const nearestKnot = (t) =>
  KNOTS.reduce((best, k) => (Math.abs(k - t) < Math.abs(best - t) ? k : best), KNOTS[0]);

/** The arc position a section's palette is taken from: the middle of its text span. */
export function paletteAt(arc, reduceMotion = false) {
  const start = arc.cross ?? arc.from;
  const t = (start + arc.to) / 2;
  return reduceMotion ? nearestKnot(t) : t;
}

/**
 * The section's sky, painted as a gradient with a stop at every knot it
 * passes through, so it matches skyAt() exactly and the next section picks
 * up where this one ends.
 */
export function skyGradient(arc) {
  const rgb = (t) => 'rgb(' + skyAt(t).join(' ') + ')';
  const start = arc.cross ?? arc.from;
  const span = arc.to - start;
  const base = arc.cross !== undefined ? CROSSING_PX + 'px' : '0px';
  const at = (t) =>
    span > 0 ? `calc(${base} + (100% - ${base}) * ${((t - start) / span).toFixed(4)})` : base;

  const stops = [];
  if (arc.cross !== undefined) stops.push(rgb(arc.from) + ' 0px');
  stops.push(rgb(start) + ' ' + base);
  for (const k of KNOTS) if (k > start && k < arc.to) stops.push(rgb(k) + ' ' + at(k));
  stops.push(rgb(arc.to) + ' 100%');
  return 'linear-gradient(to bottom, ' + stops.join(', ') + ')';
}

/**
 * Arc position at a pixel offset inside a section, using the same mapping as
 * skyGradient(). The header uses it to match the sky it floats over.
 */
export function arcAtOffset(arc, offset, height) {
  if (arc.cross !== undefined && offset < CROSSING_PX) {
    return arc.from + (arc.cross - arc.from) * Math.max(offset, 0) / CROSSING_PX;
  }
  const start = arc.cross ?? arc.from;
  const base = arc.cross !== undefined ? CROSSING_PX : 0;
  const f = Math.min(Math.max((offset - base) / Math.max(height - base, 1), 0), 1);
  return start + (arc.to - start) * f;
}

/** Props that place an element on the arc: its palette and its painted sky. */
export function skyProps(arc, reduceMotion = false) {
  return {
    'data-sky': Object.keys(ARC).find((key) => ARC[key] === arc) ?? '',
    style: { '--sky': paletteAt(arc, reduceMotion), '--sky-grad': skyGradient(arc) },
  };
}
