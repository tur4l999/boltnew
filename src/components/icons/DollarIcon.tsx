import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const DollarIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6V18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 8.5C16 7.67157 15.1046 7 14 7H10C8.89543 7 8 7.67157 8 8.5C8 9.32843 8.89543 10 10 10H14C15.1046 10 16 10.6716 16 11.5C16 12.3284 15.1046 13 14 13H10C8.89543 13 8 13.6716 8 14.5C8 15.3284 8.89543 16 10 16H14C15.1046 16 16 15.3284 16 14.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);