import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { experience } from '../data/experience';
import { education } from '../data/education';
import { ARC } from '../sky';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Tag from '../components/ui/Tag';
import Emphasis from '../components/ui/Emphasis';

function TimelineEntry({ entry, index, isEducation = false }) {
  const [open, setOpen] = useState(index === 0);
  const reduceMotion = useReducedMotion();
  const title = isEducation ? entry.degree : entry.title;
  const points = entry.points ?? [];
  const preview = points.slice(0, 2);
  const hasMore = points.length > 2;
  const panelId = 'record-panel-' + (isEducation ? 'edu' : 'exp') + '-' + String(index);

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
                  'flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-white',
                  entry.current ? 'border-signal' : 'border-edge',
                ].join(' ')}
              >
                <img
                  src={entry.logo}
                  alt=""
                  width="44"
                  height="44"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain p-1.5"
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

          {points.length > 0 && (
            <>
              <ul className="mt-6 space-y-3">
                {preview.map((point) => (
                  <li key={point} className="flex max-w-prose gap-3 text-base text-content-secondary">
                    <span aria-hidden="true" className="mt-[0.75em] h-1 w-3 shrink-0 bg-accent" />
                    <span>
                      <Emphasis>{point}</Emphasis>
                    </span>
                  </li>
                ))}
              </ul>

              {hasMore && (
                <>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.ul
                        id={panelId}
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-3 overflow-hidden"
                      >
                        {points.slice(2).map((point) => (
                          <li
                            key={point}
                            className="flex max-w-prose gap-3 pt-3 text-base text-content-secondary"
                          >
                            <span aria-hidden="true" className="mt-[0.75em] h-1 w-3 shrink-0 bg-accent" />
                            <span>
                              <Emphasis>{point}</Emphasis>
                            </span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="meta-sm tap mt-5 gap-2 rounded-[0.35rem] border border-edge px-3.5 py-2 text-content-secondary transition-colors hover:border-content-primary hover:text-content-primary"
                  >
                    <FiPlus
                      className={[
                        'h-3 w-3 transition-transform duration-300',
                        open ? 'rotate-45' : '',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                    {open ? 'Show less' : 'Show ' + (points.length - 2) + ' more'}
                  </button>
                </>
              )}
            </>
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
          {entries.map((entry, index) => (
            <TimelineEntry
              key={entry.org + '-' + entry.period}
              entry={entry}
              index={index}
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
      description="Nine roles across industry and academia, from full-stack engineering in Malaysia to leading an AI team in Canada."
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
