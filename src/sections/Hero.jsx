import { motion, useReducedMotion } from 'framer-motion';
import { FiArrowDown, FiDownload, FiMapPin } from 'react-icons/fi';
import { profile, socials } from '../data/profile';
import Aurora from '../components/Aurora';
import Button from '../components/ui/Button';
import SocialLinks from '../components/SocialLinks';

/** Staggered entrance for the hero's stacked text blocks. */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const motionProps = reduceMotion
    ? {}
    : { variants: container, initial: 'hidden', animate: 'show' };
  const itemProps = reduceMotion ? {} : { variants: item };

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      <Aurora />

      <motion.div
        className="mx-auto w-full max-w-content px-5 sm:px-8"
        {...motionProps}
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Copy */}
          <div>
            <motion.p
              {...itemProps}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-edge bg-surface-raised/60 px-3.5 py-1.5 text-xs text-content-secondary backdrop-blur"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              {profile.currentRole}
            </motion.p>

            <motion.h1
              {...itemProps}
              id="hero-heading"
              className="text-4xl font-bold leading-[1.05] text-content-primary sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {profile.name}
            </motion.h1>

            <motion.p
              {...itemProps}
              className="mt-4 bg-gradient-to-r from-accent via-iris to-ember bg-clip-text text-xl font-semibold text-transparent sm:text-2xl lg:text-3xl"
            >
              {profile.role}
            </motion.p>

            <motion.p
              {...itemProps}
              className="mt-5 max-w-prose text-base leading-relaxed text-content-secondary sm:text-lg"
            >
              {profile.summary}
            </motion.p>

            <motion.div
              {...itemProps}
              className="mt-3 flex items-center gap-2 text-sm text-content-muted"
            >
              <FiMapPin className="h-4 w-4" aria-hidden="true" />
              {profile.location}
            </motion.div>

            <motion.div {...itemProps} className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#projects" size="lg">
                View my work
              </Button>
              <Button href="#contact" variant="secondary" size="lg">
                Get in touch
              </Button>
              <Button
                href={profile.resumeUrl}
                variant="ghost"
                size="lg"
                external
                aria-label="Download resume as PDF"
              >
                <FiDownload className="h-4 w-4" aria-hidden="true" />
                Resume
              </Button>
            </motion.div>

            <motion.div {...itemProps} className="mt-8">
              <SocialLinks items={socials.filter((s) => s.icon !== 'phone')} />
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div {...itemProps} className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent/20 via-iris/20 to-ember/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-edge bg-surface-raised/60 p-2 backdrop-blur-xl">
              <img
                src={profile.headshot}
                alt={`Portrait of ${profile.name}`}
                width="640"
                height="640"
                loading="eager"
                fetchPriority="high"
                className="aspect-square w-full rounded-[1.4rem] object-cover"
              />
            </div>
          </motion.div>
        </div>

        <motion.a
          {...itemProps}
          href="#about"
          aria-label="Scroll to About section"
          className="mt-16 hidden w-fit items-center gap-2 rounded-full text-sm text-content-muted transition-colors hover:text-accent md:inline-flex"
        >
          <FiArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
          Scroll to explore
        </motion.a>
      </motion.div>
    </section>
  );
}
