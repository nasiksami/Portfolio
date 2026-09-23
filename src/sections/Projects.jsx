import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { categories, projects } from '../data/projects';
import { ARC } from '../sky';
import Section from '../components/ui/Section';
import Tag from '../components/ui/Tag';
import Emphasis from '../components/ui/Emphasis';

const slug = (title) => 'project-' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
const number = (index) => String(index + 1).padStart(2, '0');

function ProjectEntry({ project, index }) {
  const { paper, demo, repo } = project.links ?? {};
  const links = [
    paper && { href: paper, label: 'Read paper', context: 'for ' + project.title },
    demo && { href: demo, label: 'Live demo', context: 'of ' + project.title },
    repo && { href: repo, label: 'Source', context: 'for ' + project.title },
  ].filter(Boolean);

  return (
    <article
      id={slug(project.title)}
      className="group grid gap-8 border-t border-edge py-10 scroll-mt-28 md:py-14 lg:grid-cols-12 lg:gap-8"
    >
      <p aria-hidden="true" className="display text-4xl leading-none text-content-muted lg:col-span-1">
        {number(index)}
      </p>

      <div className="lg:col-span-7">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <Tag tone={project.featured ? 'signal' : 'plain'}>{project.category}</Tag>
          <span className="meta-sm text-content-muted">{project.role}</span>
        </div>

        <h3 className="display d-2 text-content-primary transition-colors duration-300 group-hover:text-accent">
          {project.title}
        </h3>

        <p className="mt-6 max-w-prose text-base text-content-secondary">
          <Emphasis>{project.description}</Emphasis>
        </p>

        {links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
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

      <div className="lg:col-span-3 lg:col-start-10">
        {project.impact && (
          <div className="border-l border-accent pl-5">
            <p className="meta-sm text-accent">Impact</p>
            <p className="mt-2 text-base font-semibold text-content-primary">
              {project.impact}
            </p>
          </div>
        )}

        <p className="meta-sm mt-8 text-content-muted">Stack</p>
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
    () => (active === 'All' ? projects : projects.filter((project) => project.category === active)),
    [active]
  );

  return (
    <Section
      id="projects"
      index="04"
      label="Work"
      arc={ARC.projects}
      title="Selected work"
      description="Research and engineering work spanning applied AI, network systems, and full-stack product delivery."
      sky={
        <div
          aria-label="Filter projects by category"
          className="mt-12 flex flex-wrap gap-2 md:mt-16"
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
                  'meta tap rounded-[0.35rem] border px-4 py-2 transition-colors',
                  isActive
                    ? 'border-content-primary bg-content-primary text-surface-base'
                    : 'border-edge text-content-muted hover:border-content-primary hover:text-content-primary',
                ].join(' ')}
              >
                {category}
              </button>
            );
          })}
        </div>
      }
    >
      <motion.div
        layout={!reduceMotion}
        className="border-b border-edge [&>div:first-child>article]:border-t-0"
      >
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
              <ProjectEntry project={project} index={projects.indexOf(project)} />
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
