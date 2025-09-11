import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const UserIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="userGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <filter id="userGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#userGlow)">
      <circle
        cx="12"
        cy="8"
        r="4"
        stroke="url(#userGrad)"
        strokeWidth="2.5"
        fill="url(#userGrad)"
        fillOpacity="0.2"
      />
      <path
        d="M6 21V19C6 17.3431 7.34315 16 9 16H15C16.6569 16 18 17.3431 18 19V21"
        stroke="url(#userGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="url(#userGrad)"
        fillOpacity="0.1"
      />
      <circle cx="12" cy="8" r="1.5" fill="url(#userGrad)" fillOpacity="0.8">
        <animate attributeName="r" values="1.5;2;1.5" dur="3s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);