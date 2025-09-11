import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const GlobeIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#14b8a6" />
        <stop offset="50%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <filter id="globeGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#globeGlow)">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="url(#globeGrad)"
        strokeWidth="2.5"
        fill="url(#globeGrad)"
        fillOpacity="0.1"
      />
      <path
        d="M3.5 12H20.5"
        stroke="url(#globeGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M12 3.5C14.2091 6.26086 15.5 9.76957 15.5 12C15.5 14.2304 14.2091 17.7391 12 20.5C9.79086 17.7391 8.5 14.2304 8.5 12C8.5 9.76957 9.79086 6.26086 12 3.5Z"
        stroke="url(#globeGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="15" cy="9" r="1.5" fill="url(#globeGrad)" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="9" cy="15" r="1" fill="url(#globeGrad)" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);