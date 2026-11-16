import { skyProps } from '../../sky';
import Reveal from './Reveal';
import HorizonRule from '../HorizonRule';

/**
 * A Horizon section is three rows: sky, the rule, ground.
 *
 * The heading and anything passed as `sky` sit in the sky row, which is
 * transparent so the page background shows through. `children` sit on the
 * ground, which fills from the rule down and dissolves back into the sky at
 * its foot unless `ground="solid"`. `arc` is this section's stretch of the
 * day from ARC in src/sky.js: it fixes the palette and paints the sky once,
 * so scrolling never restyles the section.
 *
 * `headingLevel={1}` makes the title the page's h1, and `kicker` is a line of
 * small text above it; both are used by the case-study pages.
 */
export default function Section({
  id,
  index,
  label,
  title,
  description,
  arc,
  sky,
  backdrop,
  ground = 'fade',
  headingLevel = 2,
  kicker,
  children,
  className = '',
}) {
  const headingId = id + '-heading';
  // A case-study page's first section carries the page title, so it is an h1.
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      {...skyProps(arc)}
      className={['relative isolate', className].join(' ')}
    >
      <div aria-hidden="true" className="sky-stars pointer-events-none absolute inset-0 -z-10" />
      <div className="horizon-sky">
        {backdrop}
        <div className="shell pb-12 pt-24 md:pb-16 md:pt-32 lg:pt-40">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-2">
              <p className="eyebrow">
                <span className="text-signal">§{index}</span>
                <span>{label}</span>
              </p>
            </Reveal>

            <div className="lg:col-span-10 lg:col-start-3">
              {kicker && (
                <Reveal>
                  <div className="mb-5">{kicker}</div>
                </Reveal>
              )}
              <Reveal variant="rise">
                <Heading id={headingId} className="display d-1 text-content-primary">
                  {title}
                </Heading>
              </Reveal>
              {description && (
                <Reveal delay={0.08}>
                  <p className="mt-6 max-w-prose border-l border-accent pl-5 text-lg text-content-secondary md:mt-8">
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
