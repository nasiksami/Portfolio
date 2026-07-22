import Reveal from './Reveal';
import ColumnRules from '../ColumnRules';

/**
 * Shared research-atlas section: a sticky coordinate marker and an offset
 * editorial heading sit on top of the global mapping field.
 */
export default function Section({
  id,
  index,
  label,
  title,
  description,
  children,
  className = '',
  invert = false,
}) {
  const headingId = id + '-heading';

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={[
        'relative isolate overflow-hidden py-20 md:py-28 lg:py-36',
        invert ? 'invert-surface' : '',
        className,
      ].join(' ')}
    >
      <ColumnRules />
      <span aria-hidden="true" className="section-curve" />

      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-[8rem_minmax(0,1fr)] lg:gap-12">
          <aside className="lg:sticky lg:top-28 lg:self-start" aria-label={label + ' section'}>
            <p className="meta flex items-center gap-3 text-content-muted lg:flex-col lg:items-start">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent text-accent">
                {index}
              </span>
              <span className="h-px w-8 bg-edge lg:h-10 lg:w-px lg:translate-x-5" aria-hidden="true" />
              <span className="lg:[writing-mode:vertical-rl]">{label}</span>
            </p>
          </aside>

          <div>
            <header className="mb-12 grid gap-6 md:mb-20 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-end xl:gap-16">
              <Reveal variant="rise">
                <h2 id={headingId} className="display d-1 text-content-primary">
                  {title}
                </h2>
              </Reveal>

              {description && (
                <Reveal delay={0.08}>
                  <p className="border-l border-accent pl-5 text-base leading-relaxed text-content-secondary md:text-lg">
                    {description}
                  </p>
                </Reveal>
              )}
            </header>

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
