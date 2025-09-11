import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const RocketIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.5 16.5C4.5 14.8432 5.84315 13.5 7.5 13.5C8.06062 13.5 8.57859 13.6861 9 13.9985M4.5 16.5C4.5 18.1569 5.84315 19.5 7.5 19.5C9.15685 19.5 10.5 18.1569 10.5 16.5C10.5 14.8431 9.15685 13.5 7.5 13.5M4.5 16.5H3M7.5 13.5V10.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 7.5C13.5 5.84315 14.8431 4.5 16.5 4.5C17.0606 4.5 17.5786 4.68607 18 4.99846M13.5 7.5C13.5 9.15685 14.8431 10.5 16.5 10.5C18.1569 10.5 19.5 9.15685 19.5 7.5C19.5 5.84315 18.1569 4.5 16.5 4.5M13.5 7.5H21M16.5 4.5V3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 21L9 10.5C9 7.18629 11.6863 4.5 15 4.5V4.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 21V10.5C15 7.18629 12.3137 4.5 9 4.5V4.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);