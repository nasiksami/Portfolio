// Project categories drive the filter control in the Projects section.
export const categories = ['All', 'AI/ML', 'Full-Stack', 'Networks'];

// Every card has the same shape: a one-line problem, the approach, one
// result, the stack, and links. `result` is a figure from the paper linked
// beside it, or a plain statement of what was built where no figure is
// published. A link appears only where it exists:
//   caseStudy → slug of a page under /projects/ (see data/caseStudies.js)
//   paper     → the publisher's record or a public author copy
//   code      → a public repository
// The three flagship projects come first, in this order.
export const projects = [
  {
    title: 'Telecom QA RAG System',
    category: 'AI/ML',
    featured: true,
    role: 'First author',
    problem:
      'General-purpose LLMs answer poorly over 3GPP specifications, which are long, dense and full of domain terms.',
    approach:
      'A RAG pipeline around Phi-2: 3GPP documents segmented into chunks, an embedding model fine-tuned with Matryoshka representation learning on synthetic question-answer pairs, a ChromaDB store, and Phi-2 fine-tuned with LoRA.',
    result: 'Accuracy raised from 21.8% for the baseline Phi-2 to 67.0%, a gain of 45.2 percentage points',
    source: 'IEEE Globecom Workshops 2024',
    tech: ['Python', 'Phi-2', 'RAG', 'LoRA', 'Matryoshka', 'ColBERT', 'ChromaDB', 'LangChain'],
    links: {
      caseStudy: 'telecom-rag',
      paper: 'https://doi.org/10.1109/GCWkshp64532.2024.11100791',
    },
  },
  {
    title: 'LLM-Based Incident Management',
    category: 'AI/ML',
    featured: true,
    role: 'Co-author',
    problem:
      'Incident tickets from a telecom operator are noisy, unstructured and imbalanced, yet each one needs several impact and cause labels before it can be resolved.',
    approach:
      'Multi-label prediction of network impact, service impact and root cause, comparing an encoder-only BERT model against Phi-3.5 enhanced with retrieval-augmented generation and probabilistic re-ranking of the retrieved tickets.',
    result: '94.98% F1 with RAG-enhanced Phi-3.5 and probabilistic re-ranking, against 79.20% for the encoder-only model',
    source: 'IEEE JSAC 2026',
    tech: ['Python', 'Phi-3.5', 'RAG', 'BERT', 'PyTorch', 'NLP'],
    links: {
      caseStudy: 'incident-management',
      paper: 'https://doi.org/10.1109/JSAC.2026.3680419',
    },
  },
  {
    title: 'Heritage Hive',
    category: 'Full-Stack',
    featured: true,
    role: 'Co-developer, team of three',
    problem:
      'Artisans in isolated or rural locations have little access to customers beyond their local market.',
    approach:
      'A Django e-commerce platform with buyer and seller portals, cart, checkout and orders, category subscriptions that email subscribers about new products, and semantic product search over a Qdrant vector index.',
    result: 'Semantic search that matches products by meaning, using sentence-transformer embeddings in Qdrant',
    tech: ['Django', 'Python', 'JavaScript', 'Qdrant', 'Sentence Transformers', 'SQLite'],
    links: {
      caseStudy: 'heritage-hive',
      code: 'https://github.com/nasiksami/Heritage_Hive',
    },
  },
  {
    title: 'Network-Change Ticket Classification',
    category: 'AI/ML',
    featured: false,
    role: 'Co-author',
    problem:
      'Network-change tickets must be sorted into categories, but a few categories hold almost all of the examples.',
    approach:
      'A BERT classifier trained with token prioritization, data augmentation and class weighting to hold up under severe class imbalance.',
    result: 'Up to 7% higher F1 than existing methods',
    source: 'IEEE/ACM/IFIP CNSM 2023',
    tech: ['BERT', 'NLP', 'Python', 'PyTorch'],
    links: {
      paper: 'https://dl.ifip.org/db/conf/cnsm/cnsm2023/1570931597.pdf',
    },
  },
  {
    title: '5G Slice Benchmarking',
    category: 'Networks',
    featured: false,
    role: 'Graduate research',
    problem: 'How a 5G network slice is configured decides how its resources are shared and how it performs.',
    approach:
      'A virtual 5G testbed built with free5GC and UERANSIM, with network slices benchmarked under replayed traffic.',
    result: 'Benchmarked resource allocation across slice configurations',
    tech: ['free5GC', 'UERANSIM', 'Docker', 'Prometheus', 'Grafana'],
    links: {},
  },
  {
    title: 'Cyberbullying Severity Detection',
    category: 'AI/ML',
    featured: false,
    role: 'Co-author',
    problem: 'Severe cyberbullying is rare in real data, which makes it the hardest class to detect.',
    approach:
      'A multi-class study comparing BERT, CNN, HAN, RNN, BiLSTM and Text-CNN models against rule-based NLP baselines, across datasets with different class balances.',
    result: 'Published as a chapter in Securing Social Networks in Cyberspace',
    source: 'CRC Press, 2021',
    tech: ['BERT', 'CNN', 'HAN', 'BiLSTM', 'Text-CNN', 'NLP'],
    links: {
      paper: 'https://doi.org/10.1201/9781003134527-11',
    },
  },
  {
    title: 'Waste Classification with ML/DL',
    category: 'AI/ML',
    featured: false,
    role: 'Co-author',
    problem: 'Sorting waste by hand is slow, and automating it needs a classifier that works from images.',
    approach:
      'Waste images classified into multiple categories, comparing Random Forest, Decision Tree and SVM models against CNNs, then applying transfer learning.',
    result: 'Two peer-reviewed papers in the International Journal on Perceptive and Cognitive Computing',
    source: 'IJPCC 2020 and 2021',
    tech: ['Random Forest', 'SVM', 'CNN', 'Transfer Learning', 'Streamlit'],
    links: {
      paper: 'https://doi.org/10.31436/ijpcc.v6i2.165',
    },
  },
];
