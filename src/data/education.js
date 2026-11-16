import uofrLogo from '../assets/uofr.jpg';
import iiumLogo from '../assets/iium.jpg';

export const education = [
  {
    period: '2023 — 2025',
    degree: 'MSc in Computer Science',
    type: 'Thesis Route',
    org: 'University of Regina',
    location: 'Regina, SK, Canada',
    logo: uofrLogo,
    grade: '88.4%',
    points: [
      'Thesis: Enhancing Language Models for Telecom Networks Using Retrieval-Augmented Generation. Supervisor: Dr. Nashid Shahriar.',
      // Funding wording is fixed: the amount covers scholarships and
      // assistantships together, never scholarships alone.
      'Fully funded, with $35,000+ in scholarships and assistantships.',
    ],
  },
  {
    period: '2017 — 2021',
    degree: 'BSc in Computer Science',
    org: 'International Islamic University Malaysia',
    location: 'Kuala Lumpur, Malaysia',
    logo: iiumLogo,
    grade: 'CGPA 3.62 / 4.00',
    points: [
      'Specialization in Data Science & Computational Intelligence.',
      'Dean’s List in six of eight semesters.',
    ],
  },
];

export const awards = [
  {
    title: 'Runner-up, Intrusion and Vulnerability Detection in SDN',
    detail: 'ITU AI/ML in 5G Challenge',
    href: 'https://aiforgood.itu.int/event/ai-ml-challenge-finale-qos-prediction-network-traffic-scenario-prediction-sdn-security/',
  },
  {
    title: 'Silver rank, Specializing Large Language Models for Telecom Networks',
    detail: 'ITU AI/ML in 5G Challenge. Finalist in the top 8 of 414 participants from 59 countries.',
    href: 'https://zindi.africa/competitions/specializing-large-language-models-for-telecom-networks',
  },
  { title: 'Saskatchewan Innovation and Excellence Graduate Scholarship', period: 'Fall 2023' },
  { title: 'FGSR Graduate Teaching Assistantship', period: 'Winter 2024, Fall 2024' },
  { title: 'FGSR Graduate Student Travel Award', period: 'Fall 2024' },
  { title: 'URGSA Travel Award', period: 'Winter 2025' },
  { title: 'Fully funded graduate research scholarship', period: 'Winter 2023 — Winter 2025' },
];
