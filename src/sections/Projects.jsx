import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiExternalLink, FiFileText } from 'react-icons/fi';
import { categories, projects } from '../data/projects';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Badge from '../components/ui/Badge';

const CATEGORY_TONE = {
  'AI/ML': 'accent',
  'Full-Stack': 'iris',
  Networks: 'ember',
};

function ProjectCard({ project }) {
  const { paper, demo, repo } = project.links ?? {};

  return (
    <article className="card group relative flex h-full flex-col overflow-hidden p-6 transition-colors duration-300 hover:border-accent/40">
      {/* Hover wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex flex-1 flex-col">
        <div className="mb-3 flex items-start justify-between gap-3">
          <Badge tone={CATEGORY_TONE[project.category] ?? 'neutral'}>
            {project.category}
          </Badge>
          {project.featured && (
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-content-muted">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-content-primary transition-colors group-hover:text-accent">
          {project.title}
        </h3>

        <p className="mt-1 text-xs font-medium text-content-muted">{project.role}</p>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-content-secondary">
          {project.description}
        </p>

        {project.impact && (
          <p className="mt-4 flex items-start gap-2 rounded-lg border border-edge bg-surface-overlay/60 px-3 py-2 text-xs text-content-primary">
            <span aria-hidden="true" className="mt-0.5 text-accent">
              ▸
            </span>
            {project.impact}
          </p>
        )}

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>

        {(paper || demo || repo) && (
          <div className="mt-5 flex flex-wrap gap-4 border-t border-edge pt-4">
            {paper && (
              <a
                href={paper}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded text-sm text-accent transition-opacity hover:opacity-75"
              >
                <FiFileText className="h-3.5 w-3.5" aria-hidden="true" />
                Read paper
                <span className="sr-only"> for {project.title}</span>
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded text-sm text-accent transition-opacity hover:opacity-75"
              >
                <FiExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                Live demo
                <span className="sr-only"> of {project.title}</span>
              </a>
            )}
            {repo && (
              <a
                href={repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded text-sm text-accent transition-opacity hover:opacity-75"
              >
                <FiExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                Source
                <span className="sr-only"> for {project.title}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState('All');
  const reduceMotion = useReducedMotion();

  const visible = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Projects"
      description="Research and engineering work spanning applied AI, network systems, and full-stack product delivery."
    >
      {/* Filter */}
      <Reveal className="mb-10 flex justify-center">
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="inline-flex flex-wrap justify-center gap-1 rounded-2xl border border-edge bg-surface-raised/60 p-1.5 backdrop-blur"
        >
          {categories.map((category) => {
            const isActive = active === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(category)}
                className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-content-secondary hover:text-content-primary'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-xl bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{category}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Grid */}
      <motion.div layout={!reduceMotion} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.title}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* aria-live so filtering is announced to screen reader users. */}
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {active === 'All' ? '' : `${active} `}
        {visible.length === 1 ? 'project' : 'projects'}.
      </p>
    </Section>
  );
}
