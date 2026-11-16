// Single source of truth for the time-of-day arc. KNOTS, FLIPS, SKY and GROUND are
// written by scripts/sky-tokens.py from the same knot table as the token
// block in index.css; edit the table there and re-run with --write.

/** Arc positions of the eight palette knots (pre-dawn → aurora). */
export const KNOTS = [0.0, 0.11, 0.14, 0.3, 0.46, 0.49, 0.78, 1.0];

/** Where the ink family flips: sunrise and sunset. */
export const FLIPS = { sunrise: 0.12171, sunset: 0.48198 };

/** Sky colour at each knot, as RGB triples, for painting section gradients. */
export const SKY = [[15, 23, 36], [59, 36, 68], [244, 231, 212], [240, 238, 230], [239, 230, 214], [126, 58, 55], [10, 20, 32], [6, 17, 15]];

/** Ground colour at each knot, as RGB triples. */
export const GROUND = [[20, 30, 44], [56, 37, 68], [239, 232, 219], [250, 249, 245], [242, 230, 204], [119, 60, 74], [17, 28, 41], [12, 26, 23]];

/** Fixed positions for the pinned skies. Night is starlight, not aurora. */
export const PINS = { day: 0.3, night: 0.78 };

/** localStorage key, unchanged from earlier designs for preference carry-over. */
export const STORAGE_KEY = 'theme';

/** Height of a sunrise or sunset band at the top of a section. */
export const CROSSING_PX = 88;

/**
 * The span of the day each section covers. The spans follow document order —
 * About, Experience, Publications, Projects, Skills, Contact — so a section's
 * place in the day is set by its position, not its subject. Adjacent
 * sections share a boundary value so the painted sky is continuous.
 *
 * A section with `cross` opens with a CROSSING_PX band that carries the sky
 * across a brightness crossing — dawn to morning, afternoon to dusk — in its
 * top padding, where there is no text. Its palette is taken from the part of
 * the day after the band.
 */
export const ARC = {
  top: { from: 0, to: 0 },
  about: { from: 0, cross: 0.14, to: 0.3 },
  experience: { from: 0.3, to: 0.4 },
  publications: { from: 0.4, to: 0.46 },
  projects: { from: 0.46, cross: 0.49, to: 0.66 },
  skills: { from: 0.66, to: 0.84 },
  contact: { from: 0.84, to: 1 },
  footer: { from: 1, to: 1 },
  // Case-study pages run the same day in three sections: morning,
  // the working day, then dusk through to night.
  caseIntro: { from: 0.14, to: 0.3 },
  caseBody: { from: 0.3, to: 0.46 },
  caseClose: { from: 0.46, cross: 0.49, to: 1 },
};

const mix = (a, b, f) => a.map((v, i) => Math.round(v + (b[i] - v) * f));

const at = (table, t) => {
  if (t <= KNOTS[0]) return table[0];
  for (let i = 1; i < KNOTS.length; i += 1) {
    if (t <= KNOTS[i]) return mix(table[i - 1], table[i], (t - KNOTS[i - 1]) / (KNOTS[i] - KNOTS[i - 1]));
  }
  return table[table.length - 1];
};

/** Sky colour at arc position t, piecewise-linear between knots. */
export const skyAt = (t) => at(SKY, t);

/** Ground colour at arc position t, piecewise-linear between knots. */
export const groundAt = (t) => at(GROUND, t);

const nearestKnot = (t) =>
  KNOTS.reduce((best, k) => (Math.abs(k - t) < Math.abs(best - t) ? k : best), KNOTS[0]);

/**
 * The arc position a section's text palette is taken from: the keyframe
 * nearest the middle of its text span. Snapping to a keyframe rather than
 * interpolating matters because neighbouring keyframes can have distant
 * accent hues — morning rust and noon blue average to grey. The painted sky
 * behind the text still interpolates continuously.
 */
export function paletteAt(arc) {
  const start = arc.cross ?? arc.from;
  return nearestKnot((start + arc.to) / 2);
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

/**
 * The Live seam from the opening's ground into About's: one gradient that
 * runs from the foot of the hero's text, through both paddings, to just
 * above About's heading, so the change happens where there is no text. The
 * hero paints its first part and About the rest; both carry the same value.
 * Stops follow a smoothstep, so the colour eases out of navy and into cream
 * the way Night's long fade does, with no visible band.
 */
const SEAM = (() => {
  const from = groundAt(ARC.top.to);
  const to = groundAt(paletteAt(ARC.about));
  const stops = [];
  for (let i = 0; i <= 12; i += 1) {
    const x = i / 12;
    const eased = x * x * (3 - 2 * x);
    stops.push('rgb(' + mix(from, to, eased).join(' ') + ') ' + (x * 100).toFixed(2) + '%');
  }
  return 'linear-gradient(to bottom, ' + stops.join(', ') + ')';
})();

/** Props that place an element on the arc: its palette and its painted sky. */
export function skyProps(arc) {
  return {
    'data-sky': Object.keys(ARC).find((key) => ARC[key] === arc) ?? '',
    style: {
      '--sky': paletteAt(arc),
      '--sky-grad': skyGradient(arc),
      '--seam-grad': arc === ARC.top || arc === ARC.about ? SEAM : undefined,
    },
  };
}
