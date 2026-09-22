import { FiArrowUpRight } from 'react-icons/fi';
import { authorKey, publications } from '../data/publications';
import { awards } from '../data/education';
import { ARC } from '../sky';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Tag from '../components/ui/Tag';

function AuthorList({ authors }) {
  const parts = authors.split(authorKey);
  return (
    <span>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && (
            <strong className="font-semibold text-content-primary">{authorKey}</strong>
          )}
        </span>
      ))}
    </span>
  );
}

/** The papers, set in the sky as the first stars of the evening. */
function PaperList() {
  return (
    <div className="mt-16 md:mt-24">
      <Reveal>
        <div className="mb-8 flex items-center gap-5">
          <h3 className="eyebrow shrink-0">Publications</h3>
          <span aria-hidden="true" className="h-px flex-1 bg-edge" />
        </div>
      </Reveal>

      <ol>
        {publications.map((pub, index) => (
          <Reveal key={pub.title} as="li" delay={Math.min(index * 0.05, 0.25)}>
            <article className="group grid gap-4 border-t border-edge py-7 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8 md:py-9">
              <div className="flex items-baseline gap-3 md:block">
                <p className="display text-5xl leading-none text-accent md:text-6xl">{pub.year}</p>
                <p aria-hidden="true" className="meta-sm text-content-muted md:mt-3">
                  [{index + 1}]
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold leading-snug text-content-primary md:text-xl">
                  <a
                    href={pub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link transition-colors hover:text-accent"
                  >
                    {pub.title}
                    <FiArrowUpRight
                      className="ml-1.5 inline h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      aria-hidden="true"
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </h4>

                <p className="mt-3 text-sm leading-relaxed text-content-muted">
                  <AuthorList authors={pub.authors} />
                </p>
                <p className="mt-2 text-sm italic leading-relaxed text-content-secondary">
                  {pub.venue}
                </p>

                <p className="mt-4 flex flex-wrap items-center gap-2">
                  <Tag tone="signal">{pub.year}</Tag>
                  <Tag>{pub.type}</Tag>
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export default function Publications() {
  return (
    <Section
      id="publications"
      index="05"
      label="Research"
      arc={ARC.publications}
      title="Publications & awards"
      description="Peer-reviewed work in telecom AI, network security, and applied deep learning."
      sky={<PaperList />}
    >
      <Reveal>
        <div className="mb-8 flex items-center gap-5">
          <h3 className="eyebrow shrink-0">Awards &amp; scholarships</h3>
          <span aria-hidden="true" className="h-px flex-1 bg-edge" />
        </div>
      </Reveal>

      {/* A constellation: each award a star, joined by the hairlines. */}
      <ol className="grid border-b border-edge md:grid-cols-2 lg:grid-cols-3">
        {awards.map((award, index) => (
          <Reveal
            key={award.title}
            as="li"
            delay={Math.min(index * 0.05, 0.25)}
            className="relative border-t border-edge p-5 pt-9 md:min-h-[11rem] md:p-6 md:pt-10 md:[li:nth-child(even)_&]:border-l lg:[li:nth-child(even)_&]:border-l-0 lg:[li:not(:nth-child(3n+1))_&]:border-l"
          >
            <span aria-hidden="true" className="absolute left-5 top-4 flex items-center gap-2 md:left-6">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_0_4px_rgb(var(--signal-rgb)/0.18)]" />
              <span className="meta-sm text-content-muted">{String(index + 1).padStart(2, '0')}</span>
            </span>
            <p className="text-sm font-medium leading-snug text-content-primary md:text-base">
              {award.href ? (
                <a
                  href={award.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw inline transition-colors hover:text-accent"
                >
                  {award.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                award.title
              )}
            </p>
            {award.detail && <p className="mt-2 text-sm text-content-secondary">{award.detail}</p>}
            {award.period && <p className="meta-sm mt-3 text-content-muted">{award.period}</p>}
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
