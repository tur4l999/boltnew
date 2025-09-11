import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const BellIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="bellGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <filter id="bellRing">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
      </filter>
    </defs>
    
    {/* Bell body */}
    <path
      d="M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5C16.2091 5 18 6.79086 18 9V14L19.7071 15.7071C19.8946 15.8946 20 16.149 20 16.4142V17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17V16.4142C4 16.149 4.10536 15.8946 4.29289 15.7071L6 14V9C6 6.79086 7.79086 5 10 5Z"
      stroke="url(#bellGrad1)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Bell interior */}
    <path
      d="M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5C16.2091 5 18 6.79086 18 9V14L19.7071 15.7071C19.8946 15.8946 20 16.149 20 16.4142V17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17V16.4142C4 16.149 4.10536 15.8946 4.29289 15.7071L6 14V9C6 6.79086 7.79086 5 10 5Z"
      fill="url(#bellGrad1)"
      fillOpacity="0.1"
    />
    
    {/* Clapper */}
    <path
      d="M9 18C9 19.6569 10.3431 21 12 21C13.6569 21 15 19.6569 15 18"
      stroke="url(#bellGrad1)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    
    {/* Ring effect */}
    <g opacity="0">
      <circle cx="12" cy="12" r="8" stroke="url(#bellGrad1)" strokeWidth="0.5" fill="none">
        <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.5;0" dur="2s" repeatCount="indefinite" />
      </circle>
    </g>
    
    {/* Notification dot */}
    <circle cx="17" cy="6" r="2" fill="#ef4444">
      <animate attributeName="r" values="2;2.5;2" dur="1s" repeatCount="indefinite" />
    </circle>
  </svg>
);