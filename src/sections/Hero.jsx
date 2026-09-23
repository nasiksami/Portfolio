import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowDown, FiDownload } from 'react-icons/fi';
import { profile, socials } from '../data/profile';
import { ARC, skyProps } from '../sky';
import HorizonRule from '../components/HorizonRule';
import Button from '../components/ui/Button';
import SocialLinks from '../components/SocialLinks';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

// Transform only, no fade: the hero text is the page's largest paint, and
// text at zero opacity does not count as painted.
const item = {
  hidden: { y: 14 },
  show: { y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * The opening: one flat pre-dawn sky, the name on a single line above the
 * horizon rule, and everything else hung from the rule.
 *
 * The name stands on the horizon rule. Below it, after a clear gap, the
 * portrait plate and the text column start on one line: the plate's top edge
 * and the role's cap height (trimmed to the ink with text-box) align, and the
 * plate's left edge is the name's first letter. Reading order is strictly downward: name, role, current
 * position, positioning statement, View my work, then Get in touch and
 * Resume.
 */
export default function Hero() {
  const reduceMotion = useReducedMotion();
  const enter = reduceMotion ? false : 'hidden';

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      {...skyProps(ARC.top)}
      className="relative isolate"
    >
      <div className="horizon-sky pt-32 md:pt-40 lg:pt-48">
        <div className="shell">
          <div className="hero-name-fit pb-[clamp(0.75rem,1.4vw,1.5rem)]">
            <motion.h1
              id="hero-heading"
              initial={enter}
              animate="show"
              variants={item}
              className="display hero-name text-content-primary"
            >
              {profile.name}
            </motion.h1>
          </div>
        </div>
      </div>

      <HorizonRule />

      <div className="horizon-ground">
        <motion.div
          className="shell grid grid-cols-[minmax(0,6.5rem)_minmax(0,1fr)] gap-x-5 pb-20 pt-8 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-x-8 md:pb-28 md:pt-12 lg:grid-cols-12 lg:pt-16"
          variants={container}
          initial={enter}
          animate="show"
        >
          <motion.figure variants={item} className="m-0 lg:col-span-3 lg:row-span-2">
            <div className="aspect-[4/5] overflow-hidden rounded-[0.35rem] border border-edge bg-surface-overlay lg:aspect-square">
              <img
                src={profile.headshot}
                alt={'Portrait of ' + profile.name}
                width="640"
                height="640"
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover object-[50%_16%]"
              />
            </div>
            <figcaption className="sr-only">
              {profile.name}, {profile.location}
            </figcaption>
          </motion.figure>

          <div className="lg:col-span-8 lg:col-start-5">
            <motion.p
              variants={item}
              className="trim-cap text-lg font-medium leading-tight text-content-primary sm:text-xl"
            >
              {profile.role}
            </motion.p>
            <motion.p variants={item} className="meta mt-3 text-content-muted">
              {profile.currentRole}
              <span aria-hidden="true"> · </span>
              <span className="sr-only">, </span>
              {profile.location}
            </motion.p>
          </div>

          {/* Below the plate on small screens; beside it from lg. The plate is
              4:5 there so it, not the text beside it, sets the row height,
              and a font swap rewrapping that text cannot push this down. */}
          <div className="col-span-2 mt-8 lg:col-span-8 lg:col-start-5 lg:mt-0">
            <motion.p variants={item} className="max-w-prose text-lg text-content-secondary lg:mt-6">
              {profile.summary}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#projects" variant="solid" size="lg">
                View my work
              </Button>
              <Button href="#contact" variant="outline" size="lg">
                Get in touch
              </Button>
              <Button
                href={profile.resumeUrl}
                variant="bare"
                external
                aria-label="Download resume as PDF"
                className="ml-1 px-2"
              >
                <FiDownload className="h-3.5 w-3.5" aria-hidden="true" />
                Resume
              </Button>
            </motion.div>

            <motion.div variants={item}>
              <SocialLinks
                items={socials.filter((social) => social.icon !== 'phone')}
                className="mt-8"
              />
            </motion.div>

            <a
              href="#about"
              className="meta tap mt-12 w-fit gap-2 text-content-muted transition-colors hover:text-accent"
            >
              <FiArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              Continue to About
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
