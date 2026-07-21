/**
 * The visible 12-column hairline grid.
 *
 * Rendered as real children of a `.frame` grid rather than as a background
 * gradient, so the rules land exactly on the same tracks the content is laid
 * out against at any viewport width — including inside the fluid `.shell`
 * padding. Colour comes from the `--edge` token, so a rule inside an inverted
 * section inverts with it for free.
 *
 * Hidden below `md`: at phone widths twelve rules is noise, not structure.
 */
export default function ColumnRules({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 hidden md:block ${className}`}
    >
      <div className="shell h-full">
        <div className="frame h-full">
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className="h-full border-l border-edge/45" />
          ))}
        </div>
      </div>
    </div>
  );
}
