// `icon` values are slugs resolved by components/SkillIcon.jsx.
// A slug with no registered icon falls back to a styled monogram, so adding a
// skill here never requires touching the icon registry.
//
// Proficiency levels carried over from the previous site's self-assessment.
// The nine skills added from public/resume.pdf (LangGraph, AutoGen, FAISS,
// Pinecone, MLflow, R, GCP, Kubernetes, Databricks) start at Intermediate,
// the lowest level, until they are self-assessed.
export const skillGroups = [
  {
    category: 'LLMs & Retrieval',
    blurb: 'RAG pipelines, agents, and vector search',
    items: [
      { name: 'LangChain', icon: 'langchain', level: 'Expert' },
      { name: 'LlamaIndex', icon: 'llamaindex', level: 'Expert' },
      { name: 'LangGraph', icon: 'langgraph', level: 'Intermediate' },
      { name: 'AutoGen', icon: 'autogen', level: 'Intermediate' },
      { name: 'ChromaDB', icon: 'chromadb', level: 'Intermediate' },
      { name: 'Qdrant', icon: 'qdrant', level: 'Intermediate' },
      { name: 'FAISS', icon: 'faiss', level: 'Intermediate' },
      { name: 'Pinecone', icon: 'pinecone', level: 'Intermediate' },
    ],
  },
  {
    category: 'Machine Learning',
    blurb: 'Research-to-production model development',
    items: [
      { name: 'PyTorch', icon: 'pytorch', level: 'Advanced' },
      { name: 'TensorFlow', icon: 'tensorflow', level: 'Expert' },
      { name: 'Keras', icon: 'keras', level: 'Advanced' },
      { name: 'Scikit-Learn', icon: 'scikitlearn', level: 'Advanced' },
      { name: 'MLflow', icon: 'mlflow', level: 'Intermediate' },
      { name: 'OpenCV', icon: 'opencv', level: 'Advanced' },
      { name: 'Streamlit', icon: 'streamlit', level: 'Expert' },
    ],
  },
  {
    category: 'Languages',
    blurb: 'Primary implementation languages',
    items: [
      { name: 'Python', icon: 'python', level: 'Expert' },
      { name: 'JavaScript', icon: 'javascript', level: 'Expert' },
      { name: 'C#', icon: 'csharp', level: 'Advanced' },
      { name: 'C++', icon: 'cplusplus', level: 'Advanced' },
      { name: 'Java', icon: 'java', level: 'Advanced' },
      { name: 'R', icon: 'r', level: 'Intermediate' },
      { name: 'HTML', icon: 'html5', level: 'Expert' },
      { name: 'CSS', icon: 'css3', level: 'Expert' },
      { name: 'VBA', icon: 'vba', level: 'Intermediate' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    blurb: 'Deployment, orchestration, and pipelines',
    items: [
      { name: 'AWS', icon: 'aws', level: 'Expert' },
      { name: 'GCP', icon: 'gcp', level: 'Intermediate' },
      { name: 'Docker', icon: 'docker', level: 'Expert' },
      { name: 'Kubernetes', icon: 'kubernetes', level: 'Intermediate' },
      { name: 'Jenkins', icon: 'jenkins', level: 'Advanced' },
      { name: 'CI/CD', icon: 'cicd', level: 'Intermediate' },
      { name: 'RabbitMQ', icon: 'rabbitmq', level: 'Advanced' },
      { name: 'Heroku', icon: 'heroku', level: 'Advanced' },
      { name: 'Linux', icon: 'linux', level: 'Advanced' },
    ],
  },
  {
    category: 'Backend & Frameworks',
    blurb: 'APIs, services, and web frameworks',
    items: [
      { name: 'Django', icon: 'django', level: 'Expert' },
      { name: 'Flask', icon: 'flask', level: 'Advanced' },
      { name: 'ASP.NET', icon: 'dotnet', level: 'Advanced' },
      { name: 'Entity Framework', icon: 'entityframework', level: 'Intermediate' },
      { name: 'Dapper', icon: 'dapper', level: 'Intermediate' },
      { name: 'REST APIs', icon: 'rest', level: 'Advanced' },
      { name: 'Microservices', icon: 'microservices', level: 'Intermediate' },
      { name: 'AngularJS', icon: 'angular', level: 'Advanced' },
    ],
  },
  {
    category: 'Data & Storage',
    blurb: 'Relational, document, and search stores',
    items: [
      { name: 'MySQL', icon: 'mysql', level: 'Advanced' },
      { name: 'Oracle', icon: 'oracle', level: 'Advanced' },
      { name: 'MongoDB', icon: 'mongodb', level: 'Advanced' },
      { name: 'Elasticsearch', icon: 'elasticsearch', level: 'Advanced' },
      { name: 'Databricks', icon: 'databricks', level: 'Intermediate' },
    ],
  },
  {
    category: 'Tools & Analytics',
    blurb: 'Day-to-day engineering and BI tooling',
    items: [
      { name: 'Git', icon: 'git', level: 'Expert' },
      { name: 'Postman', icon: 'postman', level: 'Advanced' },
      { name: 'Tableau', icon: 'tableau', level: 'Expert' },
      { name: 'Power BI', icon: 'powerbi', level: 'Advanced' },
      { name: 'Wireshark', icon: 'wireshark', level: 'Intermediate' },
    ],
  },
];

export const levelOrder = ['Expert', 'Advanced', 'Intermediate'];
