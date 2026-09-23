import headshot from '../assets/headshot.jpg';

export const profile = {
  name: 'Nasik Sami Khan',
  role: 'AI/ML Researcher & Full-Stack Developer',
  tagline: 'Driving innovation at the intersection of AI, ML, and software engineering.',
  summary:
    'Specializing in Generative AI, LLMs, NLP, and scalable software solutions — turning applied research into production systems.',
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
  'I am an MSc in Computer Science graduate with a proven record of translating advanced AI/ML research into impactful, production-ready solutions. My work bridges rigorous academic research and hands-on software engineering, helping organizations solve difficult technical problems and accelerate growth.',
  'I have collaborated with industry partners including Rogers and the Department of National Defence, and placed in two ITU AI/ML in 5G challenges: runner-up in SDN intrusion detection and silver in specialising LLMs for telecom. The results are measurable: a 47% gain in telecom question-answering accuracy with retrieval-augmented generation, a 22.5% F1 gain on the hardest intrusion classes, and a 37% cut in transaction processing time at DPO International.',
  'With peer-reviewed publications spanning the IEEE Journal on Selected Areas in Communications and presentations at top international conferences including IEEE GLOBECOM and CNSM, I bring depth in LLMs, scalable architectures, and end-to-end delivery across both research and production environments.',
];

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
  { value: '8', label: 'Publications', detail: 'Peer-reviewed papers & book chapters' },
  {
    value: '3+',
    label: 'Years experience',
    detail: 'Applied AI, data engineering & software',
  },
  { value: '9', label: 'Roles held', detail: 'Across industry and academia' },
  { value: '88.4%', label: 'MSc grade', detail: 'University of Regina' },
];

export const focusAreas = [
  {
    title: 'AI/ML Research',
    description:
      'Designing and deploying LLM, NLP, and generative systems — retrieval-augmented generation, fine-tuned embeddings, and applied research that ships.',
    icon: 'brain',
  },
  {
    title: 'Full-Stack Development',
    description:
      'Building scalable web applications with modern frameworks and cloud-native architecture, from first commit through production launch.',
    icon: 'code',
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Automating infrastructure, CI/CD pipelines, and containerized backend systems for high-availability workloads.',
    icon: 'cloud',
  },
  {
    title: 'Research & Writing',
    description:
      'Authoring peer-reviewed research and technical documentation, and contributing to academic peer review.',
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
