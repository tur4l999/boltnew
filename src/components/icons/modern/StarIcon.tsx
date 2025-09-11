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
      <linearGradient id="starGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fde047" />
        <stop offset="50%" stopColor="#facc15" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <filter id="starGlow">
        <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Star shape */}
    <path
      d="M12 2L14.7 8.6L22 9.2L16.8 13.9L18.4 21L12 17.3L5.6 21L7.2 13.9L2 9.2L9.3 8.6L12 2Z"
      stroke={filled ? "none" : "url(#starGrad1)"}
      strokeWidth={filled ? "0" : "1.5"}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={filled ? "url(#starGrad1)" : "none"}
      filter={filled ? "url(#starGlow)" : "none"}
    />
    
    {/* Inner glow for filled state */}
    {filled && (
      <path
        d="M12 6L13.5 10L17.5 10.5L14.5 13L15.5 17L12 15L8.5 17L9.5 13L6.5 10.5L10.5 10L12 6Z"
        fill="white"
        fillOpacity="0.3"
      />
    )}
    
    {/* Sparkle points */}
    {filled && (
      <>
        <circle cx="12" cy="2" r="0.5" fill="white" opacity="0.8" />
        <circle cx="22" cy="9.2" r="0.3" fill="white" opacity="0.6" />
        <circle cx="18.4" cy="21" r="0.3" fill="white" opacity="0.6" />
        <circle cx="5.6" cy="21" r="0.3" fill="white" opacity="0.6" />
        <circle cx="2" cy="9.2" r="0.3" fill="white" opacity="0.6" />
      </>
    )}
  </svg>
);