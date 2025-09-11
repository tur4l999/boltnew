import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const PackageIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="pkgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <filter id="pkgShadow">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.25" />
      </filter>
    </defs>
    
    <g filter="url(#pkgShadow)">
      <path
        d="M12 2L20 7V17L12 22L4 17V7L12 2Z"
        stroke="url(#pkgGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="url(#pkgGrad)"
        fillOpacity="0.1"
      />
      <path
        d="M12 2L20 7L12 12L4 7L12 2Z"
        fill="url(#pkgGrad)"
        fillOpacity="0.3"
      />
      <path
        d="M12 12V22"
        stroke="url(#pkgGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M4 7L12 12"
        stroke="url(#pkgGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M20 7L12 12"
        stroke="url(#pkgGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </g>
  </svg>
);