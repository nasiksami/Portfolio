import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { categories, projects } from '../data/projects';
import Section from '../components/ui/Section';
import Tag from '../components/ui/Tag';
import './Projects.css';

function ProjectEntry({ project, index }) {
  const { paper, demo, repo } = project.links ?? {};
  const links = [
    paper && { href: paper, label: 'Read paper', context: 'for ' + project.title },
    demo && { href: demo, label: 'Live demo', context: 'of ' + project.title },
    repo && { href: repo, label: 'Source', context: 'for ' + project.title },
  ].filter(Boolean);

  return (
    <article className="project-entry group relative overflow-hidden py-10 md:py-16">
      <span aria-hidden="true" className="project-index">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7 lg:col-start-2">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Tag tone={project.featured ? 'signal' : 'plain'}>{project.category}</Tag>
            <span className="meta-sm text-content-muted">{project.role}</span>
          </div>

          <h3 className="display text-[clamp(2.7rem,6vw,6rem)] leading-[0.92] text-content-primary transition-colors duration-300 group-hover:text-accent">
            {project.title}
          </h3>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-content-secondary md:text-lg">
            {project.description}
          </p>

          {links.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw meta tap gap-1.5 text-accent"
                >
                  {link.label}
                  <span className="sr-only"> {link.context} (opens in a new tab)</span>
                  <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-3 lg:col-start-10 lg:self-end">
          {project.impact && (
            <div className="rounded-[1.5rem] border border-accent/40 bg-accent/[0.07] p-5">
              <p className="meta-sm text-accent">Impact</p>
              <p className="mt-3 text-sm font-medium leading-relaxed text-content-primary">
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
      </div>
    </article>
  );
}

export default function Projects() {
  const [active, setActive] = useState('All');
  const reduceMotion = useReducedMotion();
  const visible = useMemo(
    () => (active === 'All' ? projects : projects.filter((project) => project.category === active)),
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
      <div
        aria-label="Filter projects by category"
        className="mb-8 flex flex-wrap gap-2 rounded-[1.5rem] border border-edge/70 bg-surface-raised/45 p-2 md:mb-12 md:w-fit"
      >
        {categories.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(category)}
              className={[
                'meta tap rounded-full px-4 py-2 transition-all',
                isActive
                  ? 'bg-signal text-on-signal'
                  : 'text-content-muted hover:bg-surface-overlay hover:text-content-primary',
              ].join(' ')}
            >
              {category}
            </button>
          );
        })}
      </div>

      <motion.div layout={!reduceMotion} className="border-b border-edge/70">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.div
              key={project.title}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -18 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectEntry
                project={project}
                index={projects.findIndex((item) => item.title === project.title)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {active === 'All' ? '' : active + ' '}
        {visible.length === 1 ? 'project' : 'projects'}.
      </p>
    </Section>
  );
}
