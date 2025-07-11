import React from 'react';

const awards = [
  {
    title: 'Best Graduate Research Award',
    year: '2024',
    description: 'Awarded for outstanding research contributions in AI and Machine Learning at the University of Regina.'
  },
  {
    title: 'Dean’s List of Academic Excellence',
    year: '2023',
    description: 'Recognized for exceptional academic performance and leadership.'
  },
  {
    title: 'AI Innovation Challenge Winner',
    year: '2022',
    description: 'First place in a national competition for developing an innovative AI-powered solution.'
  }
];

export default function Awards() {
  return (
    <div className="flex flex-col items-center animate-fade-in">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-12 mt-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Awards & Recognition</h2>
      <div className="grid gap-8 md:grid-cols-3 w-full max-w-5xl">
        {awards.map((a, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-yellow-400/20 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
            <svg className="w-8 h-8 text-yellow-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
            <div className="font-bold text-yellow-200 text-lg mb-1">{a.title}</div>
            <div className="text-xs text-yellow-400 mb-2">{a.year}</div>
            <div className="text-gray-100 text-sm">{a.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 