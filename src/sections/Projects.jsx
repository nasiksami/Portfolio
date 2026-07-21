import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { categories, projects } from '../data/projects';
import Section from '../components/ui/Section';
import Tag from '../components/ui/Tag';

/** One catalogue entry: index, title at display scale, then meta columns. */
function ProjectEntry({ project, index }) {
  const { paper, demo, repo } = project.links ?? {};
  const links = [
    paper && { href: paper, label: 'Read paper', context: `for ${project.title}` },
    demo && { href: demo, label: 'Live demo', context: `of ${project.title}` },
    repo && { href: repo, label: 'Source', context: `for ${project.title}` },
  ].filter(Boolean);

  return (
    <article className="group grid gap-x-6 gap-y-6 py-10 md:grid-cols-12">
      {/* Index + category */}
      <div className="flex items-start gap-4 md:col-span-2 md:flex-col md:gap-3">
        <span
          aria-hidden="true"
          className="display text-[clamp(1.75rem,3vw,2.75rem)] leading-none text-content-muted transition-colors group-hover:text-accent"
          style={{ '--wdth': 70, '--wght': 700 }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <Tag tone={project.featured ? 'signal' : 'plain'}>{project.category}</Tag>
      </div>

      {/* Title, role, description */}
      <div className="md:col-span-6">
        <h3
          className="display d-2 text-content-primary transition-colors group-hover:text-accent"
          style={{ '--wdth': project.featured ? 108 : 92 }}
        >
          {project.title}
        </h3>
        <p className="meta-sm mt-3 text-content-muted">{project.role}</p>
        <p className="mt-5 max-w-prose text-sm leading-relaxed text-content-secondary md:text-base">
          {project.description}
        </p>

        {links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw meta flex items-center gap-1.5 text-accent"
              >
                {link.label}
                <span className="sr-only"> {link.context} (opens in a new tab)</span>
                <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Impact + stack */}
      <div className="md:col-span-4">
        {project.impact && (
          <div className="border-l-2 border-accent pl-4">
            <p className="meta-sm text-content-muted">Impact</p>
            <p className="mt-2 text-sm leading-relaxed text-content-primary">
              {project.impact}
            </p>
          </div>
        )}

        <p className="meta-sm mt-7 text-content-muted">Stack</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
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
      index="02"
      label="Work"
      title="Selected work"
      description="Research and engineering work spanning applied AI, network systems, and full-stack product delivery."
      invert
    >
      {/* Filter — an index row rather than a pill group. */}
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="mb-4 flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-edge pb-4"
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
              className={`meta relative pb-2 transition-colors ${
                isActive
                  ? 'text-accent'
                  : 'text-content-muted hover:text-content-primary'
              }`}
            >
              {category}
              {isActive && (
                <motion.span
                  layoutId="project-filter-underline"
                  aria-hidden="true"
                  className="absolute -bottom-[1.3rem] left-0 right-0 h-0.5 bg-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.div layout={!reduceMotion} className="ledger">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.div
              key={project.title}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Index is taken from the full catalogue, not the filtered
                  view, so an entry keeps its number under every filter. */}
              <ProjectEntry
                project={project}
                index={projects.findIndex((p) => p.title === project.title)}
              />
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
