import React from 'react';
import { educationTimeline } from './Timeline';
import uofrLogo from '../assets/uofr.jpg';
import iiumLogo from '../assets/iium.jpg';

function TimelineAccordion({ item, idx }) {
  // Determine logo based on institution
  let logo = null;
  if (item.institution.includes('University of Regina')) logo = uofrLogo;
  if (item.institution.includes('International Islamic University Malaysia')) logo = iiumLogo;
  return (
    <li className="flex items-start gap-6 pl-2 md:pl-8">
      {logo && (
        <img src={logo} alt={item.institution + ' logo'} className="w-16 h-16 rounded-full object-contain border-2 border-blue-200 bg-white shadow-md mr-4" style={{minWidth: 64}} />
      )}
      <div className="card flex-1 p-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-blue-300 dark:text-blue-600 font-semibold text-base">{item.title}</span>
          <span className="text-xs text-blue-200 dark:text-blue-500 font-bold bg-blue-900/40 dark:bg-blue-200/40 px-2 py-1 rounded-full ml-2">{item.year}</span>
        </div>
        <div className="text-gray-200 dark:text-gray-800 text-sm mb-1">{item.institution}</div>
        {/* Always show details */}
        <div className="text-gray-400 dark:text-gray-600 text-xs transition-all duration-200 ease-in-out mt-2">
          {Array.isArray(item.description) ? (
            <ul className="list-disc pl-5 space-y-1">
              {item.description.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          ) : item.description}
        </div>
      </div>
    </li>
  );
}

export default function EducationTimeline() {
  return (
    <div className="py-16 flex justify-center animate-fade-in">
      <div className="w-full max-w-3xl">
        <h2 className="text-3xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600">Education</h2>
        <ol className="space-y-10">
          {educationTimeline.map((item, idx) => (
            <TimelineAccordion key={idx} item={item} idx={idx} />
          ))}
        </ol>
      </div>
    </div>
  );
} 