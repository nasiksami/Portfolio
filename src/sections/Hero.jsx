import { FiArrowDown, FiDownload } from 'react-icons/fi';
import { profile, socials } from '../data/profile';
import { ARC, skyProps } from '../sky';
import { useSite } from '../site';
import HorizonRule from '../components/HorizonRule';
import Button from '../components/ui/Button';
import SocialLinks from '../components/SocialLinks';

// The entrance is a CSS animation (.hero-rise in index.css): transform only,
// no fade, because the hero text is the page's largest paint and text at zero
// opacity does not count as painted. `--i` staggers the items that carry the
// class.
const rise = (index) => ({ style: { '--i': index } });

/**
 * The opening: one flat pre-dawn sky, the name on a single line above the
 * horizon rule, and everything else hung from the rule.
 *
 * The name stands on the horizon rule. Below it, after a clear gap, the
 * portrait plate and the text column start on one line: the plate's top edge
 * and the role's cap height (trimmed to the ink with text-box) align, and the
 * plate's left edge is the name's first letter. Reading order is strictly
 * downward: name, title, focus, current position, value proposition, then
 * View projects, Download resume and Contact.
 */
export default function Hero() {
  const { asset, to } = useSite();

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
            <h1 id="hero-heading" className="display hero-name hero-rise text-content-primary">
              {profile.name}
            </h1>
          </div>
        </div>
      </div>

      <HorizonRule />

      <div className="horizon-ground">
        <div className="shell grid grid-cols-[minmax(0,6.5rem)_minmax(0,1fr)] gap-x-5 pb-20 pt-8 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-x-8 md:pb-28 md:pt-12 lg:grid-cols-12 lg:pt-16">
          <figure
            className="hero-rise m-0 lg:col-span-3 lg:row-span-2"
            style={{ '--i': 1 }}
          >
            <div className="aspect-[4/5] overflow-hidden rounded-[0.35rem] border border-edge bg-surface-overlay lg:aspect-square">
              <img
                src={asset(profile.headshot)}
                alt={'Portrait of ' + profile.name}
                width="640"
                height="640"
                loading="eager"
                // Lowercase on purpose: React 18.2 does not know the
                // camel-cased prop and would drop it with a warning.
                // eslint-disable-next-line react/no-unknown-property
                fetchpriority="high"
                className="h-full w-full object-cover object-[50%_16%]"
              />
            </div>
          </figure>

          <div className="lg:col-span-8 lg:col-start-5">
            <p
              {...rise(2)}
              className="hero-rise trim-cap text-lg font-medium leading-tight text-content-primary sm:text-xl"
            >
              {profile.role}
            </p>
            <p {...rise(3)} className="hero-rise meta mt-3 text-content-secondary">
              {profile.focus.join(' · ')}
            </p>
            <p {...rise(4)} className="hero-rise meta-sm mt-3 text-content-muted">
              {profile.currentRole + ' · ' + profile.location}
            </p>
          </div>

          {/* Below the plate on small screens; beside it from lg. The plate is
              4:5 there so it, not the text beside it, sets the row height,
              and a font swap rewrapping that text cannot push this down. */}
          <div className="col-span-2 mt-8 lg:col-span-8 lg:col-start-5 lg:mt-0">
            <p {...rise(5)} className="hero-rise max-w-prose text-lg text-content-secondary lg:mt-6">
              {profile.summary}
            </p>

            <div {...rise(6)} className="hero-rise mt-8 flex flex-wrap items-center gap-3">
              <Button href="#projects" variant="solid" size="lg">
                View projects
              </Button>
              <Button href={to(profile.resumeUrl)} variant="outline" size="lg" external>
                <FiDownload className="h-3.5 w-3.5" aria-hidden="true" />
                Download resume
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </Button>
              <Button href="#contact" variant="bare" className="ml-1 px-2">
                Contact
              </Button>
            </div>

            <div {...rise(7)} className="hero-rise">
              <SocialLinks
                items={socials.filter((social) => social.icon !== 'phone')}
                className="mt-8"
              />
            </div>

            <a
              href="#about"
              className="meta tap mt-12 w-fit gap-2 text-content-muted transition-colors hover:text-accent"
            >
              <FiArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
              Continue to About
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
