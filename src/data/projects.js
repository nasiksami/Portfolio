// Project categories drive the filter control in the Projects section.
export const categories = ['All', 'AI/ML', 'Full-Stack', 'Networks'];

export const projects = [
  {
    title: 'Telecom QA RAG System',
    category: 'AI/ML',
    featured: true,
    description:
      'General-purpose LLMs answer poorly over 3GPP specifications, which are long, dense and full of domain terms. I built a telecom-specific, multi-modal RAG pipeline that pairs fine-tuned embedding models (ColBERT, Matryoshka representation learning) with Phi-2 over a ChromaDB store, and fine-tuned several open-source LLMs on telecom data. Question-answering accuracy rose 47% over the baseline, and the work was published at IEEE Globecom Workshops 2024.',
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
      'Simulated and benchmarked 5G network slices using a virtual testbed with traffic replay, analyzing how slice configuration affects resource allocation and performance.',
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
      'Incident tickets in a real-world dataset from a Canadian telecom operator are noisy and carry overlapping impact and cause labels. I built a multi-label pipeline that predicts four incident ticket types, using a BERT model with Bayesian feature selection that raised minority-class F1 by over 14%. A Phi-2 model added a further 12.7% F1 gain.',
    role: 'Co-author & Researcher',
    impact: '+14% minority-class F1, +12.7% more with Phi-2 · IEEE JSAC (2026)',
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
      'A multi-class study of cyberbullying severity. It compares BERT, CNN, HAN, RNN, BiLSTM and Text-CNN models against rule-based NLP baselines, across datasets with different class balances, to see which architectures hold up when severe cases are rare. Published as a chapter in Securing Social Networks in Cyberspace (CRC Press, 2021).',
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
      'Classified waste images into multiple categories, comparing Random Forest, Decision Tree and SVM models against CNNs, then used transfer learning to lift accuracy further. Shipped with a Streamlit demo app. The work produced two papers in the International Journal on Perceptive and Cognitive Computing (2020, 2021).',
    role: 'Lead ML Engineer',
    impact: 'Two peer-reviewed publications',
    tech: ['Random Forest', 'SVM', 'CNN', 'Transfer Learning', 'Streamlit'],
    links: {
      paper: 'https://journals.iium.edu.my/kict/index.php/IJPCC/article/view/165',
    },
  },
];
