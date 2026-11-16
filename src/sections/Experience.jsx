import { experience } from '../data/experience';
import { education } from '../data/education';
import { ARC } from '../sky';
import { useSite } from '../site';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Tag from '../components/ui/Tag';
import Emphasis from '../components/ui/Emphasis';

/**
 * One entry on the plumb line. Everything an entry says is in the markup —
 * nothing is tucked behind a "show more" — so the page reads the same to a
 * visitor, a crawler and a screen reader.
 */
function TimelineEntry({ entry, isEducation = false }) {
  const { asset } = useSite();
  const title = isEducation ? entry.degree : entry.title;
  const points = entry.points ?? [];
  const roles = entry.roles ?? [];

  return (
    <li className="relative pb-12 pl-8 last:pb-0 md:pl-12">
      {/* Node on the plumb line. */}
      <span
        aria-hidden="true"
        className={[
          'absolute -left-[0.3rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-surface-raised',
          entry.current ? 'bg-signal' : 'bg-content-muted',
        ].join(' ')}
      />

      <div className="grid gap-4 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-8">
        <div>
          <p className="meta-sm text-accent">{entry.period}</p>
          {entry.current && (
            <p className="meta-sm mt-3 flex items-center gap-2 text-content-primary">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
              Current
            </p>
          )}
        </div>

        <article className="group">
          <div className="flex items-start gap-4">
            {entry.logo && (
              <span
                aria-hidden="true"
                className={[
                  'flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-white md:h-16 md:w-16',
                  entry.current ? 'border-signal' : 'border-edge',
                ].join(' ')}
              >
                <img
                  src={asset(entry.logo)}
                  alt=""
                  width="64"
                  height="64"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain p-2"
                />
              </span>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h4 className="display d-3 text-content-primary transition-colors group-hover:text-accent">
                  {title}
                </h4>
                {entry.type && <Tag>{entry.type}</Tag>}
                {entry.grade && <Tag tone="signal">{entry.grade}</Tag>}
              </div>
              <p className="mt-3 text-base text-content-secondary">
                {entry.org}
                {entry.location && <span className="text-content-muted"> · {entry.location}</span>}
              </p>
            </div>
          </div>

          {entry.summary && (
            <p className="mt-6 max-w-prose text-base text-content-secondary">{entry.summary}</p>
          )}

          {points.length > 0 && (
            <ul className={entry.summary ? 'mt-4 space-y-3' : 'mt-6 space-y-3'}>
              {points.map((point) => (
                <li key={point} className="flex max-w-prose gap-3 text-base text-content-secondary">
                  <span aria-hidden="true" className="mt-[0.75em] h-1 w-3 shrink-0 bg-accent" />
                  <span>
                    <Emphasis>{point}</Emphasis>
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Several titles held at one organisation, each with its dates. */}
          {roles.length > 0 && (
            <ul className="mt-6 max-w-prose border-b border-edge">
              {roles.map((role) => (
                <li
                  key={role.title}
                  className="grid gap-x-6 gap-y-1 border-t border-edge py-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline"
                >
                  <span className="text-base text-content-primary">
                    {role.title}
                    {role.note && (
                      <span className="text-content-secondary">
                        {' '}
                        · <Emphasis>{role.note}</Emphasis>
                      </span>
                    )}
                  </span>
                  <span className="meta-sm text-content-muted">{role.period}</span>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>
    </li>
  );
}

/**
 * A record hangs from a plumb line. `fromHorizon` pulls the line up through
 * the ground's top padding so it visibly drops from the rule.
 */
function Record({ heading, entries, isEducation, fromHorizon = false }) {
  return (
    <div className={fromHorizon ? '-mt-14 md:-mt-20' : ''}>
      <div
        className={[
          'border-l border-edge',
          fromHorizon ? 'pt-14 md:pt-20' : '',
        ].join(' ')}
      >
        <Reveal className="mb-10 pl-8 md:pl-12">
          <div className="flex items-center gap-4">
            <h3 className="eyebrow shrink-0">{heading}</h3>
            <span aria-hidden="true" className="h-px flex-1 bg-edge" />
          </div>
        </Reveal>
        <ol>
          {entries.map((entry) => (
            <TimelineEntry
              key={entry.org + '-' + entry.period}
              entry={entry}
              isEducation={isEducation}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      label="Record"
      arc={ARC.experience}
      title="Experience & education"
      description="Healthcare AI in Canada, telecom ML research at the University of Regina, and software engineering in Malaysia."
    >
      <div className="grid gap-20 xl:grid-cols-[1.55fr_1fr] xl:gap-16">
        <Record heading="Professional experience" entries={experience} isEducation={false} fromHorizon />
        <div className="xl:sticky xl:top-28 xl:self-start">
          <Record heading="Education" entries={education} isEducation />
        </div>
      </div>
    </Section>
  );
}
