import { Fragment, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { FiArrowDown, FiDownload } from 'react-icons/fi';
import { profile, socials, stats } from '../data/profile';
import { usePointerWidth } from '../hooks/usePointerWidth';
import ColumnRules from '../components/ColumnRules';
import Marquee from '../components/Marquee';
import Button from '../components/ui/Button';
import SocialLinks from '../components/SocialLinks';

/** Staggered entrance for the hero's stacked blocks. */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

// The wordmark is set from the name itself, so it can never drift out of sync
// with data/profile.js.
const WORDS = profile.name.split(' ');

// Ticker copy is assembled from content already on the page — nothing here is
// authored, so the ticker can never state something the rest of the site does
// not.
const TICKER = [
  profile.role,
  profile.location,
  profile.currentRole,
  ...stats.map((stat) => `${stat.value} ${stat.label}`),
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  // Pointer drives Archivo's width axis; scroll drives parallax. Kept on
  // separate properties so the two interactions never fight over one value.
  const widthRef = usePointerWidth();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ['0%', '38%']);
  const wordmarkFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const motionProps = reduceMotion
    ? {}
    : { variants: container, initial: 'hidden', animate: 'show' };
  const itemProps = reduceMotion ? {} : { variants: item };
  const parallax = reduceMotion ? undefined : { y: wordmarkY, opacity: wordmarkFade };

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-20"
    >
      <ColumnRules />

      <motion.div ref={widthRef} className="shell relative flex-1 py-10" {...motionProps}>
        <div className="grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-6">
          {/* ── Wordmark ───────────────────────────────────────────────── */}
          <motion.div
            style={parallax}
            className="relative z-10 lg:col-span-8 lg:[will-change:transform,opacity]"
          >
            <motion.p {...itemProps} className="meta-sm mb-8 flex items-center gap-3">
              <span aria-hidden="true" className="h-2 w-2 bg-accent" />
              <span className="text-content-secondary">{profile.currentRole}</span>
            </motion.p>

            <motion.h1
              {...itemProps}
              id="hero-heading"
              className="display d-hero text-content-primary"
            >
              {WORDS.map((word, index) => {
                const isLast = index === WORDS.length - 1;
                return (
                  <Fragment key={word}>
                    {/* Real whitespace between the words so the accessible
                        name is "Nasik Sami Khan" regardless of how a given
                        engine treats block boundaries. It collapses to
                        nothing visually. */}
                    {index > 0 && ' '}
                    {isLast ? (
                      // Reversed out of an ink band that bleeds off the right
                      // edge. The band is clipped by the section's
                      // overflow-hidden, so it never creates a scrollbar.
                      <span className="relative block">
                        <span
                          aria-hidden="true"
                          className="absolute -inset-y-[0.04em] -left-[6vw] right-[-60vw] bg-content-primary"
                        />
                        <span className="relative block pl-[1vw] text-surface-base">
                          {word}
                        </span>
                      </span>
                    ) : (
                      <span className="block">{word}</span>
                    )}
                  </Fragment>
                );
              })}
            </motion.h1>

            <motion.p
              {...itemProps}
              className="display d-3 mt-10 max-w-2xl text-accent"
              style={{ '--wght': 700 }}
            >
              {profile.role}
            </motion.p>
          </motion.div>

          {/* ── Portrait ───────────────────────────────────────────────── */}
          <motion.div
            {...itemProps}
            className="relative z-20 mx-auto w-full max-w-xs lg:col-span-4 lg:max-w-none"
          >
            <div className="halftone relative border border-content-primary">
              <img
                src={profile.headshot}
                alt={`Portrait of ${profile.name}`}
                width="640"
                height="640"
                loading="eager"
                // React 18.2 logs a dev-only casing warning for this prop but
                // still emits it, and HTML attributes are case-insensitive, so
                // the browser honours it. Lowercase would silence the warning
                // but trips eslint-plugin-react, which is the CI gate.
                fetchPriority="high"
                className="duotone aspect-[4/5] w-full object-cover object-top"
              />
            </div>
            <p className="meta-sm mt-3 flex justify-between text-content-muted">
              <span>Fig. 01</span>
              <span>{profile.location}</span>
            </p>
          </motion.div>
        </div>

        {/* ── Specimen data ──────────────────────────────────────────────── */}
        <div className="mt-16 grid gap-y-10 lg:grid-cols-12 lg:gap-x-6">
          <motion.div {...itemProps} className="lg:col-span-5">
            <p className="rule pt-5 text-base leading-relaxed text-content-secondary md:text-lg">
              {profile.summary}
            </p>
          </motion.div>

          <motion.div {...itemProps} className="lg:col-span-5 lg:col-start-7">
            <div className="rule flex flex-wrap items-center gap-x-3 gap-y-3 pt-5">
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
              className="mt-8"
            />
          </motion.div>
        </div>

        <motion.a
          {...itemProps}
          href="#about"
          className="link-draw meta mt-14 hidden w-fit items-center gap-2 text-content-muted transition-colors hover:text-accent md:inline-flex"
        >
          <FiArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          Scroll to explore
        </motion.a>
      </motion.div>

      <Marquee items={TICKER} className="border-b-0" />
    </section>
  );
}
