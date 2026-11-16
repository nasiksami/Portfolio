import { navLinks, profile } from '../data/profile';
import SocialLinks from './SocialLinks';
import HorizonRule from './HorizonRule';
import { ARC, skyProps } from '../sky';
import { useSite } from '../site';

/**
 * The last of the ground. Below the final horizon rule a slim strip of sky
 * closes the page where it began.
 */
export default function Footer() {
  const { home, to } = useSite();

  return (
    <footer {...skyProps(ARC.footer)} className="relative">
      <div className="bg-surface-raised">
        <div className="shell pb-10 pt-6 md:pb-14">
          <div className="grid gap-12 border-t border-edge pt-12 xl:grid-cols-12 xl:gap-8">
            <div className="xl:col-span-8">
              <SocialLinks oneLine />
            </div>

            <nav aria-label="Footer" className="xl:col-span-4 xl:col-start-9">
              <div className="mb-5 flex items-center gap-4">
                <h2 className="eyebrow shrink-0">Navigate</h2>
                <span aria-hidden="true" className="h-px flex-1 bg-edge" />
              </div>
              <ul className="grid grid-cols-2 border-b border-edge">
                {navLinks.map((link) => (
                  <li key={link.id} className="border-t border-edge">
                    <a
                      href={home(link.id)}
                      className="meta-sm tap-block py-3 text-content-secondary transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="border-t border-edge">
                  <a
                    href={to(profile.resumeUrl)}
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
        </div>
      </div>

      <HorizonRule />

      <div className="shell py-6">
        <p className="meta-sm text-content-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
