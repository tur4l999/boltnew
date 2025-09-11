import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const BellIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="bellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <filter id="bellGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#bellGlow)">
      <path
        d="M12 2C13.5913 2 15.1174 2.63214 16.2426 3.75736C17.3679 4.88258 18 6.4087 18 8C18 11.0902 18.7719 13.206 19.5 14.5C19.8224 15.1085 19.3525 16 18.6877 16H5.31233C4.64747 16 4.17765 15.1085 4.5 14.5C5.22808 13.206 6 11.0902 6 8C6 6.4087 6.63214 4.88258 7.75736 3.75736C8.88258 2.63214 10.4087 2 12 2Z"
        stroke="url(#bellGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="url(#bellGrad)"
        fillOpacity="0.15"
      />
      <path
        d="M9 16V17C9 17.7956 9.31607 18.5587 9.87868 19.1213C10.4413 19.6839 11.2044 20 12 20C12.7956 20 13.5587 19.6839 14.1213 19.1213C14.6839 18.5587 15 17.7956 15 17V16"
        stroke="url(#bellGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="8" r="1.5" fill="url(#bellGrad)" opacity="0.8">
        <animate attributeName="r" values="1.5;2;1.5" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);