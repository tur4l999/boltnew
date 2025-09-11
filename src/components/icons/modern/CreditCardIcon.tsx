import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const CreditCardIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
      <filter id="cardShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.2" />
      </filter>
    </defs>
    
    <g filter="url(#cardShadow)">
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="3"
        stroke="url(#cardGrad)"
        strokeWidth="2"
        fill="white"
        fillOpacity="0.95"
      />
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="3"
        fill="url(#cardGrad)"
        fillOpacity="0.1"
      />
      <rect x="2" y="8" width="20" height="4" fill="url(#cardGrad)" fillOpacity="0.3" />
      <circle cx="6" cy="16" r="1.5" fill="url(#cardGrad)" fillOpacity="0.8" />
      <circle cx="10" cy="16" r="1.5" fill="url(#cardGrad)" fillOpacity="0.8" />
      <rect x="14" y="15" width="6" height="2" rx="1" fill="url(#cardGrad)" fillOpacity="0.6" />
    </g>
  </svg>
);