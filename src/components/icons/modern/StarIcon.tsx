import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
  filled?: boolean;
}

export const StarIcon: React.FC<IconProps> = ({ className = '', size = 24, filled = false }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <filter id="starGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g filter={filled ? "url(#starGlow)" : ""}>
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke={filled ? "none" : "url(#starGrad)"}
        strokeWidth={filled ? "0" : "2"}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? "url(#starGrad)" : "none"}
      />
    </g>
  </svg>
);