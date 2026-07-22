import { levelOrder, skillGroups } from '../data/skills';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import SkillIcon from '../components/SkillIcon';
import './Skills.css';

const LEVEL_STEPS = { Expert: 3, Advanced: 2, Intermediate: 1 };

function LevelMeter({ level }) {
  const filled = LEVEL_STEPS[level] ?? 1;
  return (
    <span className="skill-level" role="img" aria-label={'Proficiency: ' + level}>
      {[1, 2, 3].map((step) => (
        <span
          key={step}
          className={['skill-level__node', step <= filled ? 'is-filled' : ''].join(' ')}
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
      <div className="skill-spectrum border-b border-edge/70">
        {skillGroups.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.05}>
            <section
              aria-label={group.category}
              className="skill-group relative grid gap-8 overflow-hidden border-t border-edge/70 py-9 md:py-12 lg:grid-cols-[5rem_18rem_minmax(0,1fr)] lg:gap-10"
            >
              <span aria-hidden="true" className="skill-group__index">
                {String(index + 1).padStart(2, '0')}
              </span>

              <p className="meta-sm relative z-10 text-signal">
                {String(index + 1).padStart(2, '0')}
              </p>

              <header className="relative z-10">
                <h3 className="display d-3 text-content-primary">{group.category}</h3>
                <p className="meta-sm mt-3 max-w-[16rem] text-content-muted">{group.blurb}</p>
              </header>

              <ul className="relative z-10 grid gap-x-5 gap-y-2 sm:grid-cols-2 xl:grid-cols-3">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="group flex min-h-14 items-center gap-3 rounded-full border border-edge/70 bg-surface-raised/40 px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/[0.07]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-edge bg-surface-base text-content-secondary transition-colors group-hover:border-accent group-hover:text-accent">
                      <SkillIcon icon={item.icon} name={item.name} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm text-content-secondary">
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

      <Reveal delay={0.15}>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-[1.5rem] border border-edge/70 bg-surface-raised/40 px-5 py-4 md:mt-14">
          <p className="meta-sm text-content-secondary">Proficiency</p>
          {levelOrder.map((label) => (
            <span key={label} className="meta-sm inline-flex items-center gap-3 text-content-muted">
              <span className="skill-level" aria-hidden="true">
                {[1, 2, 3].map((step) => (
                  <span
                    key={step}
                    className={[
                      'skill-level__node',
                      step <= LEVEL_STEPS[label] ? 'is-filled' : '',
                    ].join(' ')}
                  />
                ))}
              </span>
              {label}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
