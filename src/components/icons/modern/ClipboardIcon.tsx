import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ClipboardIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="clipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#0891b2" />
      </linearGradient>
      <filter id="clipShadow">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.2" />
      </filter>
      <pattern id="checkPattern" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
        <rect width="1" height="1" fill="url(#clipGrad)" opacity="0.1" />
      </pattern>
    </defs>
    
    <g filter="url(#clipShadow)">
      {/* Clipboard body */}
      <rect
        x="5"
        y="3"
        width="14"
        height="18"
        rx="2"
        fill="white"
        stroke="url(#clipGrad)"
        strokeWidth="2"
      />
      
      {/* Clip */}
      <rect
        x="8"
        y="1"
        width="8"
        height="5"
        rx="2"
        fill="url(#clipGrad)"
        stroke="url(#clipGrad)"
        strokeWidth="1"
      />
      <rect x="10" y="2" width="4" height="2" rx="1" fill="white" fillOpacity="0.5" />
      
      {/* Paper texture */}
      <rect x="5" y="3" width="14" height="18" rx="2" fill="url(#checkPattern)" />
      
      {/* Check items with animation */}
      <g>
        <rect x="8" y="9" width="8" height="1.5" rx="0.75" fill="url(#clipGrad)" opacity="0.3" />
        <circle cx="7" cy="9.75" r="1" fill="url(#clipGrad)" opacity="0.8">
          <animate attributeName="r" values="0;1;1" dur="0.5s" begin="0s" fill="freeze" />
        </circle>
        <path d="M6.5 9.75L7 10.25L7.5 9.25" stroke="white" strokeWidth="0.5" strokeLinecap="round">
          <animate attributeName="opacity" values="0;1" dur="0.5s" begin="0.5s" fill="freeze" />
        </path>
      </g>
      
      <g>
        <rect x="8" y="13" width="8" height="1.5" rx="0.75" fill="url(#clipGrad)" opacity="0.3" />
        <circle cx="7" cy="13.75" r="1" fill="url(#clipGrad)" opacity="0.8">
          <animate attributeName="r" values="0;1;1" dur="0.5s" begin="1s" fill="freeze" />
        </circle>
        <path d="M6.5 13.75L7 14.25L7.5 13.25" stroke="white" strokeWidth="0.5" strokeLinecap="round">
          <animate attributeName="opacity" values="0;1" dur="0.5s" begin="1.5s" fill="freeze" />
        </path>
      </g>
      
      <g>
        <rect x="8" y="17" width="8" height="1.5" rx="0.75" fill="url(#clipGrad)" opacity="0.3" />
        <circle cx="7" cy="17.75" r="1" fill="url(#clipGrad)" opacity="0.8">
          <animate attributeName="r" values="0;1;1" dur="0.5s" begin="2s" fill="freeze" />
        </circle>
        <path d="M6.5 17.75L7 18.25L7.5 17.25" stroke="white" strokeWidth="0.5" strokeLinecap="round">
          <animate attributeName="opacity" values="0;1" dur="0.5s" begin="2.5s" fill="freeze" />
        </path>
      </g>
    </g>
  </svg>
);