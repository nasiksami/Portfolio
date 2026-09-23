import { skillGroups } from '../../data/skills';
import { projects } from '../../data/projects';

/**
 * Marks what matters inside running copy with one rule: metrics and named
 * technologies render as `.emph` (semibold, primary ink).
 *
 * The term list is built from the site's own data — every skill and every
 * project's stack — so the copy in src/data needs no markup and a new skill
 * is recognised everywhere automatically. Matching is case-sensitive, so
 * ordinary words ("git", "rest") are never caught.
 */
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const TERMS = [
  ...new Set([
    ...skillGroups.flatMap((group) => group.items.map((item) => item.name)),
    ...projects.flatMap((project) => project.tech),
  ]),
]
  .sort((a, b) => b.length - a.length)
  .map(escape);

// $35,000 · 47% · 88.4% · 10+ · 200+
const METRIC = String.raw`\$\d[\d,]*(?:\.\d+)?\+?|\d+(?:\.\d+)?%|\d+\+`;

const PATTERN = new RegExp(
  `(${METRIC}|(?<![\\w#+.])(?:${TERMS.join('|')})(?![\\w#+]))`,
  'g'
);

export default function Emphasis({ children }) {
  if (typeof children !== 'string') return children;
  const parts = children.split(PATTERN);
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="emph">
        {part}
      </strong>
    ) : (
      part
    )
  );
}
