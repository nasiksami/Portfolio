import headshot from '../assets/headshot.jpg';

export const profile = {
  name: 'Nasik Sami Khan',
  role: 'AI/ML Researcher & Full-Stack Developer',
  tagline: 'Driving innovation at the intersection of AI, ML, and software engineering.',
  summary:
    'AI Team Lead and published researcher specializing in Generative AI, LLMs, and NLP — turning advanced research into production systems that deliver measurable impact.',
  location: 'Saskatoon, SK, Canada',
  // Shown as the hero badge — states current standing rather than availability.
  currentRole: 'AI Team Lead at BDM Healthware',
  headshot,
  // Relative, not root-absolute: the site has to work both at a domain root
  // (nasik.ca) and under a subdirectory (GitHub Pages preview). Vite's
  // base: './' only rewrites imported assets, not string literals like this.
  resumeUrl: './resume.pdf',
  siteUrl: 'https://nasik.ca/',
};

export const bio = [
  'I lead the AI team at BDM Healthware, where I architect and deliver AI solutions for healthcare software. With an MSc in Computer Science from the University of Regina and over three years of experience across healthcare, telecom and research, I own the full path from research to production: large language models and retrieval-augmented generation, the data pipelines behind them, and the software that delivers them at scale.',
  'My research, conducted with industry leaders including Rogers and the Department of National Defence, delivers results that can be measured: a 47% improvement in telecom question-answering accuracy with retrieval-augmented generation, a 22.5% F1 improvement on minority intrusion classes, and a 37% reduction in transaction processing time at DPO International. On the global stage, I placed runner-up in the ITU AI/ML in 5G challenge on SDN intrusion detection and earned silver rank in its challenge on specializing LLMs for telecom.',
  'My work is published in the IEEE Journal on Selected Areas in Communications, a leading journal in its field, as well as IEEE Globecom Workshops and CNSM. My MSc thesis delivered a retrieval-augmented question-answering pipeline for telecom networks. I have presented on the international stage, including IEEE GLOBECOM 2024 in Cape Town, and I serve as an academic peer reviewer.',
];

// A short heading for each bio paragraph above, in the same order.
export const bioLabels = ['Background', 'Results', 'Research'];

// Sub-heading under the About title. Deliberately positions the work rather
// than signalling job-seeking.
export const availability =
  'Working across AI/ML, cloud, and telecom — from peer-reviewed research to systems in production.';

// ─────────────────────────────────────────────────────────────────────────────
// STAT TILES — shown in the About section.
//
// These defaults are derived strictly from content already in this repo:
//   publications  → 8 entries in data/publications.js
//   experience    → "over 3 years", matching the wording in public/resume.pdf
//                   so the site and the PDF never contradict each other
//   roles         → 9 entries in data/experience.js
//   msc grade     → 88.40%, from data/education.js
//
// Nothing here is estimated or rounded up. Edit the `value` fields to change
// what the site displays; `label` and `detail` are free text.
// ─────────────────────────────────────────────────────────────────────────────
export const stats = [
  { value: '8', label: 'Publications', detail: 'IEEE papers, a book chapter & an MSc thesis' },
  {
    value: '3+',
    label: 'Years experience',
    detail: 'Applied AI, data engineering & software',
  },
  { value: '9', label: 'Roles held', detail: 'Across industry, research and teaching' },
  { value: '88.4%', label: 'MSc grade', detail: 'University of Regina' },
];

export const focusAreas = [
  {
    title: 'AI/ML Research',
    description:
      'Leading the design and deployment of LLM, NLP, and generative AI systems — retrieval-augmented generation, fine-tuned embeddings, and published research that ships to production.',
    icon: 'brain',
  },
  {
    title: 'Full-Stack Development',
    description:
      'Architecting and delivering scalable web applications with modern frameworks and cloud-native design, owning them from first commit through production launch.',
    icon: 'code',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Engineering automated infrastructure, CI/CD pipelines, and containerized backend systems built for high-availability workloads.',
    icon: 'cloud',
  },
  {
    title: 'Research & Writing',
    description:
      'Publishing peer-reviewed research in leading IEEE venues, presenting it internationally, and serving as an academic peer reviewer.',
    icon: 'document',
  },
];

export const socials = [
  { label: 'Email', value: 'nasiksami@gmail.com', href: 'mailto:nasiksami@gmail.com', icon: 'email' },
  { label: 'Phone', value: '+1 (306) 502-5153', href: 'tel:+13065025153', icon: 'phone' },
  { label: 'LinkedIn', value: 'in/nasiksami', href: 'https://www.linkedin.com/in/nasiksami', icon: 'linkedin' },
  { label: 'GitHub', value: 'nasiksami', href: 'https://github.com/nasiksami', icon: 'github' },
  {
    label: 'Google Scholar',
    value: 'Scholar profile',
    href: 'https://scholar.google.com/citations?hl=en&user=NCdDTeEAAAAJ',
    icon: 'scholar',
  },
  { label: 'X', value: '@NasikSami', href: 'https://x.com/NasikSami', icon: 'x' },
];

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];
