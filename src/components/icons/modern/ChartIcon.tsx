import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ChartIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="chartGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="50%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#6ee7b7" />
      </linearGradient>
      <filter id="chartShadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.2" />
      </filter>
    </defs>
    
    <g filter="url(#chartShadow)">
      <rect x="4" y="12" width="4" height="8" rx="2" fill="url(#chartGrad)" opacity="0.8">
        <animate attributeName="height" values="8;10;8" dur="2s" repeatCount="indefinite" />
        <animate attributeName="y" values="12;10;12" dur="2s" repeatCount="indefinite" />
      </rect>
      <rect x="10" y="8" width="4" height="12" rx="2" fill="url(#chartGrad)" opacity="0.9">
        <animate attributeName="height" values="12;14;12" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="y" values="8;6;8" dur="2.5s" repeatCount="indefinite" />
      </rect>
      <rect x="16" y="4" width="4" height="16" rx="2" fill="url(#chartGrad)">
        <animate attributeName="height" values="16;18;16" dur="3s" repeatCount="indefinite" />
        <animate attributeName="y" values="4;2;4" dur="3s" repeatCount="indefinite" />
      </rect>
    </g>
  </svg>
);