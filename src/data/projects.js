// Project categories drive the filter control in the Projects section.
export const categories = ['All', 'AI/ML', 'Full-Stack', 'Networks'];

export const projects = [
  {
    title: 'Telecom QA RAG System',
    category: 'AI/ML',
    featured: true,
    description:
      'A telecom-specific multi-modal RAG pipeline combining fine-tuned embedding models with LLMs to improve question-answering accuracy over 3GPP specification documents.',
    role: 'Lead Researcher & Developer',
    impact: '47% improvement in QA accuracy',
    tech: ['Python', 'LLMs', 'ColBERT', 'Matryoshka', 'Phi-2', 'ChromaDB'],
    links: {
      // Published as an IEEE Globecom Workshops paper.
      paper: 'https://uregina.ca/~nss373/papers/gc-rag-khan.pdf',
    },
  },
  {
    title: '5G Slice Benchmarking',
    category: 'Networks',
    featured: true,
    description:
      'Simulated and benchmarked 5G network slices using a virtual testbed with traffic replay, analysing how slice configuration affects resource allocation and performance.',
    role: 'Network Research Engineer',
    impact: 'Benchmarked resource allocation across slice configurations',
    tech: ['free5GC', 'UERANSIM', 'Docker', 'Prometheus', 'Grafana'],
    links: {},
  },
  {
    title: 'LLM-Based Incident Management',
    category: 'AI/ML',
    featured: true,
    description:
      'Automated multi-label classification of telecom incident management tickets, pairing a BERT encoder using relevance-guided feature selection with an LLM-based approach to handle noisy text and overlapping impact and cause categories.',
    role: 'Co-author & Researcher',
    impact: 'Published in IEEE JSAC (2026)',
    tech: ['LLMs', 'BERT', 'NLP', 'Python', 'PyTorch'],
    links: {
      paper: 'https://uregina.ca/~nss373/papers/JSAC_2026.pdf',
    },
  },
  {
    title: 'Network Ticket Classification',
    category: 'AI/ML',
    featured: false,
    description:
      'A BERT-based NLP model using token prioritization, data augmentation, and class weighting to classify telecom network-change tickets into priority categories under severe class imbalance.',
    role: 'Co-author & ML Engineer',
    impact: 'Improved automated issue triaging accuracy',
    tech: ['BERT', 'NLP', 'Python', 'PyTorch'],
    links: {
      paper: 'https://uregina.ca/~nss373/papers/NCT_CNSM_2023.pdf',
    },
  },
  {
    title: 'Heritage Hive',
    category: 'Full-Stack',
    featured: true,
    description:
      'An e-commerce platform connecting local sellers with global customers, built with layered design patterns and AI-powered semantic product search over a vector database.',
    role: 'Full-Stack Developer',
    impact: 'Enabled global reach for local sellers',
    tech: ['Django', 'Python', 'JavaScript', 'Qdrant', 'HTML', 'CSS'],
    links: {},
  },
  {
    title: 'Cyberbullying Severity Detection',
    category: 'AI/ML',
    featured: false,
    description:
      'Research comparing BERT, CNN, HAN, RNN, BiLSTM and Text-CNN architectures against rule-based NLP baselines to classify the severity of hate speech across varied class-balance conditions.',
    role: 'Researcher',
    impact: 'Published as a Taylor & Francis book chapter',
    tech: ['BERT', 'CNN', 'HAN', 'BiLSTM', 'Text-CNN', 'NLP'],
    links: {
      paper:
        'https://www.taylorfrancis.com/chapters/edit/10.1201/9781003134527-11/cyberbullying-severity-detection-using-deep-learning-techniques-sharyar-wani-khan-nasik-sami-zian-md-afique-amin-yonis-gulzar',
    },
  },
  {
    title: 'Waste Classification with ML/DL',
    category: 'AI/ML',
    featured: false,
    description:
      'Classified waste images into multiple categories using Random Forest, Decision Tree, SVM and CNN models, applying transfer learning to lift detection accuracy. Shipped with a Streamlit demo app.',
    role: 'Lead ML Engineer',
    impact: 'Two peer-reviewed publications',
    tech: ['Random Forest', 'SVM', 'CNN', 'Transfer Learning', 'Streamlit'],
    links: {
      paper: 'https://journals.iium.edu.my/kict/index.php/IJPCC/article/view/165',
    },
  },
];
