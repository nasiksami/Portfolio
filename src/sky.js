// Single source of truth for the time-of-day arc. Generated alongside the token
// block in index.css from the same knot table; keep the two in step.

/** Arc positions of the eight palette knots (pre-dawn → aurora). */
export const KNOTS = [0.0, 0.11, 0.14, 0.3, 0.46, 0.49, 0.78, 1.0];

/** Where the ink family flips: sunrise and sunset. Sections end on these. */
export const FLIPS = { sunrise: 0.12171, sunset: 0.48198 };

/**
 * Quantisation step for `--sky`. Every multiple of it is also a multiple of
 * the 0.0005 grid the contrast sweep in scripts/sky-tokens.py verifies, so the
 * AA guarantee carries over; the coarser step means a restyle every ~16px of
 * scroll instead of every ~4px. Neither flip position lies on either grid.
 */
export const GRID = 0.002;

/** Fixed positions for the pinned skies. Night is starlight, not aurora. */
export const PINS = { day: 0.3, night: 0.78 };

/** localStorage key, unchanged from earlier designs for preference carry-over. */
export const STORAGE_KEY = 'theme';

/**
 * The span of the arc each section covers, in document order. Adjacent
 * sections share a boundary value so the sky is continuous across them, and
 * the two flips fall exactly on section boundaries where only padding shows.
 */
export const ARC = {
  top: [0, FLIPS.sunrise],
  about: [FLIPS.sunrise, 0.3],
  projects: [0.3, 0.4],
  skills: [0.4, FLIPS.sunset],
  experience: [FLIPS.sunset, 0.66],
  publications: [0.66, 0.84],
  contact: [0.84, 1],
};
