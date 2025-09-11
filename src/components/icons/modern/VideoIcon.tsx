import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const VideoIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="vidGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <linearGradient id="vidGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fecaca" />
        <stop offset="100%" stopColor="#fca5a5" />
      </linearGradient>
    </defs>
    
    {/* Main camera body */}
    <rect
      x="3"
      y="6"
      width="13"
      height="12"
      rx="2"
      stroke="url(#vidGrad1)"
      strokeWidth="1.5"
      fill="none"
    />
    
    {/* Lens */}
    <circle
      cx="9.5"
      cy="12"
      r="3"
      stroke="url(#vidGrad1)"
      strokeWidth="1.5"
      fill="url(#vidGrad2)"
      fillOpacity="0.2"
    />
    
    {/* Inner lens */}
    <circle cx="9.5" cy="12" r="1.5" fill="url(#vidGrad1)" fillOpacity="0.4" />
    <circle cx="9.5" cy="12" r="0.5" fill="url(#vidGrad1)" />
    
    {/* Side piece */}
    <path
      d="M16 9V15L20.5 17.5C20.7761 17.6381 21.1 17.4478 21.1 17.1382V6.86185C21.1 6.55223 20.7761 6.36193 20.5 6.5L16 9Z"
      stroke="url(#vidGrad1)"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="url(#vidGrad1)"
      fillOpacity="0.1"
    />
    
    {/* Recording indicator */}
    <circle cx="5" cy="8" r="1" fill="#ef4444">
      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
    </circle>
    
    {/* Lens flare */}
    <circle cx="8" cy="10.5" r="0.5" fill="white" opacity="0.6" />
  </svg>
);