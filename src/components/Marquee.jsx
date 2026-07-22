import { useReducedMotion } from 'framer-motion';

/** Continuous evidence band assembled entirely from content shown elsewhere. */
export default function Marquee({ items, className = '' }) {
  const reduceMotion = useReducedMotion();

  const track = (
    <ul className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="meta px-5 py-3 text-content-secondary md:px-8">{item}</span>
          <span aria-hidden="true" className="relative h-2 w-2 rounded-full bg-signal">
            <span className="absolute inset-[-5px] rounded-full border border-signal/40" />
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={[
        'overflow-hidden border-y border-edge/70 bg-surface-raised/45 backdrop-blur-sm',
        className,
      ].join(' ')}
    >
      <div className={['flex w-max', reduceMotion ? '' : 'animate-ticker'].join(' ')}>
        {track}
        <div aria-hidden="true" className="flex">
          {track}
        </div>
      </div>
    </div>
  );
}
