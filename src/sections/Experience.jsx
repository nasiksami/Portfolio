import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { experience } from '../data/experience';
import { education } from '../data/education';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Badge from '../components/ui/Badge';

const TYPE_TONE = {
  Industry: 'accent',
  Research: 'iris',
  Teaching: 'ember',
  Support: 'neutral',
};

/**
 * One node on the vertical timeline.
 *
 * Long bullet lists are collapsed behind a disclosure so the timeline stays
 * scannable; the first two points always show as a preview.
 */
function TimelineNode({ entry, index, isEducation = false }) {
  const [open, setOpen] = useState(index === 0);
  const reduceMotion = useReducedMotion();

  const title = isEducation ? entry.degree : entry.title;
  const points = entry.points ?? [];
  const preview = points.slice(0, 2);
  const hasMore = points.length > 2;
  const panelId = `timeline-panel-${isEducation ? 'edu' : 'exp'}-${index}`;

  return (
    <li className="relative pl-12 sm:pl-16">
      {/* Node marker */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1 flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border bg-surface-raised sm:h-11 sm:w-11 ${
          entry.current ? 'border-accent' : 'border-edge'
        }`}
      >
        {entry.logo ? (
          <img
            src={entry.logo}
            alt=""
            width="44"
            height="44"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="h-2 w-2 rounded-full bg-accent" />
        )}
      </span>

      <div className="card p-5 transition-colors duration-300 hover:border-accent/40">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-accent">{entry.period}</span>
          {entry.current && (
            <Badge tone="accent">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
              Current
            </Badge>
          )}
          {entry.type && <Badge tone={TYPE_TONE[entry.type] ?? 'neutral'}>{entry.type}</Badge>}
          {entry.grade && <Badge tone="iris">{entry.grade}</Badge>}
        </div>

        <h3 className="mt-2 text-base font-semibold text-content-primary sm:text-lg">
          {title}
        </h3>
        <p className="mt-0.5 text-sm text-content-secondary">
          {entry.org}
          {entry.location && (
            <span className="text-content-muted"> · {entry.location}</span>
          )}
        </p>

        {points.length > 0 && (
          <>
            <ul className="mt-3 space-y-1.5">
              {preview.map((point) => (
                <li
                  key={point}
                  className="flex gap-2.5 text-sm leading-relaxed text-content-secondary"
                >
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
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
                      className="space-y-1.5 overflow-hidden"
                    >
                      {points.slice(2).map((point) => (
                        <li
                          key={point}
                          className="flex gap-2.5 pt-1.5 text-sm leading-relaxed text-content-secondary"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
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
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg text-xs font-medium text-accent transition-opacity hover:opacity-75"
                >
                  {open ? 'Show less' : `Show ${points.length - 2} more`}
                  <FiChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
              </>
            )}
          </>
        )}
      </div>
    </li>
  );
}

function Timeline({ entries, isEducation }) {
  return (
    <ol className="relative space-y-6">
      {/* Connector rail, behind the node markers. */}
      <span
        aria-hidden="true"
        className="absolute bottom-4 left-[1.125rem] top-4 w-px bg-gradient-to-b from-accent/40 via-edge to-transparent sm:left-[1.375rem]"
      />
      {entries.map((entry, index) => (
        <Reveal key={`${entry.org}-${entry.period}`} delay={Math.min(index * 0.05, 0.3)}>
          <TimelineNode entry={entry} index={index} isEducation={isEducation} />
        </Reveal>
      ))}
    </ol>
  );
}

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Career"
      title="Experience & education"
      description="Nine roles across industry and academia, from full-stack engineering in Malaysia to leading an AI team in Canada."
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
        <div>
          <Reveal>
            <h3 className="mb-6 font-display text-lg font-semibold text-content-primary">
              Professional experience
            </h3>
          </Reveal>
          <Timeline entries={experience} isEducation={false} />
        </div>

        <div>
          <Reveal>
            <h3 className="mb-6 font-display text-lg font-semibold text-content-primary">
              Education
            </h3>
          </Reveal>
          <Timeline entries={education} isEducation />
        </div>
      </div>
    </Section>
  );
}
