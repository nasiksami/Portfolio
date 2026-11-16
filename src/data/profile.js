import headshot from '../assets/headshot.jpg';

// Identity and summary copy. The source of truth is the current resume
// (public/Nasik_Sami_Khan_Resume.pdf): titles, dates and figures here must
// match it, and nothing is stated that the resume or a published paper does
// not support.
export const profile = {
  name: 'Nasik Sami Khan',
  role: 'AI Software Developer',
  focus: ['Machine Learning', 'LLMs & RAG', 'Agentic AI', 'Healthcare AI'],
  // The About section's heading.
  tagline: 'Machine learning and LLM systems, from research prototype to production.',
  // One sentence under the name.
  summary:
    'I build machine learning, LLM and agentic AI systems, taking them from research prototype to production in healthcare software, with published LLM and RAG research in IEEE JSAC and IEEE Globecom.',
  // Used for the meta description and structured data.
  description:
    'Nasik Sami Khan is an AI Software Developer specializing in machine learning, LLMs, RAG and agentic AI, with an MSc in Computer Science and 4+ years across healthcare AI, telecom ML research and software engineering.',
  location: 'Saskatoon, SK, Canada',
  currentRole: 'AI Software Developer at BDM Healthware',
  email: 'nasiksami@gmail.com',
  phone: '+1 (306) 502-5153',
  headshot,
  // Relative to the site root; pages resolve it with useSite().to().
  resumeUrl: 'Nasik_Sami_Khan_Resume.pdf',
};

export const bio = [
  'I am a software developer specializing in machine learning, LLMs and agentic AI, with a thesis-based MSc in Computer Science and 4+ years across healthcare AI, telecom ML research and software engineering. At BDM Healthware I lead AI projects within R&D, including medication demand-forecasting and expiry-risk models built with the Vector Institute.',
  'My LLM and RAG research is published in IEEE JSAC and IEEE Globecom, with 100+ citations. It was carried out at the University of Regina with Rogers and the Department of National Defence, and placed runner-up and silver rank in the ITU AI/ML in 5G Challenge.',
];

// A short heading for each bio paragraph above, in the same order.
export const bioLabels = ['Now', 'Research'];

// Sub-heading under the About title.
export const availability =
  'Healthcare AI at BDM Healthware, built on published research in telecom machine learning.';

// ─────────────────────────────────────────────────────────────────────────────
// STAT TILES — shown in the About section. Verified figures only:
//   publications → 8 entries in data/publications.js
//   citations    → Google Scholar (140 when last checked, 16 Nov 2026)
//   experience   → "4+ years", as on the resume
//   msc grade    → 88.4%, from data/education.js
// ─────────────────────────────────────────────────────────────────────────────
export const stats = [
  { value: '8', label: 'Publications', detail: 'Journal, conference and workshop papers, a book chapter and an MSc thesis' },
  { value: '100+', label: 'Citations', detail: 'On Google Scholar' },
  { value: '4+', label: 'Years experience', detail: 'Healthcare AI, telecom ML research and software engineering' },
  { value: '88.4%', label: 'MSc grade', detail: 'University of Regina, thesis route' },
];

export const focusAreas = [
  {
    title: 'Machine Learning',
    description:
      'Model development in PyTorch, TensorFlow and scikit-learn: time-series forecasting, BERT and CNN models, and training and evaluation on imbalanced data.',
    icon: 'brain',
  },
  {
    title: 'LLMs & RAG',
    description:
      'Retrieval-augmented generation, LoRA fine-tuning of open-source LLMs and fine-tuned embedding models, with results published in IEEE JSAC and IEEE Globecom Workshops.',
    icon: 'document',
  },
  {
    title: 'Agentic AI',
    description:
      'Daily agentic coding workflows with Claude Code and OpenAI Codex: implementation, refactoring and tests delegated to agents on isolated branches, so every change stays reviewable and reversible.',
    icon: 'code',
  },
  {
    title: 'Healthcare AI',
    description:
      'AI projects within R&D at BDM Healthware, including medication demand-forecasting and expiry-risk models built with the Vector Institute and validated on real-world hospital data.',
    icon: 'health',
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
    href: 'https://scholar.google.ca/citations?user=NCdDTeEAAAAJ',
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
