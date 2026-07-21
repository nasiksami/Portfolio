import headshot from '../assets/headshot.jpg';

export const profile = {
  name: 'Nasik Sami Khan',
  role: 'AI/ML Researcher & Full-Stack Developer',
  tagline: 'Driving innovation at the intersection of AI, ML, and software engineering.',
  summary:
    'Specializing in Generative AI, LLMs, NLP, and scalable software solutions — turning applied research into production systems.',
  location: 'Saskatoon, SK, Canada',
  headshot,
  resumeUrl: '/resume.pdf',
  siteUrl: 'https://nasik.ca/',
};

export const bio = [
  'I am an MSc in Computer Science graduate with a proven record of translating advanced AI/ML research into impactful, production-ready solutions. My work bridges rigorous academic research and hands-on software engineering, helping organizations solve difficult technical problems and accelerate growth.',
  'I have collaborated with industry partners including Rogers and the Department of National Defence, and earned recognition in global AI/ML competitions run by the ITU. My work has delivered measurable results: a 47% QA accuracy improvement in telecom RAG systems, a 22% F1 gain in intrusion detection, and a 40% improvement in microservices performance at DPO International.',
  'With peer-reviewed publications and presentations at top international conferences including IEEE GLOBECOM and CNSM, I bring depth in LLMs, scalable architectures, and end-to-end delivery across both research and production environments.',
];

export const availability =
  'Open to opportunities in AI/ML, cloud, telecom, and software engineering.';

// ─────────────────────────────────────────────────────────────────────────────
// STAT TILES — shown in the About section.
//
// These defaults are derived strictly from content already in this repo:
//   publications  → 6 entries in data/publications.js
//   experience    → first professional role began Feb 2021 (DHL Express)
//   roles         → 9 entries in data/experience.js
//   msc grade     → 88.40%, from data/education.js
//
// Nothing here is estimated or rounded up. Edit the `value` fields to change
// what the site displays; `label` and `detail` are free text.
// ─────────────────────────────────────────────────────────────────────────────
export const stats = [
  { value: '6', label: 'Publications', detail: 'Peer-reviewed papers & book chapters' },
  { value: '5+', label: 'Years experience', detail: 'Research and industry, since 2021' },
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
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'publications', label: 'Publications' },
  { id: 'contact', label: 'Contact' },
];
