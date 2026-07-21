import uofrLogo from '../assets/uofr.jpg';
import iiumLogo from '../assets/iium.jpg';

export const education = [
  {
    period: '2023 — 2025',
    degree: 'MSc in Computer Science (Thesis)',
    org: 'University of Regina',
    location: 'Canada',
    logo: uofrLogo,
    grade: '88.40%',
    points: [
      'Awarded over $35,000 in scholarships, research assistantships, and teaching roles during the program.',
      'Published peer-reviewed research at IEEE Globecom Workshops and CNSM.',
      'Researched AI/ML for telecommunications, including NLP, retrieval-augmented generation, and 5G testbed simulation.',
      'Represented the university at global conferences including IEEE GLOBECOM 2024 in Cape Town.',
    ],
  },
  {
    period: '2017 — 2021',
    degree: 'BSc in Computer Science',
    org: 'International Islamic University Malaysia',
    location: 'Malaysia',
    logo: iiumLogo,
    grade: 'CGPA 3.62 / 4.00',
    points: [
      'Specialisation in Data Science & Computational Intelligence.',
      'Dean’s List in 6 of 8 semesters.',
      'Published 2 conference papers and 1 book chapter with Taylor & Francis.',
    ],
  },
];

// Awards and scholarships, as listed in the previous site's Resume section.
export const awards = [
  {
    title: 'Fully Funded Graduate Research Scholarship & Departmental Grant',
    period: 'Winter 2023 — Winter 2025',
  },
  {
    title: 'Runner-up — Intrusion and Vulnerability Detection in SDN',
    detail: 'ITU AI/ML in 5G Challenge',
    href: 'https://aiforgood.itu.int/event/ai-ml-challenge-finale-qos-prediction-network-traffic-scenario-prediction-sdn-security/',
  },
  {
    title: 'Silver Rank — Specializing Large Language Models for Telecom Networks',
    detail: 'ITU AI/ML in 5G Challenge',
    href: 'https://zindi.africa/competitions/specializing-large-language-models-for-telecom-networks',
  },
  { title: 'Saskatchewan Innovation and Excellence Graduate Scholarship', period: 'Fall 2023' },
  { title: 'FGSR Graduate Teaching Assistantship', period: 'Winter 2024, Fall 2024' },
  { title: 'FGSR Graduate Student Travel Award', period: 'Fall 2024' },
  { title: 'URGSA Travel Award', period: 'Winter 2025' },
];
