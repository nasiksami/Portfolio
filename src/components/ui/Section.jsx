import Reveal from './Reveal';
import HorizonRule from '../HorizonRule';

/**
 * A Horizon section is three rows: sky, the rule, ground.
 *
 * The heading and anything passed as `sky` sit in the sky row, which is
 * transparent so the page background shows through. `children` sit on the
 * ground, which fills from the rule down and dissolves back into the sky at
 * its foot unless `ground="solid"`. `arc` is the [in, out] span of the day
 * this section covers; adjacent sections share a boundary value so the sky
 * is continuous across them (see src/sky.js).
 */
export default function Section({
  id,
  index,
  label,
  title,
  description,
  arc,
  sky,
  ground = 'fade',
  children,
  className = '',
}) {
  const headingId = id + '-heading';
  const [skyIn, skyOut] = arc ?? [];

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      data-sky-in={skyIn}
      data-sky-out={skyOut}
      className={['relative', className].join(' ')}
    >
      <div className="horizon-sky">
        <div className="shell pb-12 pt-24 md:pb-16 md:pt-32 lg:pt-40">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-2">
              <p className="eyebrow">
                <span className="text-signal">§{index}</span>
                <span>{label}</span>
              </p>
            </Reveal>

            <div className="lg:col-span-10 lg:col-start-3">
              <Reveal variant="rise">
                <h2 id={headingId} className="display d-1 text-content-primary">
                  {title}
                </h2>
              </Reveal>
              {description && (
                <Reveal delay={0.08}>
                  <p className="mt-6 max-w-prose border-l border-accent pl-5 text-base leading-relaxed text-content-secondary md:mt-8 md:text-lg">
                    {description}
                  </p>
                </Reveal>
              )}
            </div>
          </div>

          {sky}
        </div>
      </div>

      <HorizonRule />

      <div className={['horizon-ground', ground === 'solid' ? 'horizon-ground--solid' : ''].join(' ')}>
        <div className="shell pb-24 pt-14 md:pb-32 md:pt-20">{children}</div>
      </div>
    </section>
  );
}
