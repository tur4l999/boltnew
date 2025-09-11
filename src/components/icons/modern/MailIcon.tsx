import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const MailIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="mailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <filter id="mailShadow">
        <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.2" />
      </filter>
      <filter id="mailGlow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <g filter="url(#mailShadow)">
      {/* Envelope body */}
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="3"
        fill="white"
        stroke="url(#mailGrad)"
        strokeWidth="2"
      />
      
      {/* Letter inside */}
      <rect
        x="5"
        y="8"
        width="14"
        height="10"
        rx="1"
        fill="url(#mailGrad)"
        fillOpacity="0.1"
      />
      
      {/* Envelope flap */}
      <path
        d="M2 7L12 14L22 7"
        stroke="url(#mailGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Animated sending effect */}
      <g filter="url(#mailGlow)">
        <path
          d="M2 7L12 14L22 7"
          stroke="url(#mailGrad)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0"
        >
          <animate 
            attributeName="opacity" 
            values="0;0.8;0" 
            dur="3s" 
            repeatCount="indefinite" 
          />
          <animate 
            attributeName="stroke-width" 
            values="1;3;1" 
            dur="3s" 
            repeatCount="indefinite" 
          />
        </path>
      </g>
      
      {/* New mail indicator */}
      <circle cx="20" cy="6" r="3" fill="#ef4444" filter="url(#mailGlow)">
        <animate attributeName="r" values="3;3.5;3" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="20" y="7.5" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold">!</text>
    </g>
  </svg>
);