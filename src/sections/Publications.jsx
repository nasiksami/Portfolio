import React from 'react';

const publications = [
  {
    title: 'Enhancing Large Language Models for Telecom Networks Using Retrieval-Augmented Generation',
    authors: 'N. S. Khan, M. M. Hasan, M. S. Towhid, S. Basnet, and N. Shahriar',
    venue: '2024 IEEE Globecom Workshops (GC Wkshps)',
    year: '2024 (To appear)',
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-6m0 0V4m0 10l3-3m-3 3l-3-3" /></svg>
    ),
    link: '', // Add publication link if available
  },
  {
    title: 'Towards effective network intrusion detection in imbalanced datasets: A hierarchical approach',
    authors: 'M. S. Towhid, N. S. Khan, M. M. Hasan, and N. Shahriar',
    venue: 'International Workshop on Computing, Networking and Communications (CNC)',
    year: '2024',
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>
    ),
    link: '', // Add publication link if available
  },
  {
    title: 'A token prioritization strategy for handling data imbalance in network-change ticket classification',
    authors: 'M. S. Towhid, N. S. Khan, N. Shahriar, M. Tornatore, R. Boutaba, and A. Saleh',
    venue: '19th IEEE/ACM/IFIP International Conference on Network and Service Management (CNSM)',
    year: '2023',
    icon: (
      <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 10c-4.418 0-8-1.79-8-4V6c0-2.21 3.582-4 8-4s8 1.79 8 4v8c0 2.21-3.582 4-8 4z" /></svg>
    ),
    link: '', // Add publication link if available
  },
  {
    title: 'Waste Management Using Machine Learning and Deep Learning Algorithms',
    authors: 'N. S. Khan, Z. M. A. Amin, and R. Hassan',
    venue: 'Int. J. Perceptive Cogn. Comput.',
    year: '2020',
    icon: (
      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4a4 4 0 014 4v2" /></svg>
    ),
    link: '', // Add publication link if available
  },
  {
    title: 'An Approach of Classifying Waste Using Transfer Learning Method',
    authors: 'Z. M. A. Amin, N. S. Khan, and R. Hassan',
    venue: 'Int. J. Perceptive Cogn. Comput.',
    year: '2021',
    icon: (
      <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 10c-4.418 0-8-1.79-8-4V6c0-2.21 3.582-4 8-4s8 1.79 8 4v8c0 2.21-3.582 4-8 4z" /></svg>
    ),
    link: '', // Add publication link if available
  },
  {
    title: 'Cyberbullying Severity Detection Using Deep Learning Techniques: A Multi-Class Classification over Varied Class Balance Data',
    authors: 'S. Wani, N. S. Khan, Z. M. A. Amin, and Y. Gulzar',
    venue: 'Securing Social Networks in Cyberspace, CRC Press',
    year: '2021',
    icon: (
      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 10c-4.418 0-8-1.79-8-4V6c0-2.21 3.582-4 8-4s8 1.79 8 4v8c0 2.21-3.582 4-8 4z" /></svg>
    ),
    link: '', // Add publication link if available
  },
];

const publicationLinks = [
  'https://uregina.ca/~nss373/papers/gc-rag-khan.pdf', // Enhancing Large Language Models for Telecom Networks Using Retrieval-Augmented Generation
  'https://uregina.ca/~nss373/papers/CNC_2024.pdf', // Towards Effective Network Intrusion Detection in Imbalanced Datasets: A Hierarchical Approach
  'https://rboutaba.cs.uwaterloo.ca/Papers/Conferences/2023/TowhidCNSM23.pdf', // A Token-Prioritization Strategy for Handling Data Imbalance in Network-Change Ticket Classification
  'https://journals.iium.edu.my/kict/index.php/IJPCC/article/view/165', // Waste Management Using Machine Learning and Deep Learning Algorithms
  'https://journals.iium.edu.my/kict/index.php/IJPCC/article/view/213', // An Approach of Classifying Waste Using Transfer Learning Method
  'https://www.taylorfrancis.com/chapters/edit/10.1201/9781003134527-11/cyberbullying-severity-detection-using-deep-learning-techniques-sharyar-wani-khan-nasik-sami-zian-md-afique-amin-yonis-gulzar', // Cyberbullying Severity Detection Using Deep Learning Techniques
];

const iconColors = [
  'bg-blue-500 border-blue-400',
  'bg-purple-500 border-purple-400',
  'bg-pink-500 border-pink-400',
  'bg-green-500 border-green-400',
  'bg-yellow-500 border-yellow-400',
  'bg-red-500 border-red-400',
];

function UniformPubIcon({ idx, children }) {
  return (
    <span className={`absolute -left-7 flex items-center justify-center w-12 h-12 ${iconColors[idx % iconColors.length]} border-4 rounded-full shadow-lg backdrop-blur-lg z-10`}>
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">{children}</svg>
    </span>
  );
}

export default function Publications() {
  return (
    <div className="py-16 flex justify-center animate-fade-in">
      <div className="w-full max-w-3xl">
        <h3 className="text-4xl md:text-4xl font-extrabold mb-12 mt-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Publications</h3>
        <br />
        <ol className="relative ml-8 space-y-10">
          {publications.map((pub, idx) => (
            <li key={idx} className="flex items-center gap-10 relative">
              <UniformPubIcon idx={idx}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
              </UniformPubIcon>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow border border-blue-400/10 flex-1 ml-2">
                <div className="text-blue-300 font-semibold text-base mb-1 flex items-center gap-2">
                  <a href={publicationLinks[idx]} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-400 transition" aria-label="View publication">
                    {pub.title}
                  </a>
                </div>
                <div className="text-gray-200 text-sm mb-1">{pub.authors}</div>
                <div className="text-gray-400 text-xs">{pub.venue}, {pub.year}</div>
              </div>
            </li>
          ))}
        </ol>
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