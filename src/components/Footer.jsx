import { navLinks, profile } from '../data/profile';
import SocialLinks from './SocialLinks';
import HorizonRule from './HorizonRule';
import { ARC, skyProps } from '../sky';

/**
 * The last of the ground. Below the final horizon rule a slim strip of sky
 * closes the page where it began.
 */
export default function Footer() {
  return (
    <footer {...skyProps(ARC.footer)} className="relative">
      <div className="bg-surface-raised">
        <div className="shell pb-10 pt-6 md:pb-14">
          <div className="grid gap-12 border-t border-edge pt-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="max-w-md text-lg text-content-secondary">
                {profile.role} based in {profile.location}.
              </p>
              <SocialLinks className="mt-8" />
            </div>

            <nav aria-label="Footer" className="lg:col-span-4 lg:col-start-9">
              <div className="mb-5 flex items-center gap-4">
                <h2 className="eyebrow shrink-0">Navigate</h2>
                <span aria-hidden="true" className="h-px flex-1 bg-edge" />
              </div>
              <ul className="grid grid-cols-2 border-b border-edge">
                {navLinks.map((link) => (
                  <li key={link.id} className="border-t border-edge">
                    <a
                      href={'#' + link.id}
                      className="meta-sm tap-block py-3 text-content-secondary transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="border-t border-edge">
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
