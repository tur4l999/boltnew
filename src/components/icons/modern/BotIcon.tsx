import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const BotIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="botGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="50%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#6366f1" />
      </linearGradient>
      <linearGradient id="botEyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
      <filter id="botGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="botShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" />
      </filter>
    </defs>
    
    <g filter="url(#botShadow)">
      {/* Antenna */}
      <circle cx="12" cy="3" r="1.5" fill="url(#botGrad)" filter="url(#botGlow)">
        <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <rect x="11.5" y="4" width="1" height="3" fill="url(#botGrad)" />
      
      {/* Head */}
      <rect
        x="6"
        y="6"
        width="12"
        height="8"
        rx="4"
        fill="url(#botGrad)"
        stroke="url(#botGrad)"
        strokeWidth="1"
      />
      
      {/* Face screen */}
      <rect
        x="7"
        y="7"
        width="10"
        height="6"
        rx="3"
        fill="white"
        fillOpacity="0.2"
      />
      
      {/* Eyes with AI effect */}
      <g filter="url(#botGlow)">
        <circle cx="9.5" cy="10" r="1.5" fill="url(#botEyeGrad)">
          <animate attributeName="r" values="1.5;0.5;1.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="14.5" cy="10" r="1.5" fill="url(#botEyeGrad)">
          <animate attributeName="r" values="1.5;0.5;1.5" dur="3s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        
        {/* Scanning line */}
        <rect x="8" y="9" width="8" height="0.5" fill="url(#botEyeGrad)" opacity="0.5">
          <animate attributeName="y" values="8;12;8" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </rect>
      </g>
      
      {/* Body */}
      <rect
        x="7"
        y="14"
        width="10"
        height="6"
        rx="2"
        fill="url(#botGrad)"
        fillOpacity="0.8"
      />
      
      {/* Circuit pattern */}
      <g opacity="0.3">
        <rect x="9" y="16" width="2" height="1" fill="white" />
        <rect x="13" y="16" width="2" height="1" fill="white" />
        <rect x="10" y="18" width="4" height="1" fill="white" />
      </g>
      
      {/* Arms */}
      <rect x="4" y="15" width="3" height="1" rx="0.5" fill="url(#botGrad)" />
      <rect x="17" y="15" width="3" height="1" rx="0.5" fill="url(#botGrad)" />
      
      {/* Floating data particles */}
      <circle cx="3" cy="8" r="0.5" fill="url(#botEyeGrad)" opacity="0">
        <animate attributeName="opacity" values="0;0.8;0" dur="3s" repeatCount="indefinite" />
        <animate attributeName="cy" values="8;6;8" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="21" cy="12" r="0.5" fill="url(#botEyeGrad)" opacity="0">
        <animate attributeName="opacity" values="0;0.8;0" dur="3s" begin="1s" repeatCount="indefinite" />
        <animate attributeName="cy" values="12;10;12" dur="3s" begin="1s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);