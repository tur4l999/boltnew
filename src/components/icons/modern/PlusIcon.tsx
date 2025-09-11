import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const PlusIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="plusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <filter id="plusGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#plusGlow)">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="9"
        stroke="url(#plusGradient)"
        strokeWidth="2"
        fill="url(#plusGradient)"
        fillOpacity="0.1"
      />
      <path
        d="M12 8V16M8 12H16"
        stroke="url(#plusGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);