import { skillGroups } from '../data/skills';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import SkillIcon from '../components/SkillIcon';

// Proficiency is shown as a 3-step meter rather than an invented percentage.
const LEVEL_STEPS = { Expert: 3, Advanced: 2, Intermediate: 1 };

function LevelMeter({ level }) {
  const filled = LEVEL_STEPS[level] ?? 1;
  return (
    <span
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Proficiency: ${level}`}
    >
      {[1, 2, 3].map((step) => (
        <span
          key={step}
          className={`h-1 w-3 rounded-full transition-colors ${
            step <= filled ? 'bg-accent' : 'bg-edge'
          }`}
        />
      ))}
    </span>
  );
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolkit"
      title="Skills & technologies"
      description="The stack I reach for across research prototypes and production systems."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.06}>
            <article className="card h-full p-6 transition-colors duration-300 hover:border-accent/40">
              <header className="mb-5">
                <h3 className="text-base font-semibold text-content-primary">
                  {group.category}
                </h3>
                <p className="mt-0.5 text-xs text-content-muted">{group.blurb}</p>
              </header>

              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-edge bg-surface-overlay/60 text-content-secondary">
                      <SkillIcon icon={item.icon} name={item.name} />
                    </span>
                    <span className="flex-1 truncate text-sm text-content-secondary">
                      {item.name}
                    </span>
                    <LevelMeter level={item.level} />
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-content-muted">
          <span className="font-medium text-content-secondary">Proficiency</span>
          {Object.entries(LEVEL_STEPS).map(([label, steps]) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <span className="flex gap-0.5">
                {[1, 2, 3].map((step) => (
                  <span
                    key={step}
                    className={`h-1 w-3 rounded-full ${step <= steps ? 'bg-accent' : 'bg-edge'}`}
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
