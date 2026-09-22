const TONES = {
  plain: 'border-edge text-content-secondary',
  signal: 'border-signal/70 text-signal',
  solid: 'border-signal bg-signal text-on-signal',
};

/** Compact label used for stacks, categories, years, and levels. */
export default function Tag({ children, tone = 'plain', className = '' }) {
  return (
    <span
      className={[
        'meta-sm inline-flex items-center rounded-[0.3rem] border px-2 py-1',
        TONES[tone] ?? TONES.plain,
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
