import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ToolIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="toolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
      <filter id="toolShadow">
        <feDropShadow dx="1" dy="3" stdDeviation="3" floodOpacity="0.25" />
      </filter>
      <pattern id="toolPattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="0.5" fill="url(#toolGrad)" opacity="0.3" />
      </pattern>
    </defs>
    
    <g filter="url(#toolShadow)">
      {/* Wrench */}
      <g transform="rotate(-45 12 12)">
        <path
          d="M8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4V16L10 20L8 16V4Z"
          fill="url(#toolGrad)"
          fillOpacity="0.9"
          stroke="url(#toolGrad)"
          strokeWidth="1"
        />
        <circle cx="10" cy="5" r="2.5" fill="white" fillOpacity="0.3" />
        <rect x="8" y="8" width="4" height="6" fill="url(#toolPattern)" />
      </g>
      
      {/* Screwdriver */}
      <g transform="rotate(45 12 12)">
        <rect
          x="11"
          y="6"
          width="2"
          height="10"
          rx="1"
          fill="url(#toolGrad)"
          fillOpacity="0.8"
        />
        <path
          d="M11 16L12 20L13 16"
          fill="url(#toolGrad)"
        />
        <rect x="11" y="6" width="2" height="2" fill="white" fillOpacity="0.4" />
      </g>
      
      {/* Sparks */}
      <circle cx="18" cy="6" r="0.5" fill="#fbbf24" opacity="0.8">
        <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="6" cy="18" r="0.5" fill="#f59e0b" opacity="0.8">
        <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="19" cy="19" r="0.5" fill="#ef4444" opacity="0.8">
        <animate attributeName="opacity" values="0;0.8;0" dur="2s" begin="1s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);