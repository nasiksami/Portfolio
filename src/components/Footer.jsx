import { navLinks, profile } from '../data/profile';
import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="relative border-t border-edge bg-surface-raised/30">
      <div className="mx-auto max-w-content px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <a
              href="#top"
              className="font-display text-lg font-bold tracking-tight text-content-primary"
            >
              Nasik<span className="text-accent">.</span>
            </a>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">
              {profile.role} based in {profile.location}.
            </p>
            <SocialLinks className="mt-5" />
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-3 text-xs uppercase tracking-wider text-content-muted">
              Navigate
            </h2>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="rounded text-sm text-content-secondary transition-colors hover:text-accent"
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
                  className="rounded text-sm text-content-secondary transition-colors hover:text-accent"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-edge pt-6 sm:flex-row">
          <p className="text-xs text-content-muted">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="text-xs text-content-muted">Built with React, Vite & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
