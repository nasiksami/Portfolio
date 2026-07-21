import { FiMail, FiPhone } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaGoogleScholar, FaXTwitter } from 'react-icons/fa6';
import { socials as allSocials } from '../data/profile';

const ICONS = {
  email: FiMail,
  phone: FiPhone,
  linkedin: FaLinkedinIn,
  github: FaGithub,
  scholar: FaGoogleScholar,
  x: FaXTwitter,
};

/**
 * Row of icon-only social links.
 *
 * Each link carries an aria-label because the icon alone conveys no accessible
 * name; the visible label is reserved for the Contact section's list form.
 */
export default function SocialLinks({ items = allSocials, className = '' }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map((social) => {
        const Icon = ICONS[social.icon] ?? FiMail;
        const isExternal = social.href.startsWith('http');
        return (
          <li key={social.label}>
            <a
              href={social.href}
              aria-label={`${social.label}: ${social.value}`}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-edge bg-surface-raised/60 text-content-secondary backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
