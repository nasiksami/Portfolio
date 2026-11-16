import bdmLogo from '../assets/bdm.png';
import uofrLogo from '../assets/uofr.jpg';
import dpoLogo from '../assets/dpo.png';
import dhlLogo from '../assets/dhl.webp';

// Titles, dates and wording follow the current resume. An entry has either
// `points` (bullets), `roles` (several titles held at one organisation, each
// with its own dates), or both. `summary` is a lead-in line above them.
//
// BDM Healthware: no metrics, team sizes, client names or internal design
// details beyond what is written here.
export const experience = [
  {
    period: 'Sep 2025 — Present',
    current: true,
    title: 'AI Software Developer',
    org: 'BDM Healthware Inc.',
    location: 'Saskatoon, SK, Canada',
    logo: bdmLogo,
    type: 'Industry',
    points: [
      'Lead AI projects within R&D, taking ML features from research prototype to production, integrated securely into BDM’s software for hospitals, pharmacies and long-term care across North America.',
      'Served as AI & Technical Lead for BDM’s four-month Vector Institute DaRMoD cohort (Summer 2026), designing a predictive analytics platform for hospital medication inventory and Hospital-to-Home insights, with demand-forecasting and expiry-risk models validated on real-world hospital data.',
      'Prototype retrieval-augmented LLM applications, building on prior research in telecom question answering.',
      'Built reproducible Python pipelines for preprocessing, training and inference (DuckDB, Streamlit), with scripted load, verification and rebuild steps.',
      'Build with agentic coding workflows daily (Claude Code, OpenAI Codex), delegating implementation, refactoring and tests to agents on isolated branches so every change stays reviewable and reversible.',
      'Mentor developers, run AI/ML knowledge-sharing sessions, and set team practices for ML engineering, testing and model monitoring.',
    ],
  },
  {
    period: 'Jan 2023 — May 2025',
    title: 'Graduate Research Assistant, Networking Lab',
    org: 'University of Regina',
    location: 'Regina, SK, Canada',
    logo: uofrLogo,
    type: 'Research',
    summary:
      'Telecom ML research in NLP, RAG and agentic AI with Rogers and the Department of National Defence. Supervisor: Dr. Nashid Shahriar.',
    // Every figure below is quoted from the published paper named with it.
    points: [
      'Telecom question answering (MSc thesis, IEEE Globecom Workshops 2024): raised Phi-2 accuracy on 3GPP multiple-choice questions from 21.8% to 67.0%, a gain of 45.2 percentage points, with a RAG pipeline that pairs fine-tuned Matryoshka embeddings and ChromaDB with LoRA fine-tuning.',
      'Incident management with LLMs (IEEE JSAC 2026): predicted network impact, service impact and root cause from real operator incident tickets. A RAG-enhanced Phi-3.5 model with probabilistic re-ranking reached 94.98% F1, against 79.20% for the encoder-only model.',
      'Network-change ticket classification (CNSM 2023): trained BERT under severe class imbalance with token prioritization, data augmentation and class weighting, reaching up to 7% higher F1 than existing methods.',
      'Hierarchical intrusion detection (IEEE ICNC 2024): reached 92%+ F1 on real SD-WAN data, and 22.5% higher F1 on minority attack groups.',
      'ITU AI/ML in 5G Challenge: runner-up in SDN intrusion detection, and silver rank in specializing LLMs for telecom, as a finalist in the top 8 of 414 participants from 59 countries.',
    ],
  },
  {
    period: 'Sep 2021 — Jan 2023',
    title: 'Software Engineer',
    org: 'D.P.O. International Sdn Bhd',
    location: 'Kuala Lumpur, Malaysia',
    logo: dpoLogo,
    type: 'Industry',
    points: [
      'Cut transaction processing time by 37% by integrating microservices into CAPSUL, the company’s central data management system (ASP.NET, C#, SQL Server).',
      'Built REST APIs and RabbitMQ messaging between distributed services, added Elasticsearch for faster search, and migrated the platform from ASP.NET 5 MVC to current .NET and Entity Framework.',
    ],
  },
  {
    period: 'Feb 2021 — Aug 2021',
    title: 'Software Engineer Intern, Business Process Optimization',
    org: 'DHL Asia Pacific Shared Service Centre',
    location: 'Kuala Lumpur, Malaysia',
    logo: dhlLogo,
    type: 'Industry',
    points: [
      'Built internal web systems (ASP.NET WebForms and MVC, C#, SQL Server) to deliver business change requests.',
      'Replaced legacy Excel VBA macros with .NET web applications and resolved production issues in internal tools.',
    ],
  },
  {
    period: 'Jan 2023 — Apr 2025',
    title: 'Teaching and academic support',
    org: 'University of Regina',
    location: 'Regina, SK, Canada',
    logo: uofrLogo,
    type: 'Teaching',
    roles: [
      { title: 'Lab Instructor, Object-Oriented Design', period: 'Jan 2025 — Apr 2025' },
      { title: 'Teaching Assistant, nine courses', period: 'Jan 2023 — Apr 2025' },
      {
        title: 'Computer Science Skills Tutor, Global Learning Centre',
        period: 'Aug 2023 — Mar 2025',
        note: '100+ students tutored.',
      },
      { title: 'Classroom Technical Support', period: 'Jan 2024 — Apr 2024' },
      { title: 'Student Research Assistant', period: 'May 2023 — Aug 2023' },
    ],
  },
];
