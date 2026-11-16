import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { caseStudies, caseStudyBySlug } from '../data/caseStudies';
import { ARC } from '../sky';
import { useSite } from '../site';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Tag from '../components/ui/Tag';
import Emphasis from '../components/ui/Emphasis';
import FlowDiagram from '../components/FlowDiagram';

/** Home / Projects / this page. The current page is text, not a link. */
function Breadcrumb({ title }) {
  const { root, home } = useSite();
  return (
    <nav aria-label="Breadcrumb">
      <ol className="meta-sm flex flex-wrap items-center gap-x-2 gap-y-1 text-content-muted">
        <li>
          <a href={root} className="tap transition-colors hover:text-accent">
            Home
          </a>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <a href={home('projects')} className="tap transition-colors hover:text-accent">
            Projects
          </a>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-content-secondary">
          {title}
        </li>
      </ol>
    </nav>
  );
}

/** A ruled block: its heading on the left on wide screens, prose on the right. */
function Block({ heading, children }) {
  return (
    <Reveal className="border-t border-edge">
      <div className="grid gap-4 py-9 md:py-12 lg:grid-cols-12 lg:gap-8">
        <h2 className="subhead text-content-primary lg:col-span-3">{heading}</h2>
        <div className="space-y-5 lg:col-span-8 lg:col-start-5">{children}</div>
      </div>
    </Reveal>
  );
}

function Prose({ paragraphs }) {
  return paragraphs.map((paragraph) => (
    <p key={paragraph} className="max-w-prose text-lg text-content-secondary">
      <Emphasis>{paragraph}</Emphasis>
    </p>
  ));
}

function Results({ results, title }) {
  if (results.list) {
    return (
      <ul className="max-w-prose space-y-3">
        {results.list.map((item) => (
          <li key={item} className="flex gap-3 text-base text-content-secondary">
            <span aria-hidden="true" className="mt-[0.75em] h-1 w-3 shrink-0 bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="max-w-3xl overflow-x-auto">
      <table className="w-full border-collapse text-left text-base">
        <caption className="sr-only">Results for {title}</caption>
        <thead>
          <tr className="border-b border-edge">
            {results.columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={['meta-sm py-3 text-content-muted', index > 0 ? 'pl-6 text-right' : ''].join(' ')}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.rows.map((row, index) => {
            const best = index === results.highlight;
            return (
              <tr key={row[0]} className="border-b border-edge">
                <th
                  scope="row"
                  className={[
                    'py-3.5 pr-2 font-normal',
                    best ? 'font-semibold text-content-primary' : 'text-content-secondary',
                  ].join(' ')}
                >
                  {row[0]}
                </th>
                <td
                  className={[
                    'whitespace-nowrap py-3.5 pl-6 text-right tabular-nums',
                    best ? 'font-semibold text-signal' : 'text-content-primary',
                  ].join(' ')}
                >
                  {row[1]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/**
 * A case-study page: Problem → My contribution → Architecture →
 * Implementation → Results → Evidence. The content comes from
 * data/caseStudies.js; this file is only the layout.
 */
export default function CaseStudy({ slug }) {
  const { to, home } = useSite();
  const study = caseStudyBySlug(slug);
  const others = caseStudies.filter((other) => other.slug !== slug);

  return (
    <>
      <Section
        id="overview"
        index="01"
        label="Case study"
        arc={ARC.caseIntro}
        headingLevel={1}
        kicker={<Breadcrumb title={study.title} />}
        title={study.title}
        description={study.summary}
      >
        <Reveal>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-8 pb-14 sm:grid-cols-2 md:pb-20 lg:grid-cols-4 lg:gap-x-8">
            {study.facts.map((fact) => (
              <div key={fact.label} className="border-l border-edge pl-5">
                <dt className="meta-sm text-content-muted">{fact.label}</dt>
                <dd className="m-0 mt-2 text-base font-medium text-content-primary">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="border-b border-edge">
          <Block heading="Problem">
            <Prose paragraphs={study.problem} />
          </Block>
          <Block heading="My contribution">
            <Prose paragraphs={study.contribution} />
            <ul aria-label="Stack" className="flex flex-wrap gap-1.5 pt-2">
              {study.stack.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </Section>

      <Section
        id="architecture"
        index="02"
        label="Design"
        arc={ARC.caseBody}
        title="Architecture"
        description="How the parts fit together, then how each was built."
      >
        <Reveal>
          <FlowDiagram id={'diagram-' + study.slug} caption={study.diagram.caption} lanes={study.diagram.lanes} />
        </Reveal>

        <div className="mt-16 border-b border-edge md:mt-24">
          <Block heading="Implementation">
            <Prose paragraphs={study.implementation} />
          </Block>
        </div>
      </Section>

      <Section
        id="results"
        index="03"
        label="Outcome"
        arc={ARC.caseClose}
        title="Results"
        description={study.results.intro}
        ground="solid"
      >
        <Reveal>
          <Results results={study.results} title={study.title} />
        </Reveal>

        <div className="mt-16 md:mt-24">
          <Reveal>
            <div className="mb-2 flex items-center gap-5">
              <h2 className="eyebrow shrink-0">Evidence</h2>
              <span aria-hidden="true" className="h-px flex-1 bg-edge" />
            </div>
          </Reveal>
          <Reveal>
            <ul className="border-b border-edge">
              {study.evidence.map((item) => (
                <li key={item.href} className="border-t border-edge first:border-t-0">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 text-base text-content-primary transition-colors hover:text-accent"
                  >
                    <span>
                      {item.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                    <FiArrowUpRight
                      className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <nav aria-label="More case studies" className="mt-16 md:mt-24">
          <div className="mb-2 flex items-center gap-5">
            <h2 className="eyebrow shrink-0">More case studies</h2>
            <span aria-hidden="true" className="h-px flex-1 bg-edge" />
          </div>
          <ul className="border-b border-edge">
            {others.map((other) => (
              <li key={other.slug} className="border-t border-edge first:border-t-0">
                <a
                  href={to('projects/' + other.slug + '/')}
                  className="group grid gap-1 py-5 transition-colors hover:text-accent sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6"
                >
                  <span>
                    <span className="display d-3 block text-content-primary transition-colors group-hover:text-accent">
                      {other.title}
                    </span>
                    <span className="mt-2 block max-w-prose text-sm text-content-secondary">
                      {other.summary}
                    </span>
                  </span>
                  <FiArrowRight
                    className="hidden h-4 w-4 transition-transform group-hover:translate-x-1 sm:block"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={home('projects')}
            className="link-draw meta tap mt-8 gap-2 text-accent"
          >
            <FiArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All projects
          </a>
        </nav>
      </Section>
    </>
  );
}
