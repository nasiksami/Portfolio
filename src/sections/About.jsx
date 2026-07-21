import { HiOutlineChip, HiOutlineCode, HiOutlineCloud, HiOutlineDocumentText } from 'react-icons/hi';
import { availability, bio, focusAreas, profile, stats } from '../data/profile';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';

const FOCUS_ICONS = {
  brain: HiOutlineChip,
  code: HiOutlineCode,
  cloud: HiOutlineCloud,
  document: HiOutlineDocumentText,
};

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={profile.tagline}
      description={availability}
    >
      {/* Bio */}
      <div className="mx-auto max-w-3xl">
        {bio.map((paragraph, index) => (
          <Reveal key={index} delay={index * 0.08}>
            <p className="mb-5 text-base leading-relaxed text-content-secondary md:text-lg">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>

      {/* Stat tiles */}
      <Reveal delay={0.1}>
        <dl className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card group relative overflow-hidden p-5 transition-colors duration-300 hover:border-accent/40"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block bg-gradient-to-br from-accent to-iris bg-clip-text font-display text-3xl font-bold text-transparent sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1.5 block text-sm font-medium text-content-primary">
                  {stat.label}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-content-muted">
                  {stat.detail}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* What I do */}
      <div className="mt-16">
        <Reveal>
          <h3 className="mb-8 text-center font-display text-xl font-semibold text-content-primary sm:text-2xl">
            What I do
          </h3>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {focusAreas.map((area, index) => {
            const Icon = FOCUS_ICONS[area.icon] ?? HiOutlineChip;
            return (
              <Reveal key={area.title} delay={index * 0.08}>
                <article className="card h-full p-6 transition-colors duration-300 hover:border-accent/40">
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="mb-2 text-base font-semibold text-content-primary">
                    {area.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-content-secondary">
                    {area.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
