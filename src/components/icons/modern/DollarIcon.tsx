import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const DollarIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="dollarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <filter id="dollarGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#dollarGlow)">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="url(#dollarGrad)"
        strokeWidth="2.5"
        fill="url(#dollarGrad)"
        fillOpacity="0.1"
      />
      <path
        d="M12 6V18M9 9H14.5C15.3284 9 16 9.67157 16 10.5C16 11.3284 15.3284 12 14.5 12H9.5C8.67157 12 8 12.6716 8 13.5C8 14.3284 8.67157 15 9.5 15H15"
        stroke="url(#dollarGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" fill="url(#dollarGrad)" fillOpacity="0.3">
        <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
        <animate attributeName="fillOpacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);