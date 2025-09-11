import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const BookIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="bookGrad1" x1="0%" y1="0%" x2="70%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <linearGradient id="bookGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
    
    {/* Book shadow */}
    <path
      d="M19 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H19V3Z"
      fill="#000"
      fillOpacity="0.05"
      transform="translate(0.5, 0.5)"
    />
    
    {/* Book spine */}
    <path
      d="M5 3V19C5 20.1046 5.89543 21 7 21H19V3H7C5.89543 3 5 3.89543 5 5Z"
      stroke="url(#bookGrad1)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Pages effect */}
    <path d="M19 3V21" stroke="url(#bookGrad1)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 4V20" stroke="url(#bookGrad2)" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
    <path d="M17 4V20" stroke="url(#bookGrad2)" strokeWidth="0.5" strokeLinecap="round" opacity="0.3" />
    
    {/* Bookmark */}
    <path
      d="M9 3V11L11 9.5L13 11V3"
      stroke="url(#bookGrad2)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="url(#bookGrad2)"
      fillOpacity="0.2"
    />
    
    {/* Cover detail */}
    <rect x="8" y="14" width="6" height="0.5" fill="url(#bookGrad1)" opacity="0.3" rx="0.25" />
    <rect x="8" y="16" width="4" height="0.5" fill="url(#bookGrad1)" opacity="0.2" rx="0.25" />
  </svg>
);