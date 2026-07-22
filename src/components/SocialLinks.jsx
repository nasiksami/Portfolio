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

export default function SocialLinks({ items = allSocials, className = '' }) {
  return (
    <ul className={['flex flex-wrap items-center gap-2', className].join(' ')}>
      {items.map((social) => {
        const Icon = ICONS[social.icon] ?? FiMail;
        const isExternal = social.href.startsWith('http');
        return (
          <li key={social.label}>
            <a
              href={social.href}
              aria-label={social.label + ': ' + social.value}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="meta-sm tap gap-2 rounded-full border border-edge/70 bg-surface-base/45 px-3 text-content-secondary transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
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
