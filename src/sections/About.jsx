import {
  HiOutlineChip,
  HiOutlineCode,
  HiOutlineCloud,
  HiOutlineDocumentText,
} from 'react-icons/hi';
import { availability, bio, focusAreas, profile, stats } from '../data/profile';
import { useCountUp } from '../hooks/useCountUp';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import './About.css';

const FOCUS_ICONS = {
  brain: HiOutlineChip,
  code: HiOutlineCode,
  cloud: HiOutlineCloud,
  document: HiOutlineDocumentText,
};

function Stat({ stat, index }) {
  const [ref, display] = useCountUp(stat.value);

  return (
    <div ref={ref} className="stat-orbit group relative min-h-[14rem] overflow-hidden p-5 md:p-7">
      <span
        aria-hidden="true"
        className="absolute right-5 top-5 font-mono text-[0.6rem] tracking-[0.2em] text-content-muted"
      >
        {'0' + (index + 1)}
      </span>
      <dt className="meta-sm max-w-[9rem] text-content-muted">{stat.label}</dt>
      <dd className="mt-10">
        <span className="display block text-[clamp(3.4rem,7vw,6.6rem)] leading-none text-accent transition-transform duration-500 group-hover:-translate-y-1">
          {display}
        </span>
        <span className="mt-5 block max-w-[13rem] text-sm leading-relaxed text-content-secondary">
          {stat.detail}
        </span>
      </dd>
      <span
        aria-hidden="true"
        className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full border border-edge/70 transition-transform duration-700 group-hover:scale-125"
      />
    </div>
  );
}

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      label="About"
      title={profile.tagline}
      description={availability}
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <p className="eyebrow lg:col-span-3 lg:self-start">About</p>

        <div className="route-line space-y-0 pl-9 lg:col-span-8 lg:col-start-5">
          {bio.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 0.08}>
              <div className="route-node border-t border-edge/70 py-7 first:border-t-0 md:py-10">
                <p aria-hidden="true" className="meta-sm mb-4 text-signal">
                  ¶{String(index + 1).padStart(2, '0')}
                </p>
                <p className="about-prose max-w-3xl text-lg leading-relaxed text-content-secondary md:text-2xl md:leading-relaxed">
                  {paragraph}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.1}>
        <dl className="stat-band mt-16 grid grid-cols-2 overflow-hidden rounded-[2rem] border border-edge/80 bg-surface-raised/50 md:mt-24 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Stat key={stat.label} stat={stat} index={index} />
          ))}
        </dl>
      </Reveal>

      <div className="mt-20 md:mt-28">
        <Reveal>
          <div className="mb-8 flex items-center gap-5">
            <h3 className="eyebrow shrink-0">What I do</h3>
            <span aria-hidden="true" className="h-px flex-1 bg-edge/70" />
          </div>
        </Reveal>

        <ol className="focus-map grid border-b border-edge/70 md:grid-cols-2">
          {focusAreas.map((area, index) => {
            const Icon = FOCUS_ICONS[area.icon] ?? HiOutlineChip;
            return (
              <Reveal key={area.title} as="li" delay={index * 0.07}>
                <div className="group relative h-full border-t border-edge/70 p-6 md:min-h-[18rem] md:p-9 md:[&:nth-child(even)]:border-l">
                  <div className="flex items-start justify-between gap-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/70 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-on-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span aria-hidden="true" className="meta-sm text-content-muted">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="display d-3 mt-10 text-content-primary transition-colors group-hover:text-accent">
                    {area.title}
                  </h4>
                  <p className="mt-5 max-w-prose text-sm leading-relaxed text-content-secondary md:text-base">
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
