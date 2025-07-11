import React from 'react';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] text-center overflow-hidden pt-16">
      {/* Animated particles background */}
      <svg className="absolute inset-0 w-full h-full -z-20 pointer-events-none" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="120" r="4" fill="#60a5fa" fillOpacity="0.5">
          <animate attributeName="cy" values="120;160;120" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="400" cy="300" r="6" fill="#a78bfa" fillOpacity="0.4">
          <animate attributeName="cy" values="300;340;300" dur="7s" repeatCount="indefinite" />
        </circle>
        <circle cx="900" cy="200" r="5" fill="#f472b6" fillOpacity="0.4">
          <animate attributeName="cy" values="200;240;200" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="1200" cy="400" r="7" fill="#38bdf8" fillOpacity="0.3">
          <animate attributeName="cy" values="400;440;400" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="700" cy="500" r="3" fill="#818cf8" fillOpacity="0.5">
          <animate attributeName="cy" values="500;540;500" dur="6s" repeatCount="indefinite" />
        </circle>
      </svg>
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-fade-in">
        <span className="block">Nasik Sami Khan</span>
      </h1>
      <p className="text-lg md:text-2xl text-blue-400 mb-6 animate-slide-up">AI/ML Researcher & Full-Stack Developer</p>
      <p className="max-w-xl text-gray-300 mb-8 animate-slide-up delay-150">Specializing in Generative AI, LLMs, NLP, and scalable software solutions. Passionate about building impactful, real-world AI systems.</p>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mb-6 px-6 py-3 rounded-xl bg-blue-500 text-white font-semibold shadow-lg hover:bg-blue-600 transition text-lg animate-fade-in"
        aria-label="Download Resume PDF"
      >
        Download Resume
      </a>
      {/* What I Do Section */}
      <div className="w-full max-w-4xl mx-auto mb-12 animate-fade-in">
        <br />
        <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600">What I Do</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow border border-blue-400/10 dark:border-blue-400/20 hover:scale-105 transition-transform">
            <div className="mb-3 text-blue-400">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v-4h-1m-4 0h-1v-4h-1" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">AI/ML Research</h3>
            <p className="text-gray-800 dark:text-gray-200 text-sm text-center">Designing and deploying advanced AI, LLM, and NLP solutions for real-world impact. Focused on generative models, retrieval-augmented generation, and applied research.</p>
          </div>
          <div className="flex flex-col items-center bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow border border-blue-400/10 dark:border-blue-400/20 hover:scale-105 transition-transform">
            <div className="mb-3 text-purple-400">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3m-4 0v4a1 1 0 001 1h3m-4 0v4a1 1 0 001 1h3m-4 0v4a1 1 0 001 1h3" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Full-Stack Development</h3>
            <p className="text-gray-800 dark:text-gray-200 text-sm text-center">Building robust, scalable web applications with modern frameworks and cloud-native architectures. End-to-end product delivery from concept to launch.</p>
          </div>
          <div className="flex flex-col items-center bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow border border-blue-400/10 dark:border-blue-400/20 hover:scale-105 transition-transform">
            <div className="mb-3 text-pink-400">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-pink-700 mb-2">Cloud & DevOps Solutions</h3>
            <p className="text-gray-800 dark:text-gray-200 text-sm text-center">Deploying and automating cloud infrastructure, CI/CD pipelines, and scalable backend systems for high-availability applications.</p>
          </div>
          <div className="flex flex-col items-center bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 shadow border border-blue-400/10 dark:border-blue-400/20 hover:scale-105 transition-transform">
            <div className="mb-3 text-green-400">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4-4 4 4m0 0V7m0 10l-4-4-4 4" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">Technical Writing & Publications</h3>
            <p className="text-gray-800 dark:text-gray-200 text-sm text-center">Authoring peer-reviewed research, technical articles, and documentation to advance knowledge and share expertise with the community.</p>
          </div>
        </div>
      </div>
      {/* Animated scroll indicator */}
      <button
        aria-label="Scroll to About section"
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        className="mt-8 flex flex-col items-center animate-bounce focus:outline-none group"
      >
        <div className="w-8 h-8 rounded-full border-2 border-blue-400 flex items-center justify-center bg-gray-950/80 shadow-lg group-hover:bg-blue-400/20 transition">
          <svg className="w-5 h-5 text-blue-400 group-hover:text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <span className="text-xs text-blue-400 mt-2 tracking-wide group-hover:text-blue-500">Scroll Down</span>
      </button>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1.2s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-slide-up {
          animation: slideUp 1.2s cubic-bezier(.4,0,.2,1) both;
        }
        .delay-150 { animation-delay: 0.15s; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 