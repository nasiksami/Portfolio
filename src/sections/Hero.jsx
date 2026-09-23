import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { FiArrowDown, FiDownload } from 'react-icons/fi';
import { profile, socials } from '../data/profile';
import { ARC, skyProps } from '../sky';
import Weather from '../components/Weather';
import HorizonRule from '../components/HorizonRule';
import Button from '../components/ui/Button';
import SocialLinks from '../components/SocialLinks';

const WORDS = profile.name.split(' ');
const GIVEN = WORDS.slice(0, -1).join(' ');
const FAMILY = WORDS[WORDS.length - 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

// Transform only, no fade: the hero text is the page's largest paint, and
// text at zero opacity does not count as painted, so a fade-in delayed LCP
// by ~5s on throttled mobile.
const item = {
  hidden: { y: 20 },
  show: { y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Pre-dawn. The name owns the sky; everything else hangs from the horizon.
 *
 * The horizon rule is the axis. The portrait plate hangs from it, top edge
 * on the rule, left edge on the name's first letter. The name's baseline and
 * the role's cap height sit the same distance either side of it (the clamp
 * shared by the two paddings), trimmed to the ink with text-box. Reading order is strictly downward — name, role, current
 * position, positioning statement, primary CTA, secondary CTAs.
 *
 * Pointer position feeds the weather through springs; no React state on move.
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Normalised pointer position across the hero, −1 … 1 on both axes.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const windX = useSpring(pointerX, { stiffness: 60, damping: 20, mass: 0.6 });
  const windY = useSpring(pointerY, { stiffness: 60, damping: 20, mass: 0.6 });

  const handlePointerMove = (event) => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const enter = reduceMotion ? false : 'hidden';

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      {...skyProps(ARC.top)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate flex min-h-[100svh] flex-col"
    >
      <div aria-hidden="true" className="sky-stars pointer-events-none absolute inset-0 -z-10" />

      {/* Sky: the name alone, standing on the horizon. */}
      <div className="horizon-sky relative flex min-h-[44svh] flex-1 flex-col justify-end overflow-hidden pt-28 md:min-h-[52svh]">
        <Weather windX={windX} windY={windY} reduceMotion={reduceMotion} />

        <div className="shell">
          <div className="hero-name-fit pb-[clamp(0.75rem,1.4vw,1.5rem)]">
            <motion.h1
              id="hero-heading"
              initial={enter}
              animate="show"
              variants={item}
              className="display hero-name text-content-primary"
            >
              <span>{GIVEN}</span> <span className="italic text-accent">{FAMILY}</span>
            </motion.h1>
          </div>
        </div>
      </div>

      <HorizonRule />

      {/* Ground: the plate and the text column both start on the rule. */}
      <div className="horizon-ground">
        <motion.div
          className="shell grid grid-cols-[minmax(0,6.5rem)_minmax(0,1fr)] gap-x-5 pb-16 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-x-8 md:pb-24 lg:grid-cols-12"
          variants={container}
          initial={enter}
          animate="show"
        >
          <motion.figure variants={item} className="m-0 lg:col-span-3 lg:row-span-2">
            <div className="relative aspect-square overflow-hidden rounded-[0.35rem] rounded-t-none border border-t-0 border-edge bg-surface-overlay">
              <img
                src={profile.headshot}
                alt={'Portrait of ' + profile.name}
                width="640"
                height="640"
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover object-[50%_16%] grayscale"
              />
              {/* The same duotone as the sky: grayscale lit by the section accent. */}
              <span aria-hidden="true" className="absolute inset-0 bg-accent/40 mix-blend-soft-light" />
            </div>
            <figcaption className="sr-only">
              {profile.name}, {profile.location}
            </figcaption>
          </motion.figure>

          <div className="pt-[clamp(0.75rem,1.4vw,1.5rem)] lg:col-span-8 lg:col-start-5">
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

          {/* Below the plate on small screens; beside it from lg. */}
          <div className="col-span-2 mt-8 lg:col-span-8 lg:col-start-5 lg:mt-0">
            <motion.p
              variants={item}
              className="max-w-prose text-lg text-content-secondary lg:mt-6"
            >
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
              Scroll for sunrise
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
