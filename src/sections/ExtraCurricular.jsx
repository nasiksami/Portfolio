import React from 'react';

const activities = [
  {
    title: 'Vice President - Culture',
    org: 'University of Regina Bangladeshi Students’ Association',
    period: 'Sep 2023 – Oct 2024',
    icon: (
      <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" /></svg>
    )
  },
  {
    title: 'International Peer Advisor',
    org: 'UR International',
    period: 'Jan 2024 – Apr 2025',
    icon: (
      <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" /></svg>
    ),
    description: 'Organized 3 orientation events, volunteered at the airport welcome booth for 4 semesters, and at 3 other international events.'
  },
  {
    title: 'Volunteer',
    org: 'IEEE Canada (CCECE 2023)',
    period: '2023',
    icon: (
      <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" /></svg>
    )
  },
];

export default function ExtraCurricular() {
  return (
    <div className="py-16 flex justify-center animate-fade-in">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600">Extra-Curricular Activities</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {activities.map((act, idx) => (
            <div key={idx} className="card flex flex-col items-center text-center p-7">
              <div className="mb-3">{act.icon}</div>
              <h3 className="text-lg font-bold text-blue-200 dark:text-blue-600 mb-1">{act.title}</h3>
              <div className="text-gray-200 dark:text-gray-800 text-sm mb-1">{act.org}</div>
              <div className="text-blue-300 dark:text-blue-500 text-xs mb-2">{act.period}</div>
              {act.description && <div className="text-gray-400 dark:text-gray-600 text-xs">{act.description}</div>}
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