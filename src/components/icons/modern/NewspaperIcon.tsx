import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const NewspaperIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="newsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <filter id="newsShadow">
        <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.15" />
      </filter>
    </defs>
    
    <g filter="url(#newsShadow)">
      <path
        d="M4 4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z"
        stroke="url(#newsGrad)"
        strokeWidth="2"
        fill="white"
        fillOpacity="0.95"
      />
      <rect x="6" y="6" width="12" height="4" rx="1" fill="url(#newsGrad)" fillOpacity="0.3" />
      <rect x="6" y="12" width="5" height="3" rx="0.5" fill="url(#newsGrad)" fillOpacity="0.2" />
      <rect x="13" y="12" width="5" height="1" rx="0.5" fill="url(#newsGrad)" fillOpacity="0.4" />
      <rect x="13" y="14" width="5" height="1" rx="0.5" fill="url(#newsGrad)" fillOpacity="0.3" />
      <rect x="6" y="17" width="12" height="1" rx="0.5" fill="url(#newsGrad)" fillOpacity="0.2" />
      <rect x="6" y="19" width="8" height="1" rx="0.5" fill="url(#newsGrad)" fillOpacity="0.15" />
    </g>
  </svg>
);