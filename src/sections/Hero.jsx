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
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * The sun: the portrait in a disc.
 *
 * Below lg it is in normal flow, risen into the open sky above the name, so
 * the two can never collide. At lg and up it stands on the horizon with its
 * lower 30% below the line; the sky row clips it, so nothing can overhang the
 * ground or the next section. The offset lives on a plain wrapper because
 * Framer's entry animation owns the transform of the element it animates.
 * It rises a little as the visitor scrolls, still inside the clip.
 */
function Sun({ rise, reduceMotion }) {
  return (
    <div className="pointer-events-none relative z-0 mb-10 ml-auto w-[min(56vw,20rem)] sm:mb-12 lg:absolute lg:bottom-0 lg:right-[5%] lg:mb-0 lg:w-[min(30vw,30rem)] lg:translate-y-[30%]">
    <motion.figure variants={item} className="m-0">
      <motion.div style={reduceMotion ? undefined : { y: rise }} className="relative aspect-square">
        {/* Halo: painted rings and a radial glow, no filters. */}
        <span
          aria-hidden="true"
          className="absolute -inset-[45%] rounded-full bg-[radial-gradient(circle,rgb(var(--accent-rgb)/0.28)_0%,rgb(var(--accent-rgb)/0.1)_38%,transparent_68%)]"
        />
        <span aria-hidden="true" className="absolute -inset-[9%] rounded-full border border-accent/25" />
        <span aria-hidden="true" className="absolute -inset-[20%] rounded-full border border-accent/15" />
        <span aria-hidden="true" className="absolute -inset-[34%] rounded-full border border-accent/[0.08]" />

        <div className="relative h-full w-full overflow-hidden rounded-full bg-surface-overlay shadow-[0_0_0_1px_rgb(var(--accent-rgb)/0.5)]">
          <img
            src={profile.headshot}
            alt={'Portrait of ' + profile.name}
            width="640"
            height="640"
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover object-[50%_18%] grayscale"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-accent/45 mix-blend-soft-light" />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgb(var(--sky-rgb)/0.35))]"
          />
        </div>
      </motion.div>
      <figcaption className="sr-only">
        {profile.name}, {profile.location}
      </figcaption>
    </motion.figure>
    </div>
  );
}

/**
 * Pre-dawn. The name stands on the horizon; the portrait is the sun, half
 * risen behind it. Pointer position feeds the weather through springs — no
 * React state on move.
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
  // The sun climbs a fifth of its diameter over the hero; the clip keeps it
  // inside the sky row throughout.
  const rise = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

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
      {...skyProps(ARC.top, reduceMotion)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate flex min-h-[100svh] flex-col"
    >
      <div aria-hidden="true" className="sky-stars pointer-events-none absolute inset-0 -z-10" />

      {/* Sky — clips the sun and the weather at the horizon. */}
      <motion.div
        className="horizon-sky relative flex min-h-[62svh] flex-1 flex-col justify-end overflow-hidden pt-28 md:pt-32"
        variants={container}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
      >
        <Weather windX={windX} windY={windY} reduceMotion={reduceMotion} />

        <div className="shell relative pb-[clamp(0.9rem,1.6vw,1.6rem)]">
          <Sun rise={rise} reduceMotion={reduceMotion} />

          <motion.p
            variants={item}
            className="meta-sm relative z-10 mb-6 inline-flex items-center gap-2.5 text-content-secondary md:mb-10"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
            {profile.currentRole}
          </motion.p>

          {/* Each line is non-wrapping so the line count cannot change while
              the display face is still loading. */}
          <motion.h1
            id="hero-heading"
            variants={item}
            className="display d-hero relative z-10 text-content-primary"
          >
            <span className="block whitespace-nowrap">{GIVEN}</span>
            <span className="block whitespace-nowrap italic text-accent">{FAMILY}</span>
          </motion.h1>
        </div>
      </motion.div>

      <HorizonRule />

      {/* Ground */}
      <div className="horizon-ground">
        <div className="shell pb-20 pt-10 md:pb-28 md:pt-14">
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
