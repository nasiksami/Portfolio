import { FiArrowDown, FiArrowRight } from 'react-icons/fi';

/**
 * An architecture diagram drawn as markup rather than an image: each lane is
 * a titled, ordered list of steps, laid out as a row of boxes joined by
 * arrows on wide screens and as a column on narrow ones. Because it is a
 * list, a screen reader announces the steps in order and a crawler reads the
 * component names; the arrows are decoration.
 *
 * `lanes` is [{ title, steps: [{ name, detail }] }]. `id` must be unique on
 * the page; it ties the figure to its caption.
 */
export default function FlowDiagram({ id, caption, lanes }) {
  return (
    <figure aria-labelledby={id + '-caption'} className="m-0">
      <div className="space-y-10">
        {lanes.map((lane) => (
          <div key={lane.title}>
            <h3 className="meta-sm mb-4 text-content-muted">{lane.title}</h3>
            <ol className="grid gap-7 lg:auto-cols-fr lg:grid-flow-col lg:gap-6">
              {lane.steps.map((step, index) => (
                <li
                  key={step.name}
                  className="relative rounded-[0.35rem] border border-edge bg-surface-raised p-4"
                >
                  <p className="meta-sm text-signal">{String(index + 1).padStart(2, '0')}</p>
                  <p className="mt-2 text-base font-semibold leading-snug text-content-primary">
                    {step.name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-content-secondary">{step.detail}</p>

                  {index < lane.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[1.4rem] left-1/2 -translate-x-1/2 text-content-muted lg:-right-[1.2rem] lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0"
                    >
                      <FiArrowDown className="h-4 w-4 lg:hidden" />
                      <FiArrowRight className="hidden h-4 w-4 lg:block" />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <figcaption id={id + '-caption'} className="mt-6 max-w-prose text-sm text-content-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
