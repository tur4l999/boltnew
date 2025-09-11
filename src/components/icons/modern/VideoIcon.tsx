import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const VideoIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="videoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <filter id="videoShadow">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.2" />
      </filter>
    </defs>
    
    <g filter="url(#videoShadow)">
      <rect
        x="2"
        y="5"
        width="15"
        height="14"
        rx="4"
        stroke="url(#videoGrad)"
        strokeWidth="2.5"
        fill="url(#videoGrad)"
        fillOpacity="0.1"
      />
      <path
        d="M17 8L21.5 5.5C21.8 5.3 22.2 5.5 22.2 5.9V18.1C22.2 18.5 21.8 18.7 21.5 18.5L17 16V8Z"
        fill="url(#videoGrad)"
        fillOpacity="0.9"
        stroke="url(#videoGrad)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="12" r="2.5" fill="url(#videoGrad)" fillOpacity="0.8">
        <animate attributeName="r" values="2.5;3;2.5" dur="2s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);