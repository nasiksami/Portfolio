import {
  HiOutlineChip,
  HiOutlineCode,
  HiOutlineCloud,
  HiOutlineDocumentText,
} from 'react-icons/hi';
import { availability, bio, focusAreas, profile, stats } from '../data/profile';
import { useCountUp } from '../hooks/useCountUp';
import { ARC } from '../sky';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';

const FOCUS_ICONS = {
  brain: HiOutlineChip,
  code: HiOutlineCode,
  cloud: HiOutlineCloud,
  document: HiOutlineDocumentText,
};

// A section of prairie is surveyed into four quarters. The four focus areas
// take the same labels.
const QUARTERS = ['NW', 'NE', 'SW', 'SE'];

/** A stat as a survey post: a line rising from the horizon with the number on it. */
function Stat({ stat, index }) {
  const [ref, display] = useCountUp(stat.value);

  return (
    <div ref={ref} className="relative border-l border-edge pl-5 pt-2 md:pl-6">
      <span aria-hidden="true" className="meta-sm absolute -top-7 left-0 text-content-muted">
        {String(index + 1).padStart(2, '0')}
      </span>
      <dd className="display text-[clamp(3rem,6.5vw,6rem)] leading-none text-accent">{display}</dd>
      <dt className="meta-sm mt-4 text-content-primary">{stat.label}</dt>
      <p className="mt-2 max-w-[13rem] text-sm leading-relaxed text-content-secondary">
        {stat.detail}
      </p>
    </div>
  );
}

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      label="About"
      arc={ARC.about}
      title={profile.tagline}
      description={availability}
    >
      {/* Posts stand just below the horizon. */}
      <Reveal>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-14 pt-6 lg:grid-cols-4 lg:gap-x-8">
          {stats.map((stat, index) => (
            <Stat key={stat.label} stat={stat} index={index} />
          ))}
        </dl>
      </Reveal>

      {/* Field notes. */}
      <div className="mt-24 grid gap-10 md:mt-32 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-3">
          <p className="eyebrow">Field notes</p>
        </Reveal>
        <div className="lg:col-span-8 lg:col-start-5">
          {bio.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 0.08}>
              <p
                className={[
                  'max-w-3xl leading-relaxed text-content-secondary',
                  index === 0
                    ? 'text-xl text-content-primary md:text-2xl md:leading-snug'
                    : 'mt-8 text-base md:text-lg',
                ].join(' ')}
              >
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* The quarter section. */}
      <div className="mt-24 md:mt-32">
        <Reveal>
          <div className="mb-8 flex items-center gap-5">
            <h3 className="eyebrow shrink-0">What I do</h3>
            <span aria-hidden="true" className="h-px flex-1 bg-edge" />
          </div>
        </Reveal>

        <ol className="grid border-b border-edge md:grid-cols-2">
          {focusAreas.map((area, index) => {
            const Icon = FOCUS_ICONS[area.icon] ?? HiOutlineChip;
            return (
              <Reveal key={area.title} as="li" delay={index * 0.07} className="group">
                <div className="relative h-full border-t border-edge p-6 md:min-h-[17rem] md:p-9 md:[li:nth-child(even)_&]:border-l">
                  <div className="flex items-start justify-between gap-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/60 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span aria-hidden="true" className="meta-sm text-content-muted">
                      {QUARTERS[index] ?? String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="display d-3 mt-10 text-content-primary transition-colors group-hover:text-accent">
                    {area.title}
                  </h4>
                  <p className="mt-4 max-w-prose text-sm leading-relaxed text-content-secondary md:text-base">
                    {area.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
