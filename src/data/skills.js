// Skill groups, as on the resume. No proficiency labels.
//
// `icon` is a slug resolved by components/SkillIcon.jsx; an item without one
// shows a small monogram. `term: false` keeps a descriptive phrase out of the
// automatic emphasis in running copy (components/ui/Emphasis.jsx), which is
// meant for named tools only.
export const skillGroups = [
  {
    category: 'ML & modelling',
    items: [
      { name: 'PyTorch', icon: 'pytorch' },
      { name: 'TensorFlow', icon: 'tensorflow' },
      { name: 'scikit-learn', icon: 'scikitlearn' },
      { name: 'MLflow', icon: 'mlflow' },
      { name: 'LLM and embedding fine-tuning', term: false },
      { name: 'BERT' },
      { name: 'CNNs', term: false },
      { name: 'Time-series forecasting', term: false },
      { name: 'Imbalanced-data training and evaluation', term: false },
    ],
  },
  {
    category: 'LLM systems',
    items: [
      { name: 'RAG' },
      { name: 'LoRA fine-tuning', term: false },
      { name: 'LangChain', icon: 'langchain' },
      { name: 'LlamaIndex', icon: 'llamaindex' },
      { name: 'ColBERT' },
      { name: 'Matryoshka embeddings', term: false },
    ],
  },
  {
    category: 'Agentic AI',
    items: [
      { name: 'LangGraph', icon: 'langgraph' },
      { name: 'AutoGen' },
      { name: 'Model Context Protocol (MCP)', term: false },
      { name: 'Claude Code', icon: 'claude' },
      { name: 'OpenAI Codex' },
      { name: 'Cursor' },
    ],
  },
  {
    category: 'Data & vectors',
    items: [
      { name: 'DuckDB', icon: 'duckdb' },
      { name: 'SQL Server', icon: 'sqlserver' },
      { name: 'Elasticsearch', icon: 'elasticsearch' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'ChromaDB', icon: 'chromadb' },
      { name: 'Qdrant', icon: 'qdrant' },
      { name: 'FAISS' },
    ],
  },
  {
    category: 'Languages',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'SQL', icon: 'sql' },
      { name: 'C#', icon: 'csharp' },
      { name: 'JavaScript', icon: 'javascript' },
    ],
  },
  {
    category: 'Engineering',
    items: [
      { name: 'REST APIs', icon: 'rest' },
      { name: 'Microservices', icon: 'microservices', term: false },
      { name: 'RabbitMQ', icon: 'rabbitmq' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Kubernetes', icon: 'kubernetes' },
      { name: 'Jenkins CI/CD', icon: 'jenkins' },
      { name: 'Git', icon: 'git' },
      { name: 'Linux', icon: 'linux' },
      { name: 'Django', icon: 'django' },
      { name: 'Flask', icon: 'flask' },
      { name: 'ASP.NET', icon: 'dotnet' },
    ],
  },
  {
    category: 'Cloud',
    items: [
      { name: 'AWS', icon: 'aws' },
      { name: 'Lambda', term: false },
      { name: 'S3', term: false },
      { name: 'EC2', term: false },
      { name: 'DynamoDB', term: false },
    ],
  },
  {
    category: 'Domains',
    items: [
      { name: 'Healthcare AI', term: false },
      { name: 'Telecom networks', term: false },
      { name: 'Network security', term: false },
    ],
  },
];

// Tools used on earlier projects, kept out of the main view.
export const moreTools = [
  'Streamlit',
  'OpenCV',
  'Keras',
  'Entity Framework',
  'Dapper',
  'MySQL',
  'Oracle',
  'HTML',
  'CSS',
  'Java',
  'C++',
  'Postman',
  'Tableau',
  'Power BI',
];
