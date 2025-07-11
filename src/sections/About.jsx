import React from 'react';
import headshot from '../assets/headshot.jpg';

export default function About() {
  return (
    <div className="flex justify-center py-16 animate-fade-in bg-gray-750 dark:bg-gray-950 rounded-2xl px-2 md:px-0">
      <div className="card flex flex-col md:flex-row items-center md:items-center gap-10 max-w-3xl w-full p-10 bg-gray-100 dark:bg-gray-900/80 rounded-2xl shadow-md">
        <div className="flex-shrink-0 flex flex-col items-center justify-center">
          <div className="rounded-full border-4 border-blue-400 shadow-lg" style={{ boxShadow: '0 4px 24px 0 rgba(30,64,175,0.10)' }}>
            <img
              src={headshot}
              alt="Nasik Sami Khan"
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center items-start text-left">


          <h2 className="text-2xl md:text-3xl font-light mb-3 text-gray-100 dark:text-blue-200 text-center md:text-left" style={{ letterSpacing: '0.01em' }}>
  Driving Innovation at the Intersection of AI, ML, and Software Engineering
</h2>


          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-block bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 font-semibold px-3 py-1 rounded-full">Python</span>
            <span className="inline-block bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200 font-semibold px-3 py-1 rounded-full">C#</span>
            <span className="inline-block bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 font-semibold px-3 py-1 rounded-full">SQL</span>
            <span className="inline-block bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 font-semibold px-3 py-1 rounded-full">.NET</span>
            <span className="inline-block bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-200 font-semibold px-3 py-1 rounded-full">NLP</span>
            <span className="inline-block bg-yellow-100 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100 font-semibold px-3 py-1 rounded-full">Generative AI</span>
          </div>
          <br />
          <p className="text-gray-100 dark:text-gray-100 text-base leading-relaxed mb-2" style={{ textAlign: 'justify' }}>
  I am an MSc in Computer Science graduate with a proven record of translating advanced AI/ML research into impactful, production-ready solutions. My journey bridges rigorous academic research and hands-on software engineering, empowering organizations to solve their toughest technical challenges and accelerate business growth. I have collaborated with industry leaders such as Rogers and the Department of National Defence, earning recognition in global AI/ML competitions (ITU). My work has delivered measurable business impact, including a 47% QA accuracy boost in telecom RAG systems, a 22% F1 gain in intrusion detection, and a 40% improvement in microservices performance at D.P.O. International. With 5+ peer-reviewed publications and presentations at top international conferences (IEEE Globecom, CNSM), I bring expertise in LLMs, scalable architectures, and end-to-end product delivery in both research and production environments. I thrive on solving complex, high-impact problems and collaborating with forward-thinking teams. My goal is to build AI-driven solutions that not only work, but set new standards for excellence and business value.
</p>

<p className="text-gray-300 dark:text-blue-300 text-sm mt-1" style={{ textAlign: 'left' }}>
  Open to opportunities in AI/ML, cloud, telecom, or software engineering. Let’s connect and create something exceptional.
</p>


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