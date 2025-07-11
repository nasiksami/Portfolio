import React from 'react';

const testimonials = [
  {
    quote: 'Nasik is a highly skilled and dedicated engineer. His work on our AI projects was both innovative and reliable.',
    name: 'Dr. Jane Smith',
    title: 'AI Research Lead, TechCorp'
  },
  {
    quote: 'A true team player with a passion for excellence. Nasik consistently delivers above expectations.',
    name: 'John Doe',
    title: 'Senior Software Engineer, InnovateX'
  },
  {
    quote: 'His technical depth and communication skills make him a standout collaborator.',
    name: 'Prof. Emily Zhang',
    title: 'Professor, University of Regina'
  }
];

export default function Testimonials() {
  return (
    <div className="flex flex-col items-center animate-fade-in">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-12 mt-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Testimonials</h2>
      <div className="grid gap-8 md:grid-cols-3 w-full max-w-5xl">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-blue-400/20 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
            <svg className="w-8 h-8 text-blue-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17a4 4 0 01-4-4V7a4 4 0 014-4h2a4 4 0 014 4v6a4 4 0 01-4 4zm10 0a4 4 0 01-4-4V7a4 4 0 014-4h2a4 4 0 014 4v6a4 4 0 01-4 4z" /></svg>
            <blockquote className="italic text-gray-100 mb-4">"{t.quote}"</blockquote>
            <div className="font-bold text-blue-200">{t.name}</div>
            <div className="text-xs text-blue-400">{t.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 