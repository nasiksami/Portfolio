// Project categories drive the filter control in the Projects section.
export const categories = ['All', 'AI/ML', 'Full-Stack', 'Networks'];

export const projects = [
  {
    title: 'Telecom QA RAG System',
    category: 'AI/ML',
    featured: true,
    description:
      'General-purpose LLMs answer poorly over 3GPP specifications, which are long, dense and full of domain terms. I built a telecom-specific, multi-modal RAG pipeline around Phi-2, a small open model: document segmentation, synthetic question-answer generation, a custom fine-tuned embedding model (Matryoshka representation learning, with ColBERT retrieval) over a ChromaDB store, and incremental QLoRA fine-tuning. On the 3GPP questions of the TeleQnA benchmark, accuracy rose 45.2% over the baseline model. The work was published at IEEE Globecom Workshops 2024, earned silver rank in the ITU AI/ML in 5G challenge, and became my MSc thesis.',
    role: 'Lead Researcher & Developer',
    impact: '+45.2% QA accuracy over the baseline · IEEE Globecom Workshops 2024',
    tech: ['Python', 'RAG', 'Phi-2', 'ColBERT', 'Matryoshka', 'QLoRA', 'ChromaDB'],
    links: {
      // Published as an IEEE Globecom Workshops paper.
      paper: 'https://uregina.ca/~nss373/papers/gc-rag-khan.pdf',
    },
  },
  {
    title: 'LLM-Based Incident Management',
    category: 'AI/ML',
    featured: true,
    description:
      'Incident tickets from a Canadian telecom operator are noisy, unstructured and carry overlapping impact and cause labels, so rule-based systems and standard language models misclassify them. We built two complementary multi-label classifiers: a BERT encoder with feature selection that keeps only the semantically meaningful ticket fields, and a Phi-3.5 model with retrieval-augmented generation and a probabilistic re-ranking step that refines its label predictions. The RAG-enhanced model reaches 94.98% F1, 29% above BERT baselines on average. Published in IEEE JSAC with co-authors from Rogers Communications, the University of Waterloo and Politecnico di Milano.',
    role: 'Co-author & Researcher',
    impact: '94.98% F1, +29% over BERT baselines · IEEE JSAC 2026',
    tech: ['LLMs', 'RAG', 'Phi-3.5', 'BERT', 'PyTorch', 'Python'],
    links: {
      paper: 'https://uregina.ca/~nss373/papers/JSAC_2026.pdf',
    },
  },
  {
    title: 'Hierarchical Network Intrusion Detection',
    category: 'Networks',
    featured: true,
    description:
      'Intrusion datasets are dominated by a few common attacks, so the rare attacks are the ones models miss. We built a hierarchical system: a CNN first sorts traffic into large and small attack groups, then a ResNet-style CNN and a Random Forest classify within each group. On a real SD-WAN dataset, where some attack classes have as few as 8 samples and others have millions, it holds above 92% overall F1 and lifts minority-class F1 by 22.5% over the baselines. Published at CNC 2024.',
    role: 'Co-author & Researcher',
    impact: '92%+ overall F1 · +22.5% minority-class F1 · CNC 2024',
    tech: ['CNN', 'ResNet', 'Random Forest', 'Python'],
    links: {
      paper: 'https://uregina.ca/~nss373/papers/CNC_2024.pdf',
    },
  },
  {
    title: 'Network Ticket Classification',
    category: 'AI/ML',
    featured: false,
    description:
      'Network-change tickets from a real operator are heavily skewed: a few classes hold almost all the tickets. We built a BERT-based classifier with two token-prioritization strategies, data augmentation and class weighting, so the model attends to the tokens that separate the rare classes. It outperforms existing methods by up to 7% F1. Published at CNSM 2023.',
    role: 'Co-author & ML Engineer',
    impact: 'Up to +7% F1 over existing methods · CNSM 2023',
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
      'An e-commerce platform that connects local artisans with customers worldwide. I built it in Django with a layered architecture, with seller and buyer portals, and added semantic product search over a Qdrant vector database, so shoppers find products by meaning rather than exact keywords.',
    role: 'Full-Stack Developer',
    impact: 'Semantic product search over a vector database',
    tech: ['Django', 'Python', 'JavaScript', 'Qdrant', 'HTML', 'CSS'],
    links: {},
  },
  {
    title: '5G Slice Benchmarking',
    category: 'Networks',
    featured: false,
    description:
      'I built a virtual 5G testbed with free5GC and UERANSIM in Docker, replayed traffic through it, and monitored every slice with Prometheus and Grafana to measure how slice configuration shapes resource allocation and performance.',
    role: 'Network Research Engineer',
    tech: ['free5GC', 'UERANSIM', 'Docker', 'Prometheus', 'Grafana'],
    links: {},
  },
  {
    title: 'Cyberbullying Severity Detection',
    category: 'AI/ML',
    featured: false,
    description:
      'A multi-class study of cyberbullying severity. It compares BERT, CNN, HAN, RNN, BiLSTM and Text-CNN models against rule-based NLP baselines, across datasets with different class balances, to see which architectures hold up when severe cases are rare. Published as a chapter in Securing Social Networks in Cyberspace (CRC Press, 2021).',
    role: 'Researcher',
    impact: 'Book chapter · CRC Press (Taylor & Francis), 2021',
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
    impact: 'Two peer-reviewed papers · IJPCC 2020, 2021',
    tech: ['Random Forest', 'SVM', 'CNN', 'Transfer Learning', 'Streamlit'],
    links: {
      paper: 'https://journals.iium.edu.my/kict/index.php/IJPCC/article/view/165',
      repo: 'https://github.com/nasiksami/Waste-Management-Using-Transfer-Learning-Models',
    },
  },
];
