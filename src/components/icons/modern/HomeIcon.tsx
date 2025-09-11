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
      <linearGradient id="homeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#059669" stopOpacity="0.9" />
      </linearGradient>
      <filter id="homeShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
      </filter>
    </defs>
    
    <g filter="url(#homeShadow)">
      <path
        d="M20 9.5V19C20 19.7956 19.6839 20.5587 19.1213 21.1213C18.5587 21.6839 17.7956 22 17 22H7C6.20435 22 5.44129 21.6839 4.87868 21.1213C4.31607 20.5587 4 19.7956 4 19V9.5"
        stroke="url(#homeGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M22 11L12 2L2 11"
        stroke="url(#homeGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 22V16C9.5 15.4477 9.94772 15 10.5 15H13.5C14.0523 15 14.5 15.4477 14.5 16V22"
        stroke="url(#homeGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="white"
        fillOpacity="0.1"
      />
    </g>
  </svg>
);