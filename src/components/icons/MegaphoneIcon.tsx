import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const MegaphoneIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 11.5C21 16.75 17.75 21 13.5 21C13.1666 21 12.8416 20.9833 12.525 20.95C11.6917 20.8667 10.9083 20.6333 10.2 20.275L6.3 21.5L7.525 17.6C6.49166 16.025 5.875 14.15 5.875 12.125C5.875 6.875 10.125 2.625 15.375 2.625C17.0083 2.625 18.525 3.05833 19.825 3.81666"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 2L16 7L13 4L11 6L14 9L21 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);