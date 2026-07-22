import { navLinks, profile } from '../data/profile';
import SocialLinks from './SocialLinks';
import ColumnRules from './ColumnRules';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-orbit relative isolate overflow-hidden border-t border-edge/70">
      <ColumnRules />
      <span aria-hidden="true" className="footer-orbit__ring" />

      <div className="shell relative py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-content-secondary md:text-lg">
              {profile.role} based in {profile.location}.
            </p>
            <SocialLinks className="mt-8" />
          </div>

          <nav aria-label="Footer" className="lg:col-span-4 lg:col-start-9">
            <div className="mb-5 flex items-center gap-4">
              <h2 className="eyebrow shrink-0">Navigate</h2>
              <span aria-hidden="true" className="h-px flex-1 bg-edge/70" />
            </div>
            <ul className="grid grid-cols-2 border-b border-edge/70">
              {navLinks.map((link) => (
                <li key={link.id} className="border-t border-edge/70">
                  <a
                    href={'#' + link.id}
                    className="meta-sm tap-block py-3 text-content-secondary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="border-t border-edge/70">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta-sm tap-block py-3 text-content-secondary transition-colors hover:text-accent"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <a
          href="#top"
          aria-label={'Back to top — ' + profile.name}
          className="footer-name display mt-20 block w-full text-content-primary transition-colors hover:text-accent md:mt-28"
        >
          {profile.name}
        </a>

        <div className="mt-10 flex flex-col gap-3 border-t border-edge/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
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
