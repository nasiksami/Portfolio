import { FiExternalLink } from 'react-icons/fi';
import { authorKey, publications } from '../data/publications';
import { awards } from '../data/education';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Badge from '../components/ui/Badge';

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
      eyebrow="Research"
      title="Publications & awards"
      description="Peer-reviewed work in telecom AI, network security, and applied deep learning."
    >
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
        {/* Publications */}
        <div>
          <Reveal>
            <h3 className="mb-6 font-display text-lg font-semibold text-content-primary">
              Publications
            </h3>
          </Reveal>

          <ol className="space-y-4">
            {publications.map((pub, index) => (
              <Reveal key={pub.title} delay={Math.min(index * 0.05, 0.25)}>
                <li className="card group p-5 transition-colors duration-300 hover:border-accent/40">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge tone="accent">{pub.year}</Badge>
                    <Badge>{pub.type}</Badge>
                  </div>

                  <h4 className="text-sm font-semibold leading-snug text-content-primary sm:text-base">
                    <a
                      href={pub.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded transition-colors hover:text-accent"
                    >
                      {pub.title}
                      <FiExternalLink
                        className="ml-1.5 inline h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-content-muted">
                    <AuthorList authors={pub.authors} />
                  </p>
                  <p className="mt-1 text-xs italic text-content-secondary">{pub.venue}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Awards */}
        <div>
          <Reveal>
            <h3 className="mb-6 font-display text-lg font-semibold text-content-primary">
              Awards & scholarships
            </h3>
          </Reveal>

          <ul className="space-y-3">
            {awards.map((award, index) => (
              <Reveal key={award.title} delay={Math.min(index * 0.05, 0.25)}>
                <li className="card p-4 transition-colors duration-300 hover:border-accent/40">
                  <div className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember"
                    />
                    <div>
                      <p className="text-sm font-medium leading-snug text-content-primary">
                        {award.href ? (
                          <a
                            href={award.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded transition-colors hover:text-accent"
                          >
                            {award.title}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        ) : (
                          award.title
                        )}
                      </p>
                      {award.detail && (
                        <p className="mt-0.5 text-xs text-content-secondary">{award.detail}</p>
                      )}
                      {award.period && (
                        <p className="mt-0.5 font-mono text-xs text-content-muted">
                          {award.period}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
