import { useReducedMotion } from 'framer-motion';

/**
 * Edge-to-edge credential ticker.
 *
 * The track is duplicated so the CSS translate can loop seamlessly at -50%;
 * the clone is `aria-hidden` so the strings are announced exactly once. Under
 * reduced motion the track holds still and simply clips — the content is
 * decorative repetition of facts stated elsewhere on the page, so nothing is
 * lost by it not moving.
 */
export default function Marquee({ items, className = '' }) {
  const reduceMotion = useReducedMotion();

  const track = (
    <ul className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="meta px-6 py-3 text-content-secondary">{item}</span>
          <span aria-hidden="true" className="text-accent">
            ✳
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`overflow-hidden border-y border-edge ${className}`}>
      <div className={`flex w-max ${reduceMotion ? '' : 'animate-ticker'}`}>
        {track}
        <div aria-hidden="true" className="flex">
          {track}
        </div>
      </div>
    </div>
  );
}
