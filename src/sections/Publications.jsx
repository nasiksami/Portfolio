import { FiArrowUpRight } from 'react-icons/fi';
import { authorKey, publicationGroups, publications } from '../data/publications';
import { awards } from '../data/education';
import { ARC } from '../sky';
import { useSite } from '../site';
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

/**
 * The paper itself: its first page as a small sheet on a stack, or for a
 * book chapter the book's jacket with a spine. It repeats the title link's
 * destination, so it is hidden from assistive technology and skipped by the
 * keyboard; the title link is the accessible way in. Fixed aspect ratios
 * reserve the space before the lazy image arrives, so nothing shifts.
 */
function Cover({ pub }) {
  const { asset } = useSite();
  if (!pub.cover) return null;
  const isBook = pub.type === 'Book chapter';

  return (
    <a
      href={pub.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={-1}
      aria-hidden="true"
      className="relative block self-start [grid-area:cover]"
    >
      {!isBook && (
        <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[0.35rem] border border-edge bg-surface-overlay" />
      )}
      <span
        className={[
          'relative block overflow-hidden border border-edge bg-white transition-transform duration-300 group-hover:-translate-y-1',
          isBook ? 'aspect-[7/10] rounded-[0.15rem_0.35rem_0.35rem_0.15rem]' : 'aspect-[3/4] rounded-[0.35rem]',
        ].join(' ')}
      >
        <img
          src={asset(pub.cover)}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
        {isBook && (
          <span className="absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/40 to-transparent" />
        )}
      </span>
    </a>
  );
}

/** One paper: year, title linked to its official record, authors, venue. */
function Paper({ pub, number }) {
  return (
    <article className="group grid grid-cols-[minmax(0,1fr)_4.5rem] gap-x-5 gap-y-4 border-t border-edge py-7 [grid-template-areas:'year_cover'_'body_body'] md:grid-cols-[7rem_minmax(0,1fr)_8rem] md:gap-x-8 md:py-9 md:[grid-template-areas:'year_body_cover']">
      <div className="flex items-baseline gap-3 self-start [grid-area:year] md:block">
        <p className="display d-2 text-accent">{pub.year}</p>
        <p aria-hidden="true" className="meta-sm text-content-muted md:mt-3">
          [{number}]
        </p>
      </div>

      <div className="min-w-0 [grid-area:body]">
        <h4 className="subhead max-w-prose break-words text-content-primary">
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
        <p className="mt-2 text-sm italic leading-relaxed text-content-secondary">{pub.venue}</p>

        <p className="mt-4 flex flex-wrap items-center gap-2">
          <Tag tone="signal">{pub.year}</Tag>
          <Tag>{pub.label}</Tag>
          {pub.pdf && (
            <a
              href={pub.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw meta-sm tap ml-1 gap-1 text-accent"
            >
              PDF
              <span className="sr-only"> of {pub.title} (opens in a new tab)</span>
              <FiArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          )}
        </p>
      </div>

      <Cover pub={pub} />
    </article>
  );
}

/** The papers, grouped by type, each with its first page or jacket. */
function PaperList() {
  let number = 0;

  return (
    <div className="space-y-16 md:space-y-20">
      {publicationGroups.map((group) => {
        const papers = publications.filter((pub) => pub.type === group.type);
        if (!papers.length) return null;

        return (
          <section key={group.type} aria-labelledby={'pubs-' + group.type.toLowerCase().replace(/\s+/g, '-')}>
            <Reveal>
              <div className="mb-2 flex items-center gap-5">
                <h3
                  id={'pubs-' + group.type.toLowerCase().replace(/\s+/g, '-')}
                  className="eyebrow shrink-0"
                >
                  {group.heading}
                </h3>
                <span aria-hidden="true" className="h-px flex-1 bg-edge" />
              </div>
            </Reveal>

            <ol className="[&>li:first-child>article]:border-t-0">
              {papers.map((pub) => {
                number += 1;
                return (
                  <Reveal key={pub.title} as="li">
                    <Paper pub={pub} number={number} />
                  </Reveal>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}

/** A constellation: each award a star, joined by the hairlines. */
function AwardList() {
  return (
    <div className="mt-16 md:mt-24">
      <Reveal>
        <div className="mb-8 flex items-center gap-5">
          <h3 className="eyebrow shrink-0">Awards &amp; scholarships</h3>
          <span aria-hidden="true" className="h-px flex-1 bg-edge" />
        </div>
      </Reveal>

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
            <p className="text-base font-medium leading-snug text-content-primary">
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
    </div>
  );
}

/**
 * Awards sit in the sky, directly under the heading; the papers stand on the
 * ground below, grouped by type.
 */
export default function Publications() {
  return (
    <Section
      id="publications"
      index="03"
      label="Research"
      arc={ARC.publications}
      title="Publications & awards"
      description="Eight publications with 100+ citations: LLM and RAG research for telecom networks, network security, and applied deep learning."
      sky={<AwardList />}
    >
      <PaperList />
    </Section>
  );
}
