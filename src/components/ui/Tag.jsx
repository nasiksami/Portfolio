const TONES = {
  // Differentiation comes from rule weight and the single signal colour, not
  // from a spread of tinted hues — the palette is monochrome plus vermilion.
  plain: 'border-edge text-content-secondary',
  signal: 'border-accent text-accent',
  solid: 'border-accent bg-accent text-on-accent',
};

/** Rule-boxed monospace label: tech tags, categories, record types, levels. */
export default function Tag({ children, tone = 'plain', className = '' }) {
  return (
    <span
      className={`meta-sm inline-flex items-center border px-2 py-1 ${
        TONES[tone] ?? TONES.plain
      } ${className}`}
    >
      {children}
    </span>
  );
}
