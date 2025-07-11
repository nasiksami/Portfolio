import React from 'react';

const projects = [
  {
    title: 'Telecom QA RAG System',
    description: 'Developed a novel telecom-specific multi-modal RAG pipeline combining finetuned embedding models and LLMs to enhance QA accuracy on 3GPP documents.',
    role: 'Lead Researcher & Developer',
    impact: '47% improvement in QA accuracy',
    tech: ['Python', 'LLMs', 'Colbert', 'Matryoshka', 'Phi2', 'ChromaDB'],
    demo: '',
    icon: (
      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v-4h-1m-4 0h-1v-4h-1" /></svg>
    ),
  },
  {
    title: '5G Slice Benchmarking: Traffic Analysis and Resource Allocation',
    description: 'Simulated and benchmarked 5G network slices with virtual testbed and traffic replay, analyzing resource impacts.',
    role: 'Network Research Engineer',
    impact: 'Benchmarked resource allocation for 5G slices',
    tech: ['free5GC', 'UERANSIM', 'Docker', 'Prometheus', 'Grafana'],
    demo: '',
    icon: (
      <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" /></svg>
    ),
  },
  {
    title: 'Heritage Hive - Full Stack Development',
    description: 'Developed an e-commerce platform to connect local sellers with global customers. Implemented design patterns and AI-based semantic product search.',
    role: 'Full-Stack Developer',
    impact: 'Enabled global reach for local sellers',
    tech: ['Django', 'Python', 'HTML', 'CSS', 'JavaScript', 'Qdrant'],
    demo: '',
    icon: (
      <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 10c-4.418 0-8-1.79-8-4V6c0-2.21 3.582-4 8-4s8 1.79 8 4v8c0 2.21-3.582 4-8 4z" /></svg>
    ),
  },
  {
    title: 'Network Trouble Ticket Classification using NLP',
    description: 'Built a BERT-based NLP model with data augmentation and class-weighting to classify telecom network tickets into priority categories.',
    role: 'ML Engineer',
    impact: 'Improved automated issue triaging accuracy',
    tech: ['BERT', 'NLP', 'Python'],
    demo: '',
    icon: (
      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4a4 4 0 014 4v2" /></svg>
    ),
  },
  {
    title: 'Cyberbullying Severity Detection',
    description: 'Research project using BERT, CNN, HAN, RNN, BiLSTM, Text-CNN, and NLP rule-based algorithms to recognize and classify the severity of hate speech and cyberbullying in English.',
    role: 'Researcher',
    impact: 'Advanced detection of online hate speech',
    tech: ['BERT', 'CNN', 'HAN', 'RNN', 'BiLSTM', 'Text-CNN', 'NLP'],
    demo: '',
    icon: (
      <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6" /></svg>
    ),
  },
  {
    title: 'Waste Management Using Machine Learning and Deep Learning',
    description: 'Developed optimal models for classifying waste images into multiple categories using Random Forest, Decision Tree, SVM, and CNN. Used transfer learning to improve image detection accuracy. Built a demo web app with Streamlit.',
    role: 'Lead ML Engineer',
    impact: 'Improved waste classification accuracy',
    tech: ['Random Forest', 'Decision Tree', 'SVM', 'CNN', 'Transfer Learning', 'Streamlit'],
    demo: '',
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
    ),
  },
];

const projectIcons = [
  // Telecom QA RAG System
  <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M8 12h8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  // 5G Slice Benchmarking
  <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M12 8v8m-4-4h8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  // Heritage Hive
  <svg className="w-16 h-16 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M8 16h8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  // Network Trouble Ticket Classification
  <svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M12 8v8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  // Cyberbullying Severity Detection
  <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M8 8h8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  // Waste Management Using ML/DL
  <svg className="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path d="M8 16h8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
];

export default function Projects() {
  return (
    <div className="py-16 flex justify-center animate-fade-in">
      <div className="w-full max-w-4xl">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-12 mt-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600">Projects</h3>
        <br />
        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="card group flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:border-blue-400/60 hover:shadow-2xl cursor-pointer relative overflow-hidden p-8"
            >
              <div className="mb-4 drop-shadow-xl">
                {project.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-200 dark:text-blue-900 group-hover:text-blue-400 dark:group-hover:text-blue-700 transition-colors duration-200">
                {project.title}
              </h3>
              <div className="mb-1 text-xs font-bold text-blue-250 dark:text-blue-700">{project.role} &bull; {project.impact}</div>
              <p className="text-gray-100 dark:text-gray-900 text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-3 mb-1">
                {project.tech && project.tech.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-blue-200 text-blue-900 text-[11px] font-semibold border border-blue-400/30">{tag}</span>
                ))}
              </div>
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block px-5 py-2 rounded-xl bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" aria-label={`View demo of ${project.title}`}>View Demo</a>
              )}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition" />
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
      `}</style>
    </div>
  );
} 