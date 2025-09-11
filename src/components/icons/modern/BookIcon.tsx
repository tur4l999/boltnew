import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const BookIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <filter id="bookShadow">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
        <feOffset dx="0" dy="2" result="offsetblur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.2"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#bookShadow)">
      <rect
        x="5"
        y="3"
        width="14"
        height="18"
        rx="3"
        stroke="url(#bookGradient)"
        strokeWidth="2"
        fill="url(#bookGradient)"
        fillOpacity="0.1"
      />
      <path
        d="M19 16C19 17.6569 17.6569 19 16 19H8C6.34315 19 5 17.6569 5 16"
        stroke="url(#bookGradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 7H15"
        stroke="url(#bookGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M9 11H15"
        stroke="url(#bookGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="12" cy="15" r="1.5" fill="url(#bookGradient)" opacity="0.6" />
    </g>
  </svg>
);