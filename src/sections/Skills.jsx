import { levelOrder, skillGroups } from '../data/skills';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import SkillIcon from '../components/SkillIcon';

// Proficiency is shown as a 3-step meter rather than an invented percentage.
const LEVEL_STEPS = { Expert: 3, Advanced: 2, Intermediate: 1 };

/** Three hard blocks; filled ones carry the signal colour. */
function LevelMeter({ level }) {
  const filled = LEVEL_STEPS[level] ?? 1;
  return (
    <span
      className="flex shrink-0 items-center gap-1"
      role="img"
      aria-label={`Proficiency: ${level}`}
    >
      {[1, 2, 3].map((step) => (
        <span
          key={step}
          className={`h-2.5 w-2.5 ${step <= filled ? 'bg-accent' : 'bg-edge'}`}
        />
      ))}
    </span>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      label="Toolkit"
      title="Skills & technologies"
      description="The stack I reach for across research prototypes and production systems."
    >
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 md:gap-y-14 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.06}>
            <section aria-label={group.category}>
              <header className="border-b-2 border-content-primary pb-3">
                <h3
                  className="display text-lg text-content-primary"
                  style={{ '--wdth': 92, '--wght': 700 }}
                >
                  {group.category}
                </h3>
                <p className="meta-sm mt-2 text-content-muted">{group.blurb}</p>
              </header>

              <ul className="ledger">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-center gap-3 py-2 md:py-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-edge text-content-secondary md:h-7 md:w-7">
                      <SkillIcon icon={item.icon} name={item.name} className="h-4 w-4" />
                    </span>
                    <span className="flex-1 truncate text-sm text-content-secondary">
                      {item.name}
                    </span>
                    <LevelMeter level={item.level} />
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>

      {/* Legend, ordered by the canonical level order from data/skills.js. */}
      <Reveal delay={0.15}>
        <p className="meta-sm mt-12 flex flex-wrap md:mt-16 items-center gap-x-8 gap-y-3 border-t border-edge pt-6 text-content-muted">
          <span className="text-content-secondary">Proficiency</span>
          {levelOrder.map((label) => (
            <span key={label} className="inline-flex items-center gap-2">
              <span className="flex gap-1" aria-hidden="true">
                {[1, 2, 3].map((step) => (
                  <span
                    key={step}
                    className={`h-2.5 w-2.5 ${
                      step <= LEVEL_STEPS[label] ? 'bg-accent' : 'bg-edge'
                    }`}
                  />
                ))}
              </span>
              {label}
            </span>
          ))}
        </p>
      </Reveal>
    </Section>
  );
}
