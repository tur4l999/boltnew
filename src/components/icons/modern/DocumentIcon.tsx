import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const DocumentIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <filter id="docShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
      </filter>
    </defs>
    
    <g filter="url(#docShadow)">
      <path
        d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6Z"
        stroke="url(#docGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="white"
        fillOpacity="0.9"
      />
      <path
        d="M14 2V6C14 7.10457 14.8954 8 16 8H20"
        stroke="url(#docGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="url(#docGrad)"
        fillOpacity="0.2"
      />
      <path d="M8 13H16" stroke="url(#docGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M8 17H13" stroke="url(#docGrad)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <rect x="8" y="7" width="4" height="3" rx="1" fill="url(#docGrad)" fillOpacity="0.3" />
    </g>
  </svg>
);