// Case studies for the three flagship projects, one page each under
// /projects/<slug>/.
//
// Rules for this file:
//   • Research case studies state only what the linked paper states; every
//     figure is quoted from it. Heritage Hive states only what its public
//     repository shows.
//   • `diagram` lists the components named in that source, in order. The page
//     draws it as an accessible list of steps, not an image.
//   • Co-authored work is described as co-authored.

export const caseStudies = [
  {
    slug: 'telecom-rag',
    title: 'Telecom QA RAG System',
    kicker: 'IEEE Globecom Workshops 2024 · MSc thesis',
    summary:
      'A retrieval-augmented generation pipeline that raised the Phi-2 model’s accuracy on telecom standards questions from 21.8% to 67.0%.',
    description:
      'Case study: a RAG pipeline with fine-tuned Matryoshka embeddings, ChromaDB and LoRA fine-tuning that raised Phi-2 accuracy on 3GPP questions from 21.8% to 67.0%. IEEE Globecom Workshops 2024.',
    facts: [
      { label: 'Role', value: 'First author' },
      { label: 'Published', value: 'IEEE Globecom Workshops, 2024' },
      { label: 'Setting', value: 'Networking Lab, University of Regina' },
      { label: 'Task', value: 'Multiple-choice question answering over 3GPP standards' },
    ],
    stack: ['Python', 'Phi-2', 'RAG', 'LoRA', 'Matryoshka embeddings', 'ChromaDB', 'LangChain', 'ColBERT'],
    problem: [
      'General-purpose language models lack the specialized knowledge needed to reason about telecom protocols and standards. 3GPP specifications are long and dense, and questions about them are full of domain acronyms.',
      'The task came from the ITU AI/ML in 5G Challenge: answer multiple-choice questions from the TeleQnA dataset using a small open model. The paper works with 1,827 multiple-choice questions built from 3GPP standard documents and uses Phi-2, chosen because it is less resource-intensive than the alternative allowed by the challenge.',
    ],
    contribution: [
      'I am the first author of the paper, written with M. M. Hasan, M. S. Towhid, S. Basnet and N. Shahriar in the Networking Lab at the University of Regina. The same line of work became my MSc thesis.',
      'The paper contributes to all three parts of a RAG pipeline: retrieval, through an embedding model fine-tuned on generated question-answer pairs; augmentation, through a prompt designed around how Phi-2 was trained; and generation, through incremental fine-tuning of Phi-2 on the 3GPP documents.',
    ],
    diagram: {
      caption:
        'The pipeline as described in the paper: documents are prepared once, then each question is answered from retrieved context.',
      lanes: [
        {
          title: 'Preparing the knowledge base',
          steps: [
            { name: '3GPP documents', detail: '554 standards documents supplied for the challenge' },
            { name: 'Segmentation', detail: 'Text extracted and divided into 100-word chunks' },
            { name: 'Synthetic QA generation', detail: '10,000 question-answer pairs generated from the chunks' },
            {
              name: 'Embedding fine-tuning',
              detail: 'A BAAI bge embedding model fine-tuned with Matryoshka representation learning',
            },
            { name: 'ChromaDB', detail: 'Chunk embeddings stored in a vector database' },
          ],
        },
        {
          title: 'Answering a question',
          steps: [
            { name: 'Question', detail: 'A multiple-choice question from TeleQnA' },
            { name: 'Retrieval', detail: 'The best-matching chunk fetched from ChromaDB through LangChain' },
            { name: 'Prompt', detail: 'A custom prompt augmented with the retrieved context' },
            { name: 'Phi-2', detail: 'Incrementally fine-tuned on the 3GPP documents with LoRA' },
            { name: 'Post-processing', detail: 'The answer reduced to a single option and checked' },
          ],
        },
      ],
    },
    implementation: [
      'Documents were segmented with the open-source Unstructured library, skipping tables and images, into 100-word chunks. A 500-token chunk size was also tried, but Phi-2 has a 2,048-token limit, and the smaller chunks kept the needed context without exhausting it.',
      'The embedding model was fine-tuned for retrieval on 10,000 synthetic question-answer pairs, using a Matryoshka loss that combines the loss at several embedding sizes so that truncated embeddings still carry the essential information. Retrieval quality was measured with NDCG before and after fine-tuning.',
      'Phi-2 was fine-tuned on the 3GPP text with LoRA, a parameter-efficient method, with the model loaded in quantized form. The paper found that this incremental fine-tuning worked and that instruction fine-tuning did not: the model struggled with telecom-specific instructions.',
      'At inference the single best-matching chunk is retrieved, because retrieving more exhausted the model’s token limit. A hybrid search variant came close to the best result but took twice as long, so plain vector search was kept. My MSc thesis extends the pipeline, evaluating FLAN-T5 with ColBERT as the retrieval technique.',
    ],
    results: {
      intro:
        'Accuracy on the challenge’s private leaderboard, as reported in Table III of the paper. The paper states the gain as 45.20%; it is the difference between the two scores, 45.2 percentage points.',
      columns: ['Configuration', 'Accuracy'],
      rows: [
        ['Baseline: pre-trained Phi-2 with a pre-trained embedding model', '21.8%'],
        ['Instruction fine-tuning', '40.9%'],
        ['Fine-tuned embeddings with pre-trained Phi-2', '52.4%'],
        ['Incremental fine-tuning, 100-token chunks', '60.3%'],
        ['Incremental fine-tuning with hybrid search', '65.95%'],
        ['Incremental fine-tuning with a manual feedback loop (best)', '67.0%'],
      ],
      highlight: 5,
    },
    evidence: [
      {
        label: 'Paper on IEEE Xplore (DOI)',
        href: 'https://doi.org/10.1109/GCWkshp64532.2024.11100791',
      },
      { label: 'Author copy of the paper (PDF)', href: 'https://uregina.ca/~nss373/papers/gc-rag-khan.pdf' },
      { label: 'MSc thesis, University of Regina', href: 'https://hdl.handle.net/10294/17131' },
      {
        label: 'ITU challenge: Specializing LLMs for Telecom Networks',
        href: 'https://zindi.africa/competitions/specializing-large-language-models-for-telecom-networks',
      },
    ],
    citation: {
      title:
        'Enhancing Large Language Models for Telecom Networks Using Retrieval-Augmented Generation',
    },
  },
  {
    slug: 'incident-management',
    title: 'LLM-Based Incident Management',
    kicker: 'IEEE Journal on Selected Areas in Communications, 2026',
    summary:
      'Multi-label classification of telecom incident tickets, where a RAG-enhanced Phi-3.5 model with probabilistic re-ranking reached 94.98% F1.',
    description:
      'Case study: multi-label classification of telecom incident tickets. A RAG-enhanced Phi-3.5 model with probabilistic re-ranking reached 94.98% F1, against 79.20% for the encoder-only model. IEEE JSAC 2026.',
    facts: [
      { label: 'Role', value: 'Co-author, second of six' },
      { label: 'Published', value: 'IEEE JSAC, vol. 44, pp. 4505–4519, 2026' },
      { label: 'Data', value: '7,447 incident tickets from a Canadian telecom operator' },
      { label: 'Task', value: 'Multi-label ticket classification' },
    ],
    stack: ['Python', 'Phi-3.5', 'RAG', 'BERT', 'PyTorch', 'LIME'],
    problem: [
      'Telecom operators rely on incident management tickets to record incidents, assess severity, find root causes and resolve them. Classifying those tickets accurately is hard: there are many of them, the text is unstructured and inconsistent, categories overlap, and the classes are imbalanced.',
      'The paper sets out to predict several attributes of each ticket at once, including network impact, service impact and root cause, from the short text of the ticket.',
    ],
    contribution: [
      'This is co-authored work. I am the second of six authors, with M. S. Towhid, N. Shahriar, M. Tornatore, R. Boutaba and A. Saleh, from the University of Regina, Politecnico di Milano, the University of Waterloo and Rogers Communications.',
      'The paper proposes two complementary solutions: an encoder-only model (BERT) with relevance-guided feature selection, and a decoder-only model (Phi-3.5) enhanced with retrieval-augmented generation and a probabilistic re-ranking step. It benchmarks both against traditional machine learning baselines on real operator data.',
    ],
    diagram: {
      caption:
        'The retrieval-augmented pipeline with probabilistic re-ranking, as described in the paper.',
      lanes: [
        {
          title: 'Indexing past tickets',
          steps: [
            { name: 'Training tickets', detail: '70% of the 7,447 tickets' },
            { name: 'Embeddings', detail: '768-dimensional sentence embeddings of each ticket' },
            { name: 'Vector database', detail: 'Stored for semantic similarity search' },
          ],
        },
        {
          title: 'Classifying a new ticket',
          steps: [
            { name: 'Ticket summary', detail: 'The short text of a new incident' },
            { name: 'Retrieval', detail: '20 similar past tickets fetched by cosine similarity' },
            { name: 'Re-ranking', detail: 'Ranked by a Bayesian relevance score; the top three are kept' },
            { name: 'Prompt', detail: 'The new ticket with the retrieved examples as context' },
            { name: 'Phi-3.5', detail: 'Fine-tuned, with a classifier for each attribute' },
            { name: 'Labels', detail: 'Network impact, service impact, root cause and resolution' },
          ],
        },
      ],
    },
    implementation: [
      'The dataset holds 7,447 tickets collected over four months from the wireless network platform of a major Canadian telecom operator, split 70/30 into training and test sets.',
      'On the encoder side, a Bayesian posterior-probability relevance score selects the tokens most indicative of each attribute before classification, building on the token-prioritization strategy from our earlier CNSM 2023 paper. The best encoder-only model is a fine-tuned BERT with this feature selection.',
      'On the decoder side, the same relevance score re-ranks the retrieved tickets, so the examples placed in the prompt are the most relevant ones. This handles class imbalance inside the retrieval step, without resampling or reweighting the loss. Decoder models were evaluated in two modes: generating the labels as text, and classification, where the model’s transformer layers feed a separate classifier for each attribute.',
      'Three open models were compared, Phi-3.5, Falcon-7B and MPT-7B, chosen because each runs inference on a single 24 GB GPU. The paper also applies LIME to explain which terms the best model relies on.',
    ],
    results: {
      intro: 'F1 scores as reported in the paper.',
      columns: ['Model', 'F1'],
      rows: [
        ['SVM, the best traditional machine learning baseline', '80.32%'],
        ['Fine-tuned BERT, without feature selection', '68.34%'],
        ['Fine-tuned BERT with relevance-score feature selection (best encoder-only)', '79.20%'],
        ['Falcon with RAG and re-ranking, classification mode', '91.10%'],
        ['Phi-3.5 with RAG, classification mode', '94.12%'],
        ['Phi-3.5 with RAG and probabilistic re-ranking (best)', '94.98%'],
      ],
      highlight: 5,
    },
    evidence: [
      { label: 'Paper on IEEE Xplore (DOI)', href: 'https://doi.org/10.1109/JSAC.2026.3680419' },
      { label: 'Author copy of the paper (PDF)', href: 'https://uregina.ca/~nss373/papers/JSAC_2026.pdf' },
      {
        label: 'Earlier paper on token prioritization, CNSM 2023 (PDF)',
        href: 'https://dl.ifip.org/db/conf/cnsm/cnsm2023/1570931597.pdf',
      },
    ],
    citation: {
      title: 'Leveraging LLM for Enhanced Incident Management in Wireless Networks',
    },
  },
  {
    slug: 'heritage-hive',
    title: 'Heritage Hive',
    kicker: 'Full-stack e-commerce platform · Django and Qdrant',
    summary:
      'An e-commerce platform that connects local artisans with a global customer base, with semantic product search over a vector index.',
    description:
      'Case study: Heritage Hive, a Django e-commerce platform connecting local artisans with global customers, with buyer and seller portals and semantic product search over a Qdrant vector index.',
    facts: [
      { label: 'Role', value: 'Co-developer, team of three' },
      { label: 'Type', value: 'Team project' },
      { label: 'Stack', value: 'Django, Python, JavaScript, Qdrant' },
      { label: 'Code', value: 'Public repository on GitHub' },
    ],
    stack: ['Django', 'Python', 'JavaScript', 'HTML', 'CSS', 'SQLite', 'Qdrant', 'Sentence Transformers'],
    problem: [
      'Artisans in isolated or rural locations make heritage items that customers elsewhere would buy, but they have little access to those customers.',
      'Heritage Hive is a marketplace for them: sellers list and manage their products, buyers browse and purchase, and each item carries the cultural background of the product.',
    ],
    contribution: [
      'Heritage Hive was built by a team of three: Md Rezaul Hoque, Sumaiya Nawsheen and me, with guidance from Dr. Samira Sadaoui. Everything described here is in the public repository.',
    ],
    diagram: {
      caption: 'The application as it is organised in the repository.',
      lanes: [
        {
          title: 'Shopping',
          steps: [
            { name: 'Browser', detail: 'Server-rendered Django templates with JavaScript and CSS' },
            { name: 'Accounts', detail: 'Registration, email activation, and buyer and seller dashboards' },
            { name: 'Store', detail: 'Categories, product pages, variations and reviews' },
            { name: 'Cart and orders', detail: 'Cart, checkout, payment records and order history' },
            { name: 'SQLite', detail: 'Relational data through the Django ORM' },
          ],
        },
        {
          title: 'Semantic search',
          steps: [
            { name: 'Search query', detail: 'Free text typed by the shopper' },
            { name: 'Sentence embedding', detail: 'Encoded with the all-MiniLM-L6-v2 model' },
            { name: 'Qdrant', detail: 'Cosine search over product name and description vectors' },
            { name: 'Results', detail: 'Matches above a score threshold, loaded from the store' },
          ],
        },
      ],
    },
    implementation: [
      'The project is a Django application split into apps by responsibility: accounts, categories, store, cart, orders and subscriptions. Accounts cover registration with email activation, password reset, and separate dashboards for buyers and sellers; a middleware keeps seller accounts inside the seller area.',
      'Search is semantic. Product names and descriptions are encoded with a sentence-transformer model into 384-dimensional vectors and stored in a Qdrant collection with cosine distance. A search query is encoded the same way, and products whose similarity passes a threshold are returned, so a query can match a product without sharing its keywords.',
      'Shoppers can subscribe to a category. When a seller adds a product, subscribers to its category are emailed. The subscription code follows the observer pattern, with subject and observer classes for registering, unregistering and notifying subscribers.',
      'Cart and checkout handle product variations, and completed payments are recorded against the order, which moves the cart items into the order history.',
    ],
    results: {
      intro:
        'This project has no published usage or performance figures, so none are claimed here. What the repository contains:',
      list: [
        'A working marketplace flow: registration, browsing, cart, checkout and order history.',
        'Seller tools to add, edit and remove products.',
        'Semantic product search backed by a Qdrant vector index.',
        'Email notifications to category subscribers when new products are added.',
        'Product reviews and ratings.',
      ],
    },
    evidence: [
      { label: 'Source code on GitHub', href: 'https://github.com/nasiksami/Heritage_Hive' },
      {
        label: 'Project report (PDF, in the repository)',
        href: 'https://github.com/nasiksami/Heritage_Hive/blob/main/Heritage%20Hive%20Project%20Report.pdf',
      },
    ],
  },
];

export const caseStudyBySlug = (slug) => caseStudies.find((study) => study.slug === slug);
