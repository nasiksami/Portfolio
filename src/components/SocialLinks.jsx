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
 * Row of social links set as monospace labels rather than icon-only buttons —
 * in this design the label is the mark.
 *
 * Because the label is visible text each link already has an accessible name;
 * `aria-label` adds the value (handle, address) that sighted visitors get from
 * the Contact ledger, and the icon stays decorative.
 */
export default function SocialLinks({ items = allSocials, className = '' }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
      {items.map((social) => {
        const Icon = ICONS[social.icon] ?? FiMail;
        const isExternal = social.href.startsWith('http');
        return (
          <li key={social.label}>
            <a
              href={social.href}
              aria-label={`${social.label}: ${social.value}`}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="link-draw meta flex items-center gap-2 text-content-secondary transition-colors hover:text-accent"
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {social.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
