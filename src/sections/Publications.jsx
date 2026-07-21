import { FiArrowUpRight } from 'react-icons/fi';
import { authorKey, publications } from '../data/publications';
import { awards } from '../data/education';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Tag from '../components/ui/Tag';

/** Bolds this site's owner within an author list, per academic convention. */
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
      <div className="grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-12">
        {/* ── Bibliography ──────────────────────────────────────────────── */}
        <div>
          <Reveal>
            <h3 className="meta border-b-2 border-content-primary pb-3 text-content-muted">
              Publications
            </h3>
          </Reveal>

          <ol className="ledger">
            {publications.map((pub, index) => (
              <Reveal
                key={pub.title}
                as="li"
                delay={Math.min(index * 0.05, 0.25)}
                className="group grid gap-x-5 gap-y-2 py-5 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-y-3 md:py-6"
              >
                {/* Reference number, hanging in the margin like a real
                    bibliography entry. */}
                <p aria-hidden="true" className="meta-sm text-accent">
                  [{index + 1}]
                </p>

                <div>
                  <h4 className="text-base font-semibold leading-snug text-content-primary">
                    <a
                      href={pub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-draw inline-block transition-colors hover:text-accent"
                    >
                      {pub.title}
                      <FiArrowUpRight
                        className="ml-1 inline h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </h4>

                  <p className="mt-2.5 text-sm leading-relaxed text-content-muted">
                    <AuthorList authors={pub.authors} />
                  </p>
                  <p className="mt-1 text-sm italic leading-relaxed text-content-secondary">
                    {pub.venue}
                  </p>

                  <p className="mt-3 flex flex-wrap items-center gap-2">
                    <Tag tone="signal">{pub.year}</Tag>
                    <Tag>{pub.type}</Tag>
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* ── Awards ───────────────────────────────────────────────────── */}
        <div>
          <Reveal>
            <h3 className="meta border-b-2 border-content-primary pb-3 text-content-muted">
              Awards &amp; scholarships
            </h3>
          </Reveal>

          <ul className="ledger">
            {awards.map((award, index) => (
              <Reveal
                key={award.title}
                as="li"
                delay={Math.min(index * 0.05, 0.25)}
                className="flex gap-4 py-4 md:py-5"
              >
                <span aria-hidden="true" className="mt-2 h-1.5 w-3 shrink-0 bg-accent" />
                <div>
                  <p className="text-sm font-medium leading-snug text-content-primary">
                    {award.href ? (
                      <a
                        href={award.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-draw inline-block transition-colors hover:text-accent"
                      >
                        {award.title}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      award.title
                    )}
                  </p>
                  {award.detail && (
                    <p className="mt-1.5 text-sm text-content-secondary">{award.detail}</p>
                  )}
                  {award.period && (
                    <p className="meta-sm mt-1.5 text-content-muted">{award.period}</p>
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
