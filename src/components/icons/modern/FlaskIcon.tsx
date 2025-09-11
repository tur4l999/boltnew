import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const FlaskIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="flaskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="50%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
      <filter id="flaskGlow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <pattern id="bubbles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="1.5" fill="url(#flaskGradient)" opacity="0.4">
          <animate attributeName="cy" from="20" to="-5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="15" cy="15" r="1" fill="url(#flaskGradient)" opacity="0.3">
          <animate attributeName="cy" from="20" to="-5" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="25" cy="10" r="1.2" fill="url(#flaskGradient)" opacity="0.35">
          <animate attributeName="cy" from="20" to="-5" dur="2.8s" repeatCount="indefinite" />
        </circle>
      </pattern>
    </defs>
    
    <g filter="url(#flaskGlow)">
      <path
        d="M10 2V7.5L6 15L4.5 19C4.22386 19.6045 4.45517 20.3137 5.03416 20.6382C5.22415 20.7476 5.43645 20.8117 5.655 20.825C5.71696 20.8289 5.77928 20.8309 5.842 20.831H18.159C18.8112 20.831 19.355 20.3445 19.4295 19.6973C19.4624 19.4161 19.4041 19.1312 19.263 18.885L18 15L14 7.5V2"
        stroke="url(#flaskGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8 2H16"
        stroke="url(#flaskGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M6.5 15H17.5L15 20H9L6.5 15Z"
        fill="url(#bubbles)"
        opacity="0.3"
      />
      <path
        d="M7.5 15C8.5 15.5 10 16 12 16C14 16 15.5 15.5 16.5 15"
        stroke="url(#flaskGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
    </g>
  </svg>
);