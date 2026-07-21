import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { experience } from '../data/experience';
import { education } from '../data/education';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Tag from '../components/ui/Tag';

/**
 * One row of the record ledger: period in the left column, the post in the
 * middle, and any bullets beyond the first two behind a disclosure so the
 * ledger stays scannable.
 */
function LedgerRow({ entry, index, isEducation = false }) {
  const [open, setOpen] = useState(index === 0);
  const reduceMotion = useReducedMotion();

  const title = isEducation ? entry.degree : entry.title;
  const points = entry.points ?? [];
  const preview = points.slice(0, 2);
  const hasMore = points.length > 2;
  const panelId = `record-panel-${isEducation ? 'edu' : 'exp'}-${index}`;

  return (
    <li className="grid gap-x-6 gap-y-4 py-8 md:grid-cols-[8.5rem_minmax(0,1fr)]">
      {/* Period rail */}
      <div className="flex items-center gap-3 md:block">
        <p className="meta-sm text-accent">{entry.period}</p>
        {entry.current && (
          <p className="meta-sm mt-2 flex items-center gap-2 text-content-primary">
            <span aria-hidden="true" className="h-2 w-2 bg-accent" />
            Current
          </p>
        )}
      </div>

      <div>
        <div className="flex items-start gap-4">
          {/* Brand marks ship with their own baked-in padding and several are
              wordmarks, so they need a generous tile and object-contain to stay
              legible. The uniform white plate keeps the set consistent across
              both the paper and ink surfaces. */}
          {entry.logo && (
            <span
              aria-hidden="true"
              className={`hidden h-12 w-12 shrink-0 items-center justify-center overflow-hidden border bg-white sm:flex ${
                entry.current ? 'border-accent' : 'border-edge'
              }`}
            >
              <img
                src={entry.logo}
                alt=""
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain p-1"
              />
            </span>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h4
                className="display d-3 text-content-primary"
                style={{ '--wdth': 96 }}
              >
                {title}
              </h4>
              {entry.type && <Tag>{entry.type}</Tag>}
              {entry.grade && <Tag tone="signal">{entry.grade}</Tag>}
            </div>

            <p className="mt-2 text-sm text-content-secondary">
              {entry.org}
              {entry.location && (
                <span className="text-content-muted"> · {entry.location}</span>
              )}
            </p>
          </div>
        </div>

        {points.length > 0 && (
          <>
            <ul className="mt-5 space-y-2">
              {preview.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm leading-relaxed text-content-secondary"
                >
                  <span aria-hidden="true" className="mt-2 h-1 w-2 shrink-0 bg-accent" />
                  {point}
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
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-2 overflow-hidden"
                    >
                      {points.slice(2).map((point) => (
                        <li
                          key={point}
                          className="flex gap-3 pt-2 text-sm leading-relaxed text-content-secondary"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-2 shrink-0 bg-accent"
                          />
                          {point}
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
                  className="meta-sm mt-5 inline-flex items-center gap-2 border border-edge px-3 py-2 text-content-secondary transition-colors hover:border-accent hover:text-accent"
                >
                  <FiPlus
                    className={`h-3 w-3 transition-transform duration-300 ${
                      open ? 'rotate-45' : ''
                    }`}
                    aria-hidden="true"
                  />
                  {open ? 'Show less' : `Show ${points.length - 2} more`}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </li>
  );
}

function Record({ heading, entries, isEducation }) {
  return (
    <div>
      <Reveal>
        <h3 className="meta border-b-2 border-content-primary pb-3 text-content-muted">
          {heading}
        </h3>
      </Reveal>
      <ol className="ledger">
        {entries.map((entry, index) => (
          <LedgerRow
            key={`${entry.org}-${entry.period}`}
            entry={entry}
            index={index}
            isEducation={isEducation}
          />
        ))}
      </ol>
    </div>
  );
}

export default function Experience() {
  return (
    <Section
      id="experience"
      index="04"
      label="Record"
      title="Experience & education"
      description="Nine roles across industry and academia, from full-stack engineering in Malaysia to leading an AI team in Canada."
      invert
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
        <Record heading="Professional experience" entries={experience} isEducation={false} />
        <Record heading="Education" entries={education} isEducation />
      </div>
    </Section>
  );
}
