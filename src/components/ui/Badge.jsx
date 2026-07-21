const TONES = {
  neutral: 'border-edge bg-surface-overlay/70 text-content-secondary',
  accent: 'border-accent/30 bg-accent/10 text-accent',
  iris: 'border-iris/30 bg-iris/10 text-iris',
  ember: 'border-ember/30 bg-ember/10 text-ember',
};

/** Small pill for tech tags, categories, and proficiency levels. */
export default function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${TONES[tone] ?? TONES.neutral} ${className}`}
    >
      {children}
    </span>
  );
}
