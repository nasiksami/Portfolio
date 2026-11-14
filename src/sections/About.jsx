import {
  HiOutlineChip,
  HiOutlineCode,
  HiOutlineCloud,
  HiOutlineDocumentText,
} from 'react-icons/hi';
import { availability, bio, bioLabels, focusAreas, profile, stats } from '../data/profile';
import { useCountUp } from '../hooks/useCountUp';
import { ARC } from '../sky';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Emphasis from '../components/ui/Emphasis';

const FOCUS_ICONS = {
  brain: HiOutlineChip,
  code: HiOutlineCode,
  cloud: HiOutlineCloud,
  document: HiOutlineDocumentText,
};


/**
 * A stat as a survey post: a line rising from the horizon with the number on
 * it. Each post is a valid dl group — a dt and a dd only — with the number
 * shown first through flex order so the markup stays term-then-description.
 */
function Stat({ stat, index }) {
  const [ref, display] = useCountUp(stat.value);

  return (
    <div ref={ref} className="relative flex flex-col border-l border-edge pl-5 pt-2 md:pl-6">
      <dt className="meta-sm order-2 mt-4 text-content-primary">
        <span aria-hidden="true" className="meta-sm absolute -top-7 left-0 text-content-muted">
          {String(index + 1).padStart(2, '0')}
        </span>
        {stat.label}
      </dt>
      <dd className="order-1 m-0">
        <span className="display d-stat block text-accent">
          {display}
        </span>
      </dd>
      <dd className="order-3 m-0 mt-2 max-w-[15rem] text-sm text-content-secondary">
        {stat.detail}
      </dd>
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

      {/* Profile: each paragraph is a ruled row with its heading beside it on
          wide screens and above it on narrow ones. */}
      <div className="mt-24 md:mt-32">
        <Reveal>
          <div className="mb-8 flex items-center gap-5">
            <h3 className="eyebrow shrink-0">Profile</h3>
            <span aria-hidden="true" className="h-px flex-1 bg-edge" />
          </div>
        </Reveal>

        <div className="border-b border-edge">
          {bio.map((paragraph, index) => (
            <Reveal
              key={paragraph}
              delay={index * 0.06}
              className="border-t border-edge first:border-t-0"
            >
              <div className="grid gap-3 py-8 md:py-10 lg:grid-cols-12 lg:gap-8">
                {bioLabels[index] && (
                  <h4 className="subhead text-content-primary lg:col-span-3">{bioLabels[index]}</h4>
                )}
                <p className="max-w-prose text-lg text-content-secondary lg:col-span-8 lg:col-start-5">
                  <Emphasis>{paragraph}</Emphasis>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* What I do. */}
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
                  </div>
                  <h4 className="display d-3 mt-10 text-content-primary transition-colors group-hover:text-accent">
                    {area.title}
                  </h4>
                  <p className="mt-4 max-w-prose text-base text-content-secondary">
                    <Emphasis>{area.description}</Emphasis>
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
