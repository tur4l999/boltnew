import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const FlaskIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="flaskGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="50%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <linearGradient id="flaskLiquid" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef3c7" />
        <stop offset="50%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <filter id="flaskGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Flask outline */}
    <path
      d="M10 2V8L6 14.5L5 18.5C4.72386 19.3284 5.2477 20.1667 6.09615 20.2692C6.16211 20.2775 6.22875 20.2817 6.29545 20.2817H17.7045C18.5613 20.2817 19.2568 19.5863 19.2568 18.7295C19.2568 18.6631 19.2526 18.5968 19.2443 18.5313L18 14.5L14 8V2"
      stroke="url(#flaskGrad1)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Cork */}
    <rect x="8" y="1" width="8" height="2" rx="1" stroke="url(#flaskGrad1)" strokeWidth="1.5" fill="none" />
    
    {/* Liquid */}
    <path
      d="M7 16H17L15.5 20H8.5L7 16Z"
      fill="url(#flaskLiquid)"
      opacity="0.8"
    />
    
    {/* Bubbles */}
    <circle cx="10" cy="17.5" r="0.8" fill="url(#flaskGrad1)" opacity="0.6">
      <animate attributeName="cy" values="19;16;19" dur="3s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
    </circle>
    <circle cx="14" cy="18.5" r="0.5" fill="url(#flaskGrad1)" opacity="0.5">
      <animate attributeName="cy" values="19;16.5;19" dur="2.5s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="12" cy="17" r="0.6" fill="url(#flaskGrad1)" opacity="0.4">
      <animate attributeName="cy" values="19;16;19" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
    </circle>
    
    {/* Reflection */}
    <ellipse cx="11" cy="10" rx="2" ry="3" fill="white" opacity="0.2" />
  </svg>
);