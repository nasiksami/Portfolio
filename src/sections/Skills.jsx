import { levelOrder, skillGroups } from '../data/skills';
import { ARC } from '../sky';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import SkillIcon from '../components/SkillIcon';

const LEVEL_STEPS = { Expert: 3, Advanced: 2, Intermediate: 1 };

/** Three seeds; the filled ones show proficiency. */
function Seeds({ level, labelled = true }) {
  const filled = LEVEL_STEPS[level] ?? 1;
  return (
    <span
      className="inline-flex shrink-0 gap-1"
      {...(labelled ? { role: 'img', 'aria-label': 'Proficiency: ' + level } : { 'aria-hidden': true })}
    >
      {[1, 2, 3].map((step) => (
        <span
          key={step}
          className={[
            'h-1.5 w-1.5 rounded-full border',
            step <= filled ? 'border-signal bg-signal' : 'border-edge',
          ].join(' ')}
        />
      ))}
    </span>
  );
}

/**
 * Afternoon, entirely below the line. Each skill group is a furrow: a ruled
 * row with the category on the left and the planted skills on the right.
 */
export default function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      label="Toolkit"
      arc={ARC.skills}
      title="Skills & technologies"
      description="The stack I reach for across research prototypes and production systems."
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
                <p className="meta-sm mt-3 max-w-[16rem] text-content-muted">{group.blurb}</p>
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
                    <span className="min-w-0 flex-1 truncate text-sm text-content-primary">
                      {item.name}
                    </span>
                    <Seeds level={item.level} />
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="meta-sm text-content-secondary">Proficiency</p>
          {levelOrder.map((label) => (
            <span key={label} className="meta-sm inline-flex items-center gap-3 text-content-muted">
              <Seeds level={label} labelled={false} />
              {label}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
