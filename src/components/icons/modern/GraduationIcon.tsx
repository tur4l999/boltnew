import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const GraduationIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="gradCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <filter id="gradCapShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" />
      </filter>
      <filter id="gradCapGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#gradCapShadow)">
      {/* Cap base */}
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        fill="url(#gradCapGrad)"
        stroke="url(#gradCapGrad)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      
      {/* Cap top with 3D effect */}
      <path
        d="M12 2L22 7L12 10L2 7L12 2Z"
        fill="url(#gradCapGrad)"
        fillOpacity="0.8"
      />
      
      {/* Tassel string */}
      <path
        d="M22 7V13"
        stroke="url(#gradCapGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Tassel */}
      <g filter="url(#gradCapGlow)">
        <circle cx="22" cy="15" r="2" fill="url(#gradCapGrad)">
          <animate attributeName="cy" values="15;16;15" dur="2s" repeatCount="indefinite" />
        </circle>
        <path
          d="M22 17V19"
          stroke="url(#gradCapGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <animate attributeName="d" 
            values="M22 17V19;M22 17V20;M22 17V19" 
            dur="2s" 
            repeatCount="indefinite" />
        </path>
      </g>
      
      {/* Face silhouette */}
      <ellipse cx="12" cy="16" rx="5" ry="4" fill="url(#gradCapGrad)" fillOpacity="0.2" />
      
      {/* Success star */}
      <path
        d="M12 14L13 16L15 16.5L13.5 18L14 20L12 19L10 20L10.5 18L9 16.5L11 16L12 14Z"
        fill="#fbbf24"
        opacity="0.8"
      >
        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 12 17;360 12 17"
          dur="20s"
          repeatCount="indefinite"
        />
      </path>
    </g>
  </svg>
);