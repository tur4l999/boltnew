import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ShoppingBagIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="bagGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#be185d" />
      </linearGradient>
      <linearGradient id="bagGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fce7f3" />
        <stop offset="100%" stopColor="#fbcfe8" />
      </linearGradient>
    </defs>
    
    {/* Bag shadow */}
    <path
      d="M5.5 7.5H18.5L17.5 19.5C17.5 20.0523 17.0523 20.5 16.5 20.5H7.5C6.94772 20.5 6.5 20.0523 6.5 19.5L5.5 7.5Z"
      fill="#000"
      fillOpacity="0.05"
      transform="translate(0.5, 0.5)"
    />
    
    {/* Main bag */}
    <path
      d="M5.5 7.5H18.5L17.5 19.5C17.5 20.0523 17.0523 20.5 16.5 20.5H7.5C6.94772 20.5 6.5 20.0523 6.5 19.5L5.5 7.5Z"
      stroke="url(#bagGrad1)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Handle */}
    <path
      d="M8 7.5V5C8 3.34315 9.34315 2 11 2H13C14.6569 2 16 3.34315 16 5V7.5"
      stroke="url(#bagGrad1)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Inner detail */}
    <rect x="8" y="10" width="8" height="0.5" fill="url(#bagGrad1)" opacity="0.3" rx="0.25" />
    
    {/* Shopping items hint */}
    <circle cx="10" cy="14" r="2" fill="url(#bagGrad2)" opacity="0.5" />
    <circle cx="14" cy="15" r="1.5" fill="url(#bagGrad2)" opacity="0.4" />
    
    {/* Handle details */}
    <circle cx="10" cy="7.5" r="0.5" fill="url(#bagGrad1)" />
    <circle cx="14" cy="7.5" r="0.5" fill="url(#bagGrad1)" />
    
    {/* Shine effect */}
    <path
      d="M7 9C7 9 8 8 9 8"
      stroke="white"
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.4"
    />
  </svg>
);