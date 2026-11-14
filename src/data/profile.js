import headshot from '../assets/headshot.jpg';

export const profile = {
  name: 'Nasik Sami Khan',
  role: 'AI Engineer & Applied Researcher',
  tagline: 'From peer-reviewed research to AI systems in production.',
  summary:
    'I build LLM and retrieval-augmented systems and take them from research to production. I lead the AI team at BDM Healthware, my research is published in IEEE JSAC, and I have placed in two ITU AI/ML in 5G challenges.',
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
  'I lead the AI team at BDM Healthware, where I design AI features for healthcare software and take them from first prototype to production. Before that I spent two years in applied AI research at the University of Regina, where I completed an MSc in Computer Science, and built enterprise software in Kuala Lumpur. That mix is the point: I can read the paper, build the pipeline, and deliver the system around it.',
  'The results are measured. A retrieval-augmented pipeline that improved a small language model’s accuracy on telecom standards by 45.2%. Incident-ticket classification for a Canadian telecom operator at 94.98% F1, published in IEEE JSAC. A 22.5% F1 improvement on the rarest attack classes in network intrusion detection. A 37% reduction in transaction processing time at DPO International. I also placed runner-up in the ITU AI/ML in 5G challenge on SDN intrusion detection, and earned silver rank in its challenge on specializing LLMs for telecom.',
  'My work is published in the IEEE Journal on Selected Areas in Communications, IEEE Globecom Workshops and CNSM, with co-authors from Rogers Communications, the University of Waterloo and Politecnico di Milano, and industry partners including the Department of National Defence. My MSc thesis developed a retrieval-augmented question-answering pipeline for telecom networks. I presented at IEEE GLOBECOM 2024 in Cape Town, and contribute to academic peer review.',
];

// A short heading for each bio paragraph above, in the same order.
export const bioLabels = ['Background', 'Results', 'Research'];

// Sub-heading under the About title. Deliberately positions the work rather
// than signalling job-seeking.
export const availability =
  'LLM and retrieval systems for healthcare and telecom, backed by eight publications and built to run in production.';

// ─────────────────────────────────────────────────────────────────────────────
// STAT TILES — shown in the About section.
//
// Each value is taken from a public record, not estimated:
//   publications  → 8 entries in data/publications.js
//   accuracy gain → 45.2% over the Phi-2 baseline, as stated in the abstracts
//                   of the Globecom Workshops paper and the MSc thesis
//   placements    → the two ITU AI/ML in 5G results in data/education.js
//   experience    → "over 3 years", matching the wording in public/resume.pdf
//
// Edit the `value` fields to change what the site displays; `label` and
// `detail` are free text.
// ─────────────────────────────────────────────────────────────────────────────
export const stats = [
  { value: '8', label: 'Publications', detail: 'Including IEEE JSAC, Globecom Workshops & CNSM' },
  {
    value: '45.2%',
    label: 'QA accuracy gain',
    detail: 'Telecom RAG pipeline over its baseline model',
  },
  { value: '2', label: 'ITU challenge placements', detail: 'Runner-up and silver rank, AI/ML in 5G' },
  {
    value: '3+',
    label: 'Years experience',
    detail: 'Applied AI, data engineering & software',
  },
];

export const focusAreas = [
  {
    title: 'LLM & RAG Systems',
    description:
      'Retrieval-augmented generation, fine-tuned embeddings and parameter-efficient tuning of small language models — built so that a domain model answers correctly, and evaluated against a baseline.',
    icon: 'brain',
  },
  {
    title: 'ML on Messy, Imbalanced Data',
    description:
      'Most real datasets are noisy and lopsided. Four of my papers are about making models work on the rare classes that matter: priority tickets, incident causes, uncommon attacks.',
    icon: 'scale',
  },
  {
    title: 'Production Engineering',
    description:
      'Data pipelines, REST APIs, microservices and containerized services on the cloud. I spent two years as a software engineer before research, and it shows in what I deliver.',
    icon: 'code',
  },
  {
    title: 'Technical Leadership',
    description:
      'Leading an AI team, setting ML engineering practice, and mentoring: more than 100 students taught one-on-one and junior researchers brought up to speed on LLM tooling.',
    icon: 'team',
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
