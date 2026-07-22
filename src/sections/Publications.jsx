import { FiArrowUpRight } from 'react-icons/fi';
import { authorKey, publications } from '../data/publications';
import { awards } from '../data/education';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Tag from '../components/ui/Tag';
import './Publications.css';

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

export default function Publications() {
  return (
    <Section
      id="publications"
      index="05"
      label="Research"
      title="Publications & awards"
      description="Peer-reviewed work in telecom AI, network security, and applied deep learning."
    >
      <div className="grid gap-20 xl:grid-cols-[1.45fr_0.75fr] xl:gap-16">
        <div>
          <Reveal>
            <div className="mb-8 flex items-center gap-5">
              <h3 className="eyebrow shrink-0">Publications</h3>
              <span aria-hidden="true" className="h-px flex-1 bg-edge/70" />
            </div>
          </Reveal>

          <ol className="publication-list border-b border-edge/70">
            {publications.map((pub, index) => (
              <Reveal key={pub.title} as="li" delay={Math.min(index * 0.05, 0.25)}>
                <article
                  data-year={pub.year}
                  className="publication-entry group relative grid gap-5 overflow-hidden border-t border-edge/70 py-7 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-8 md:py-10"
                >
                  <div className="relative z-10 flex items-baseline gap-3 md:block">
                    <p className="display text-5xl leading-none text-accent md:text-6xl">
                      {pub.year}
                    </p>
                    <p aria-hidden="true" className="meta-sm mt-3 text-content-muted">
                      [{index + 1}]
                    </p>
                  </div>

                  <div className="relative z-10">
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

                    <p className="mt-4 text-sm leading-relaxed text-content-muted">
                      <AuthorList authors={pub.authors} />
                    </p>
                    <p className="mt-2 text-sm italic leading-relaxed text-content-secondary">
                      {pub.venue}
                    </p>

                    <p className="mt-5 flex flex-wrap items-center gap-2">
                      <Tag tone="signal">{pub.year}</Tag>
                      <Tag>{pub.type}</Tag>
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="xl:sticky xl:top-28 xl:self-start">
          <Reveal>
            <div className="mb-8 flex items-center gap-5">
              <h3 className="eyebrow shrink-0">Awards &amp; scholarships</h3>
              <span aria-hidden="true" className="h-px flex-1 bg-edge/70" />
            </div>
          </Reveal>

          <ul className="award-orbit">
            {awards.map((award, index) => (
              <Reveal
                key={award.title}
                as="li"
                delay={Math.min(index * 0.05, 0.25)}
                className="award-orbit__item relative pb-7 pl-9 last:pb-0"
              >
                <span aria-hidden="true" className="award-orbit__node">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="rounded-[1.5rem] border border-edge/70 bg-surface-raised/45 p-5">
                  <p className="text-sm font-medium leading-snug text-content-primary">
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
                  {award.detail && (
                    <p className="mt-2 text-sm text-content-secondary">{award.detail}</p>
                  )}
                  {award.period && (
                    <p className="meta-sm mt-3 text-content-muted">{award.period}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
