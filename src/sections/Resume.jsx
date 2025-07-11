import React from 'react';

const awards = [
  'Fully Funded Graduate Research Scholarship & Departmental Grant (Winter 2023 – Winter 2025)',
  <span key="itu"><a href="https://aiforgood.itu.int/event/ai-ml-challenge-finale-qos-prediction-network-traffic-scenario-prediction-sdn-security/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Runner-up: Intrusion and Vulnerability Detection in SDN (ITU AI/ML in 5G)</a></span>,
  <span key="zindi"><a href="https://zindi.africa/competitions/specializing-large-language-models-for-telecom-networks" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Silver Rank: Specializing Large Language Models for Telecom Networks (ITU AI/ML in 5G)</a></span>,
  'URGSA Travel Award – Winter 2025',
  'Saskatchewan Innovation and Excellence Graduate Scholarship - Fall 2023',
  'FGSR Graduate Teaching Assistantship – Winter 2024, Fall 2024',
  'FGSR Graduate Student Travel Award – Fall 2024',
];

export default function Resume() {
  return (
    <div className="flex justify-center py-16 animate-fade-in">
      <div className="card flex flex-col items-start max-w-2xl w-full p-8 bg-gray-900/80 dark:bg-gray-900/80 rounded-2xl shadow-xl border border-blue-400/10">
        <h2 className="text-3xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600 mx-auto">Awards & Scholarships</h2>
        <ul className="list-disc pl-6 text-gray-100 text-base space-y-3 w-full">
          {awards.map((award, idx) => (
            <li key={idx}>{award}</li>
          ))}
        </ul>
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