import { Fragment, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { FiArrowDown, FiDownload } from 'react-icons/fi';
import { profile, socials, stats } from '../data/profile';
import ColumnRules from '../components/ColumnRules';
import Marquee from '../components/Marquee';
import SignalField from '../components/SignalField';
import Button from '../components/ui/Button';
import SocialLinks from '../components/SocialLinks';

const WORDS = profile.name.split(' ');
const TICKER = [
  profile.role,
  profile.location,
  profile.currentRole,
  ...stats.map((stat) => stat.value + ' ' + stat.label),
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(910);
  const pointerY = useMotionValue(260);
  const focusX = useSpring(pointerX, { stiffness: 100, damping: 22, mass: 0.35 });
  const focusY = useSpring(pointerY, { stiffness: 100, damping: 22, mass: 0.35 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.9], [0.82, 0]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -72]);

  const handlePointerMove = (event) => {
    if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set(((event.clientX - rect.left) / rect.width) * 1200);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 800);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      onPointerMove={handlePointerMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-20"
    >
      <ColumnRules className="opacity-80" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={reduceMotion ? undefined : { y: fieldY, opacity: fieldOpacity }}
      >
        <SignalField focusX={focusX} focusY={focusY} reduceMotion={reduceMotion} />
      </motion.div>

      <motion.div
        className="shell relative flex flex-1 flex-col justify-center py-10 md:py-16"
        variants={container}
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
      >
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="relative z-10 lg:col-span-8">
            <motion.p variants={item} className="signal-chip mb-7 w-fit">
              {profile.currentRole}
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={item}
              className="hero-name display d-hero text-content-primary"
              style={reduceMotion ? undefined : { y: nameY }}
            >
              {WORDS.map((word, index) => (
                <Fragment key={word}>
                  {index > 0 && ' '}
                  <span className={index === 1 ? 'italic text-accent' : ''}>{word}</span>
                </Fragment>
              ))}
            </motion.h1>

            <motion.div
              variants={item}
              className="mt-8 flex flex-col gap-4 border-l border-accent pl-5 md:mt-10 md:flex-row md:items-end md:justify-between"
            >
              <p className="max-w-xl text-lg font-medium leading-snug text-content-primary md:text-xl">
                {profile.role}
              </p>
              <p className="meta-sm text-content-muted">{profile.location}</p>
            </motion.div>
          </div>

          <motion.figure
            variants={item}
            className="orbit-frame relative z-20 mx-auto w-[min(72vw,20rem)] lg:col-span-4 lg:w-full lg:max-w-[24rem]"
          >
            <div className="portrait-window aspect-[4/5]">
              <img
                src={profile.headshot}
                alt={'Portrait of ' + profile.name}
                width="640"
                height="640"
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <figcaption className="meta-sm mt-5 flex justify-between gap-4 text-content-muted">
              <span>Fig. 01</span>
              <span>{profile.location}</span>
            </figcaption>
          </motion.figure>
        </div>

        <div className="mt-14 grid gap-8 border-t border-edge/70 pt-8 lg:grid-cols-12 lg:gap-8">
          <motion.p
            variants={item}
            className="max-w-prose text-base leading-relaxed text-content-secondary md:text-lg lg:col-span-5"
          >
            {profile.summary}
          </motion.p>

          <motion.div variants={item} className="lg:col-span-6 lg:col-start-7">
            <div className="flex flex-wrap items-center gap-3">
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

        <motion.a
          variants={item}
          href="#about"
          className="meta tap mt-12 w-fit gap-2 text-content-muted transition-colors hover:text-accent"
        >
          <FiArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          Scroll to explore
        </motion.a>
      </motion.div>

      <Marquee items={TICKER} className="border-b-0" />
    </section>
  );
}
