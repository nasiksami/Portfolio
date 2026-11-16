import { moreTools, skillGroups } from '../data/skills';
import { ARC } from '../sky';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import SkillIcon from '../components/SkillIcon';

/**
 * Afternoon, entirely below the line. Each skill group is a furrow: a ruled
 * row with the category on the left and the planted skills on the right.
 * Skills are listed without proficiency ratings.
 */
export default function Skills() {
  return (
    <Section
      id="skills"
      index="05"
      label="Toolkit"
      arc={ARC.skills}
      title="Skills & technologies"
      description="The tools I work with, from model development and LLM systems to the engineering around them."
    >
      <div className="border-b border-edge">
        {skillGroups.map((group, index) => (
          <Reveal key={group.category} delay={Math.min(index * 0.05, 0.2)}>
            <section
              aria-label={group.category}
              className="group grid gap-6 border-t border-edge py-9 first:border-t-0 md:py-12 lg:grid-cols-12 lg:gap-8"
            >
              <header className="lg:col-span-4">
                <p className="meta-sm text-signal">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="display d-3 mt-3 text-content-primary transition-colors group-hover:text-accent">
                  {group.category}
                </h3>
              </header>

              <ul className="grid gap-2 sm:grid-cols-2 lg:col-span-8 xl:grid-cols-3">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex min-h-12 items-center gap-3 rounded-[0.35rem] border border-edge px-3 py-2 transition-colors hover:border-content-primary/60"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center text-content-secondary">
                      <SkillIcon icon={item.icon} name={item.name} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1 text-base leading-snug text-content-primary">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>

      {/* Tools from earlier work, out of the main view but still on the page. */}
      <Reveal delay={0.1}>
        <details className="group/more mt-8">
          <summary className="meta-sm tap w-fit cursor-pointer gap-2 rounded-[0.35rem] border border-edge px-3.5 py-2 text-content-secondary transition-colors hover:border-content-primary hover:text-content-primary">
            More tools
            <span aria-hidden="true" className="transition-transform group-open/more:rotate-45">
              +
            </span>
          </summary>
          <ul className="mt-5 flex flex-wrap gap-2">
            {moreTools.map((tool) => (
              <li
                key={tool}
                className="rounded-[0.35rem] border border-edge px-3 py-2 text-base text-content-secondary"
              >
                {tool}
              </li>
            ))}
          </ul>
        </details>
      </Reveal>
    </Section>
  );
}
