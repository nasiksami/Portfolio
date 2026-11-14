import bdmLogo from '../assets/bdm.png';
import uofrLogo from '../assets/uofr.jpg';
import dpoLogo from '../assets/dpo.png';
import dhlLogo from '../assets/dhl.webp';

export const experience = [
  {
    period: 'Sep 2025 — Present',
    current: true,
    title: 'AI Team Lead (AI Software Developer)',
    org: 'BDM Healthware Inc.',
    location: 'Saskatoon, SK, Canada',
    logo: bdmLogo,
    type: 'Industry',
    points: [
      'Lead the AI team within R&D: we integrate AI into BDM’s healthcare software and build AI-powered healthcare applications from the ground up for external clients.',
      'Take AI/ML models from research to production, and own the data pipelines for preprocessing, training and inference that keep them reliable at scale in the cloud.',
      'Work with clinical experts, product managers, engineers and customers to turn clinical and business requirements into AI features that improve patient care workflows.',
      'Evaluate new AI techniques and decide what is ready to ship, keeping every deployment ethical, secure and compliant for healthcare settings.',
      'Mentor developers and set the team’s practices for ML engineering, testing and model monitoring.',
    ],
  },
  {
    period: 'Jan 2023 — May 2025',
    title: 'Graduate Research Assistant',
    org: 'University of Regina',
    location: 'Regina, SK, Canada',
    logo: uofrLogo,
    type: 'Research',
    points: [
      'Built a retrieval-augmented question-answering pipeline for 3GPP telecom standards that raised the Phi-2 model’s accuracy by 45.2% over its baseline. Published at IEEE Globecom Workshops 2024, with silver rank in the ITU AI/ML in 5G challenge on specializing LLMs for telecom.',
      'Co-developed LLM-based classification of incident tickets from a Canadian telecom operator, reaching 94.98% F1 with a RAG-enhanced model. Published in the IEEE Journal on Selected Areas in Communications.',
      'Co-built a hierarchical intrusion detection system, combining CNNs with a Random Forest, that holds above 92% overall F1 and improves minority-class F1 by 22.5%. Placed runner-up in the ITU AI/ML in 5G challenge on SDN intrusion detection.',
      'Conducted this research in the Networking Lab under Dr. Nashid Shahriar, with industry partners including Rogers and the Department of National Defence.',
      'Simulated 5G network testbeds to evaluate and improve network performance and security.',
      'Presented at international conferences including IEEE GLOBECOM 2024, and contributed to academic peer review.',
      'Mentored junior researchers in adopting LLM and ML tools, in line with industry practice.',
    ],
  },
  {
    // Lab Instructor (Jan–Apr 2025), Teaching Assistant (Jan 2023–Apr 2025),
    // Computer Science Skills Tutor at the Global Learning Centre (Aug 2023–
    // Mar 2025) and Classroom Technical Support (Jan–Apr 2024), as one entry.
    period: 'Jan 2023 — Apr 2025',
    title: 'Lab Instructor, Teaching Assistant & CS Tutor',
    org: 'University of Regina',
    location: 'Regina, SK, Canada',
    logo: uofrLogo,
    type: 'Teaching',
    points: [
      'Mentored more than 100 undergraduate computer science students one-on-one at the Global Learning Centre, through assignments, projects and career roadmaps, contributing to a 100% pass rate.',
      'Taught weekly Object-Oriented Design labs as lab instructor, and supported instruction and assessment as teaching assistant across nine courses (CS110, CS215, CS265, CS330, CS335, CS350, CS372, ENSE 472, ENSE 885BD).',
      'Graded assignments and projects, invigilated 10+ exams, and worked with course instructors on lab activities and assessments.',
      'Provided classroom technical support for hybrid learning across multiple course sections, serving 200+ students.',
    ],
  },
  {
    period: 'Sep 2021 — Jan 2023',
    title: 'Software Engineer',
    org: 'DPO International',
    location: 'Kuala Lumpur, Malaysia',
    logo: dpoLogo,
    type: 'Industry',
    points: [
      'Cut transaction processing time by 37% by integrating microservices, and built the REST APIs that connect them for real-time transactions.',
      'Built CAPSUL, the company’s central database management system, across the full stack in ASP.NET, C# and Microsoft SQL Server.',
      'Applied middleware (RabbitMQ, MassTransit) on Docker to keep data consistent between distributed services.',
      'Partnered with vendors to introduce Elasticsearch, improving search and system reliability.',
      'Migrated ASP.NET 5 MVC to the latest stable .NET and Entity Framework releases.',
      'Performed application and system testing, and maintained integrations across multiple applications.',
    ],
  },
  {
    period: 'Feb 2021 — Aug 2021',
    title: 'Software Engineer, Business Process Optimization (Intern)',
    org: 'DHL Asia Pacific Shared Service Centre',
    location: 'Kuala Lumpur, Malaysia',
    logo: dhlLogo,
    type: 'Industry',
    points: [
      'Converted legacy Excel VBA macros into maintainable .NET web applications.',
      'Built web systems in ASP.NET WebForms and MVC, C# and MS SQL to deliver new change requests.',
      'Supported and enhanced internal IT applications, resolving IT tickets to keep downtime minimal.',
    ],
  },
];
