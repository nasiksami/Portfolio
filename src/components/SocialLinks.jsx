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

/** `oneLine` keeps every link on a single row; labels drop to icons where they cannot fit. */
export default function SocialLinks({ items = allSocials, className = '', oneLine = false }) {
  return (
    <ul
      className={['flex items-center gap-2', oneLine ? 'flex-nowrap' : 'flex-wrap', className].join(' ')}
    >
      {items.map((social) => {
        const Icon = ICONS[social.icon] ?? FiMail;
        const isExternal = social.href.startsWith('http');
        return (
          <li key={social.label}>
            <a
              href={social.href}
              aria-label={social.label + ': ' + social.value}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="meta-sm tap gap-2 rounded-[0.35rem] border border-edge px-3 text-content-secondary transition-colors hover:border-content-primary hover:text-content-primary"
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {oneLine ? <span className="hidden whitespace-nowrap md:inline">{social.label}</span> : social.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
