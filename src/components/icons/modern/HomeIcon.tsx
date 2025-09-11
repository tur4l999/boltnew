import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const HomeIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="homeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <filter id="homeBlur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
      </filter>
    </defs>
    
    {/* Shadow base */}
    <path
      d="M12 2.5L3.5 9.5V19.5C3.5 20.0523 3.94772 20.5 4.5 20.5H9.5V15.5C9.5 14.9477 9.94772 14.5 10.5 14.5H13.5C14.0523 14.5 14.5 14.9477 14.5 15.5V20.5H19.5C20.0523 20.5 20.5 20.0523 20.5 19.5V9.5L12 2.5Z"
      fill="#000"
      fillOpacity="0.05"
      filter="url(#homeBlur)"
      transform="translate(0, 1)"
    />
    
    {/* Main shape */}
    <path
      d="M12 2.5L3.5 9.5V19.5C3.5 20.0523 3.94772 20.5 4.5 20.5H9.5V15.5C9.5 14.9477 9.94772 14.5 10.5 14.5H13.5C14.0523 14.5 14.5 14.9477 14.5 15.5V20.5H19.5C20.0523 20.5 20.5 20.0523 20.5 19.5V9.5L12 2.5Z"
      stroke="url(#homeGrad1)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Roof accent */}
    <path
      d="M2 10.5L12 3L22 10.5"
      stroke="url(#homeGrad1)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Door detail */}
    <rect
      x="10.5"
      y="15.5"
      width="3"
      height="5"
      fill="url(#homeGrad1)"
      fillOpacity="0.2"
      rx="0.5"
    />
    
    {/* Window */}
    <circle cx="8" cy="11" r="1" fill="url(#homeGrad1)" fillOpacity="0.4" />
    <circle cx="16" cy="11" r="1" fill="url(#homeGrad1)" fillOpacity="0.4" />
  </svg>
);