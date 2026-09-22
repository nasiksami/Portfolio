import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { FiArrowDown, FiDownload } from 'react-icons/fi';
import { profile, socials } from '../data/profile';
import { ARC } from '../sky';
import Weather from '../components/Weather';
import HorizonRule from '../components/HorizonRule';
import Button from '../components/ui/Button';
import SocialLinks from '../components/SocialLinks';

const WORDS = profile.name.split(' ');
const GIVEN = WORDS.slice(0, -1).join(' ');
const FAMILY = WORDS[WORDS.length - 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Pre-dawn to sunrise. The name stands on the horizon; the portrait is the sun,
 * half below the line at the top of the page and cresting as the visitor
 * scrolls the first viewport. Pointer position feeds the weather through
 * springs — no React state on move.
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Normalised pointer position across the hero, −1 … 1 on both axes.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const windX = useSpring(pointerX, { stiffness: 60, damping: 20, mass: 0.6 });
  const windY = useSpring(pointerY, { stiffness: 60, damping: 20, mass: 0.6 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const sunY = useTransform(scrollYProgress, [0, 1], ['46%', '-38%']);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -48]);

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

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      data-sky-in={ARC.top[0]}
      data-sky-out={ARC.top[1]}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate flex min-h-[100svh] flex-col"
    >
      {/* Sky */}
      <motion.div
        className="horizon-sky relative flex flex-1 flex-col justify-end pt-24 md:pt-28"
        variants={container}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
      >
        <Weather windX={windX} windY={windY} reduceMotion={reduceMotion} />

        <div className="shell grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="relative z-10 lg:col-span-8">
            <motion.p
              variants={item}
              className="meta-sm mb-8 inline-flex items-center gap-2.5 text-content-secondary md:mb-12"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
              {profile.currentRole}
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={item}
              style={reduceMotion ? undefined : { y: nameY }}
              className="display d-hero -mb-[0.06em] text-content-primary"
            >
              <span className="block">{GIVEN}</span>
              <span className="block italic text-accent">{FAMILY}</span>
            </motion.h1>
          </div>

          {/* The sun. The figure reserves only the part that shows above the
              rule; the disc is translated down so its lower half hides behind
              the ground. */}
          <motion.figure
            variants={item}
            className="relative z-0 h-[calc(clamp(10rem,26vw,21rem)*0.6)] w-[clamp(10rem,26vw,21rem)] justify-self-end lg:col-span-4"
          >
            <motion.div
              style={{ y: reduceMotion ? '22%' : sunY }}
              className="absolute inset-x-0 bottom-0"
            >
              <span
                aria-hidden="true"
                className="absolute -inset-[28%] rounded-full bg-accent/30 blur-3xl"
              />
              <div className="relative aspect-square overflow-hidden rounded-full bg-surface-overlay shadow-[0_0_0_1px_rgb(var(--edge-rgb))]">
                <img
                  src={profile.headshot}
                  alt={'Portrait of ' + profile.name}
                  width="640"
                  height="640"
                  loading="eager"
                  fetchPriority="high"
                  className="h-full w-full object-cover object-top grayscale"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-accent/50 mix-blend-soft-light"
                />
              </div>
            </motion.div>
            <figcaption className="sr-only">
              {profile.name}, {profile.location}
            </figcaption>
          </motion.figure>
        </div>
      </motion.div>

      <HorizonRule />

      {/* Ground */}
      <div className="horizon-ground">
        <div className="shell py-10 md:py-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <motion.div
              variants={item}
              initial={reduceMotion ? false : 'hidden'}
              animate="show"
              transition={{ delay: 0.5 }}
              className="lg:col-span-5"
            >
              <p className="max-w-md text-lg font-medium leading-snug text-content-primary md:text-xl">
                {profile.role}
              </p>
              <p className="meta-sm mt-4 text-content-muted">{profile.location}</p>
            </motion.div>

            <motion.div
              variants={item}
              initial={reduceMotion ? false : 'hidden'}
              animate="show"
              transition={{ delay: 0.62 }}
              className="lg:col-span-6 lg:col-start-7"
            >
              <p className="max-w-prose text-base leading-relaxed text-content-secondary md:text-lg">
                {profile.summary}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="#projects" variant="solid">
                  View my work
                </Button>
                <Button href="#contact" variant="outline">
                  Get in touch
                </Button>
                <Button
                  href={profile.resumeUrl}
                  variant="bare"
                  external
                  aria-label="Download resume as PDF"
                  className="ml-1"
                >
                  <FiDownload className="h-3.5 w-3.5" aria-hidden="true" />
                  Resume
                </Button>
              </div>

              <SocialLinks
                items={socials.filter((social) => social.icon !== 'phone')}
                className="mt-7"
              />
            </motion.div>
          </div>

          <a
            href="#about"
            className="meta tap mt-12 w-fit gap-2 text-content-muted transition-colors hover:text-accent"
          >
            <FiArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            Scroll for sunrise
          </a>
        </div>
      </div>
    </section>
  );
}
