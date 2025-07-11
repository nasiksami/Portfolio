import React from 'react';

export default function Divider() {
  return (
    <div className="relative w-full flex justify-center items-center my-4">
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-8 md:h-12"
        preserveAspectRatio="none"
      >
        <path
          d="M0 30 Q 360 60 720 30 T 1440 30 V60 H0 V30Z"
          fill="url(#divider-gradient)"
        />
        <defs>
          <linearGradient id="divider-gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="#a78bfa" stopOpacity="0.18" />
            <stop offset="1" stopColor="#6366f1" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
} 