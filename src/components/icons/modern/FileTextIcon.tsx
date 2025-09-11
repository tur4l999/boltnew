import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const FileTextIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="fileTextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <filter id="fileTextShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
      </filter>
    </defs>
    
    <g filter="url(#fileTextShadow)">
      <path
        d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
        stroke="url(#fileTextGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="white"
        fillOpacity="0.95"
      />
      <path
        d="M14 2V8H20"
        fill="url(#fileTextGrad)"
        fillOpacity="0.2"
      />
      <g opacity="0.8">
        <rect x="8" y="12" width="8" height="1.5" rx="0.75" fill="url(#fileTextGrad)" />
        <rect x="8" y="15" width="6" height="1.5" rx="0.75" fill="url(#fileTextGrad)" opacity="0.7" />
        <rect x="8" y="18" width="4" height="1.5" rx="0.75" fill="url(#fileTextGrad)" opacity="0.5" />
      </g>
      <circle cx="12" cy="8" r="2" fill="url(#fileTextGrad)" fillOpacity="0.3">
        <animate attributeName="r" values="2;2.5;2" dur="3s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);