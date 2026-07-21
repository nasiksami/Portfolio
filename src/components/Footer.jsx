import { navLinks, profile } from '../data/profile';
import SocialLinks from './SocialLinks';
import ColumnRules from './ColumnRules';

/** Colophon: the closing plate of the specimen. */
export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-2 border-content-primary">
      <ColumnRules />

      <div className="shell relative py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-content-secondary">
              {profile.role} based in {profile.location}.
            </p>
            <SocialLinks className="mt-7" />
          </div>

          <nav aria-label="Footer" className="lg:col-span-4 lg:col-start-9">
            <h2 className="meta-sm border-b border-edge pb-3 text-content-muted">
              Navigate
            </h2>
            <ul className="ledger grid grid-cols-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="meta-sm tap-block py-2 text-content-secondary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-sm block py-3 text-content-secondary transition-colors hover:text-accent"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Closing wordmark, set edge to edge as the final plate. */}
        <a
          href="#top"
          aria-label={`Back to top — ${profile.name}`}
          className="display mt-10 block w-full md:mt-16 text-[clamp(2rem,9vw,7.5rem)] leading-none text-content-primary transition-colors hover:text-accent"
          style={{ '--wght': 800 }}
        >
          {profile.name}
        </a>

        <div className="mt-10 flex flex-col gap-3 border-t border-edge pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="meta-sm text-content-muted">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="meta-sm text-content-muted">
            Built with React, Vite &amp; Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
