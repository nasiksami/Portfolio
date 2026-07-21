import { HiOutlineChip, HiOutlineCode, HiOutlineCloud, HiOutlineDocumentText } from 'react-icons/hi';
import { availability, bio, focusAreas, profile, stats } from '../data/profile';
import { useCountUp } from '../hooks/useCountUp';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';

const FOCUS_ICONS = {
  brain: HiOutlineChip,
  code: HiOutlineCode,
  cloud: HiOutlineCloud,
  document: HiOutlineDocumentText,
};

/** One cell of the stat band. Counts up when it scrolls into view. */
function Stat({ stat }) {
  const [ref, display] = useCountUp(stat.value);

  return (
    <div ref={ref} className="px-4 py-6 sm:px-5 md:px-6 md:py-8">
      <dt className="meta-sm text-content-muted">{stat.label}</dt>
      <dd>
        <span
          className="display mt-4 block text-[clamp(2.25rem,5vw,4rem)] text-accent"
          style={{ '--wdth': 88, '--wght': 800 }}
        >
          {display}
        </span>
        <span className="mt-3 block text-sm leading-relaxed text-content-secondary">
          {stat.detail}
        </span>
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
      title={profile.tagline}
      description={availability}
    >
      {/* ── Bio, offset into the right two-thirds with hanging paragraph
             indices in the margin, the way a printed monograph numbers its
             body copy. ─────────────────────────────────────────────────── */}
      <div className="ledger">
        {bio.map((paragraph, index) => (
          <Reveal key={paragraph} delay={index * 0.08}>
            <div className="grid gap-x-6 gap-y-2 py-5 md:grid-cols-[4rem_minmax(0,1fr)] md:py-6">
              <p aria-hidden="true" className="meta-sm text-accent">
                ¶{String(index + 1).padStart(2, '0')}
              </p>
              <p className="max-w-prose text-base leading-relaxed text-content-secondary md:text-lg">
                {paragraph}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* ── Stat band ────────────────────────────────────────────────────── */}
      <Reveal delay={0.1}>
        <dl className="stat-band mt-14 grid md:mt-20 grid-cols-2 border-y-2 border-content-primary lg:grid-cols-4">
          {stats.map((stat) => (
            <Stat key={stat.label} stat={stat} />
          ))}
        </dl>
      </Reveal>

      {/* ── What I do ────────────────────────────────────────────────────── */}
      <div className="mt-14 md:mt-20">
        <Reveal>
          <h3 className="meta mb-6 text-content-muted">What I do</h3>
        </Reveal>

        <ol className="ledger">
          {focusAreas.map((area, index) => {
            const Icon = FOCUS_ICONS[area.icon] ?? HiOutlineChip;
            return (
              <Reveal key={area.title} as="li" delay={index * 0.07}>
                <div className="group grid gap-x-6 gap-y-2 py-5 md:grid-cols-[4rem_18rem_minmax(0,1fr)] md:gap-y-3 md:py-8">
                  <p aria-hidden="true" className="meta-sm text-content-muted">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h4 className="display d-3 flex items-start gap-3 text-content-primary transition-colors group-hover:text-accent">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                    {area.title}
                  </h4>
                  <p className="max-w-prose text-sm leading-relaxed text-content-secondary md:text-base">
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
