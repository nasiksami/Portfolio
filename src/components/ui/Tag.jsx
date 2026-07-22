const TONES = {
  plain: 'border-edge/80 bg-surface-raised/45 text-content-secondary',
  signal: 'border-signal/60 bg-signal/10 text-signal',
  solid: 'border-signal bg-signal text-on-signal',
};

/** Compact technical label used for stacks, categories, years, and levels. */
export default function Tag({ children, tone = 'plain', className = '' }) {
  return (
    <span
      className={[
        'meta-sm inline-flex items-center rounded-full border px-2.5 py-1',
        TONES[tone] ?? TONES.plain,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
