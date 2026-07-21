import Reveal from './Reveal';
import ColumnRules from '../ColumnRules';

/**
 * Standard section shell for the specimen layout.
 *
 * Every section is a numbered record: a `§NN / LABEL` marker set in the left
 * gutter — rotated to run bottom-to-top on desktop, sticky so it tracks you
 * through the section, and flattened to an ordinary horizontal label on
 * mobile. It is one DOM node in both cases (CSS changes `writing-mode`), so
 * screen readers never hear it twice.
 *
 * `invert` flips the section to the opposite palette via `.invert-surface`.
 * Because that class is defined relative to the page theme (see index.css),
 * an inverted section is ink on a paper page and paper on an ink page — the
 * alternation down the page survives the theme toggle with no logic here.
 */
export default function Section({
  id,
  /** Two-digit record number, e.g. "01". */
  index,
  /** Gutter label, e.g. "About". */
  label,
  title,
  description,
  children,
  className = '',
  invert = false,
}) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative overflow-hidden py-12 md:py-24 lg:py-28 ${
        invert ? 'invert-surface' : ''
      } ${className}`}
    >
      <ColumnRules />

      <div className="shell relative">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-[3.5rem_minmax(0,1fr)] lg:gap-x-10 lg:gap-y-0">
          {/* Gutter marker */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="meta-sm flex items-center gap-3 text-content-muted lg:h-48 lg:[writing-mode:vertical-rl] lg:rotate-180">
              <span className="text-accent">§{index}</span>
              <span aria-hidden="true" className="h-px w-8 bg-edge lg:h-8 lg:w-px" />
              <span>{label}</span>
            </p>
          </div>

          {/* Body */}
          <div>
            <header className="mb-8 md:mb-16">
              <Reveal variant="rise">
                <h2 id={headingId} className="display d-1 text-content-primary">
                  {title}
                </h2>
              </Reveal>
              {/* The accent rule shares the description's Reveal rather than
                  getting its own. On its own it is a 2px-tall target, and
                  IntersectionObserver only samples at frame boundaries — a
                  jump-scroll (which is exactly what the nav links do) can move
                  it from below the viewport to above it between two frames, so
                  it never registers as intersecting and, with `once: true`,
                  stays invisible for good. */}
              <Reveal delay={0.08}>
                {description && (
                  <p className="mt-5 max-w-prose text-base leading-relaxed text-content-secondary md:text-lg">
                    {description}
                  </p>
                )}
                <span aria-hidden="true" className="mt-7 block h-0.5 w-24 bg-accent" />
              </Reveal>
            </header>

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
