import React, { useState } from 'react';

const skillCircles = [
  { name: 'Python', percent: 95, color: 'from-blue-400 to-blue-600' },
  { name: 'C#', percent: 90, color: 'from-purple-400 to-purple-600' },
  { name: 'JavaScript', percent: 85, color: 'from-yellow-400 to-yellow-600' },
  { name: 'TensorFlow', percent: 80, color: 'from-orange-400 to-orange-600' },
  { name: 'Docker', percent: 80, color: 'from-cyan-400 to-cyan-600' },
  { name: 'AWS', percent: 75, color: 'from-amber-400 to-amber-600' },
  { name: 'Django', percent: 85, color: 'from-green-400 to-green-600' },
  { name: 'SQL', percent: 80, color: 'from-pink-400 to-pink-600' },
];

function CircularSkill({ name }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 mb-2 rounded-full bg-gray-900/80 flex items-center justify-center shadow-lg">
        <span className="text-blue-200 font-bold text-lg">{name[0]}</span>
      </div>
      <span className="text-xs text-gray-200 font-medium text-center">{name}</span>
    </div>
  );
}

const skills = [
  {
    category: 'Languages',
    items: [
      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', level: 'Expert' },
      { name: 'C#', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', level: 'Advanced' },
      { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', level: 'Advanced' },
      { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', level: 'Advanced' },
      { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', level: 'Expert' },
      { name: 'VBA', logo: null, level: 'Intermediate' },
      { name: 'JSON', logo: null, level: 'Intermediate' },
      { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', level: 'Expert' },
      { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', level: 'Expert' },
    ]
  },
  {
    category: 'Frameworks & Libraries',
    items: [
      { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', level: 'Expert' },
      { name: 'Keras', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg', level: 'Advanced' },
      { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', level: 'Advanced' },
      { name: 'LangChain', logo: null, level: 'Intermediate' },
      { name: 'LlamaIndex', logo: null, level: 'Intermediate' },
      { name: 'Streamlit', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg', level: 'Expert' },
      { name: 'Scikit-Learn', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg', level: 'Advanced' },
      { name: 'OpenCV', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg', level: 'Advanced' },
      { name: 'Flask', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', level: 'Advanced' },
      { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', level: 'Expert' },
      { name: 'ASP.NET', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg', level: 'Advanced' },
      { name: 'Entity Framework', logo: null, level: 'Intermediate' },
      { name: 'Dapper', logo: null, level: 'Intermediate' },
      { name: 'AngularJS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', level: 'Advanced' },
    ]
  },
  {
    category: 'Tools & Technologies',
    items: [
      { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', level: 'Expert' },
      { name: 'RabbitMQ', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg', level: 'Advanced' },
      { name: 'Jenkins', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', level: 'Advanced' },
      { name: 'Tableau', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg', level: 'Expert' },
      { name: 'Power BI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powerbi/powerbi-original.svg', level: 'Advanced' },
      { name: 'Excel VBA', logo: null, level: 'Intermediate' },
      { name: 'Google Colab', logo: null, level: 'Intermediate' },
      { name: 'Windows Server', logo: null, level: 'Intermediate' },
      { name: 'Unix/Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', level: 'Advanced' },
      { name: 'Elasticsearch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg', level: 'Advanced' },
      { name: 'Wireshark', logo: null, level: 'Intermediate' },
      { name: 'WordPress', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg', level: 'Advanced' },
    ]
  },
  {
    category: 'Databases',
    items: [
      { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', level: 'Advanced' },
      { name: 'Oracle', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg', level: 'Advanced' },
      { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', level: 'Advanced' },
      { name: 'Qdrant', logo: null, level: 'Intermediate' },
      { name: 'ChromaDB', logo: null, level: 'Intermediate' },
    ]
  },
  {
    category: 'Cloud & DevOps',
    items: [
      { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', level: 'Expert' },
      { name: 'Heroku', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg', level: 'Advanced' },
      { name: 'CI/CD', logo: null, level: 'Intermediate' },
      { name: 'Microservices', logo: null, level: 'Intermediate' },
      { name: 'RESTful APIs', logo: null, level: 'Intermediate' },
    ]
  },
  {
    category: 'Developer Tools',
    items: [
      { name: 'Git', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', level: 'Expert' },
      { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', level: 'Expert' },
      { name: 'Postman', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', level: 'Advanced' },
    ]
  },
];

function FallbackIcon({ name }) {
  const colors = [
    'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500', 'bg-yellow-500', 'bg-orange-500', 'bg-red-500', 'bg-gray-500'
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={`w-12 h-12 mb-2 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg ${color}`}>
      {name[0]}
    </div>
  );
}

function SkillLogo({ logo, name }) {
  const [error, setError] = useState(false);
  if (!logo || error) {
    return <FallbackIcon name={name} />;
  }
  return (
    <img
      src={logo}
      alt={name}
      className="w-12 h-12 mb-2 rounded-xl shadow-lg bg-white/80 p-1 animate-bounce-slow group-hover:animate-bounce-fast"
      onError={() => setError(true)}
    />
  );
}

export default function Skills() {
  return (
    <div className="py-16 flex flex-col items-center animate-fade-in">
      <div className="w-full max-w-5xl">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-12 mt-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600">Skills & Tools</h3>
        <br />
        {/* Remove animated Circular Skill Indicators row */}
        {/* Skills Grid */}
        <div className="grid gap-10 md:grid-cols-2">
          {skills.filter(group => group.category !== 'Other').map((group) => (
            <div key={group.category} className="card p-7 bg-gray-900/60 dark:bg-white/60 rounded-2xl shadow-xl border border-blue-400/10">
              <h3 className="text-xl font-bold mb-4 text-blue-200 dark:text-blue-600 text-center">{group.category}</h3>
              <div className="flex flex-wrap gap-5 justify-center md:justify-start">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="group flex flex-col items-center w-24 transition-transform duration-300 hover:scale-110 cursor-pointer"
                  >
                    <SkillLogo logo={item.logo} name={item.name} />
                    <span className="text-xs text-gray-200 dark:text-gray-800 text-center font-medium">{item.name}</span>
                    <span className={`mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${item.level === 'Expert' ? 'bg-blue-500 text-white' : item.level === 'Advanced' ? 'bg-purple-500 text-white' : 'bg-gray-400 text-white'}`}>{item.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1.2s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounce 2.5s infinite;
        }
        .group-hover\:animate-bounce-fast:hover {
          animation: bounce 0.7s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
} 