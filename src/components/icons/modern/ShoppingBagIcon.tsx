import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ShoppingBagIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="bagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <filter id="bagShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.15" />
      </filter>
    </defs>
    
    <g filter="url(#bagShadow)">
      <path
        d="M5 7H19C19.5523 7 20 7.44772 20 8V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V8C4 7.44772 4.44772 7 5 7Z"
        stroke="url(#bagGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="url(#bagGradient)"
        fillOpacity="0.05"
      />
      <path
        d="M8 7V5C8 3.34315 9.34315 2 11 2H13C14.6569 2 16 3.34315 16 5V7"
        stroke="url(#bagGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle
        cx="9"
        cy="11"
        r="1"
        fill="url(#bagGradient)"
        opacity="0.8"
      />
      <circle
        cx="15"
        cy="11"
        r="1"
        fill="url(#bagGradient)"
        opacity="0.8"
      />
      <path
        d="M9 14C9 15.6569 10.3431 17 12 17C13.6569 17 15 15.6569 15 14"
        stroke="url(#bagGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>
  </svg>
);