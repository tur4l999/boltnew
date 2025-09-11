import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const PlayIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="playGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="50%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
      <filter id="playGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feFlood floodColor="#ef4444" floodOpacity="0.5"/>
        <feComposite in2="coloredBlur" operator="in"/>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="playShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.3" />
      </filter>
    </defs>
    
    <g filter="url(#playShadow)">
      {/* Outer ring with pulse */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="url(#playGrad)"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
      >
        <animate attributeName="r" values="10;11;10" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* Main circle */}
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="url(#playGrad)"
        filter="url(#playGlow)"
      />
      
      {/* Play triangle */}
      <path
        d="M9.5 7.5L17 12L9.5 16.5V7.5Z"
        fill="white"
        fillOpacity="0.9"
      >
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1;1.1;1"
          dur="2s"
          repeatCount="indefinite"
          additive="sum"
        />
      </path>
      
      {/* Gloss effect */}
      <ellipse
        cx="12"
        cy="8"
        rx="6"
        ry="4"
        fill="white"
        fillOpacity="0.2"
      />
      
      {/* Rotating particles */}
      <g className="animate-spin-slow" style={{ transformOrigin: '12px 12px' }}>
        <circle cx="12" cy="2" r="0.5" fill="white" opacity="0.8" />
        <circle cx="22" cy="12" r="0.5" fill="white" opacity="0.6" />
        <circle cx="12" cy="22" r="0.5" fill="white" opacity="0.4" />
        <circle cx="2" cy="12" r="0.5" fill="white" opacity="0.2" />
      </g>
    </g>
  </svg>
);