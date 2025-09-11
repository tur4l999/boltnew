import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const NoteIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="noteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <filter id="noteShadow">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.2" />
      </filter>
    </defs>
    
    <g filter="url(#noteShadow)">
      <path
        d="M5 3C4.44772 3 4 3.44772 4 4V20C4 20.5523 4.44772 21 5 21H15C15.5523 21 16 20.5523 16 20V8L12 3H5Z"
        stroke="url(#noteGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="white"
        fillOpacity="0.95"
      />
      <path
        d="M12 3V7C12 7.55228 12.4477 8 13 8H16"
        stroke="url(#noteGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="url(#noteGrad)"
        fillOpacity="0.2"
      />
      <rect x="7" y="11" width="6" height="2" rx="1" fill="url(#noteGrad)" fillOpacity="0.6" />
      <rect x="7" y="15" width="4" height="2" rx="1" fill="url(#noteGrad)" fillOpacity="0.4" />
      <path
        d="M17.5 10L20 7.5L21.5 9L19 11.5L17.5 10Z"
        fill="url(#noteGrad)"
        stroke="url(#noteGrad)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);