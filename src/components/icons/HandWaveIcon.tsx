import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const HandWaveIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.5 10V3.5C14.5 2.67157 13.8284 2 13 2C12.1716 2 11.5 2.67157 11.5 3.5V10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 12V5.5C17.5 4.67157 16.8284 4 16 4C15.1716 4 14.5 4.67157 14.5 5.5V10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.5 14V9C20.5 8.17157 19.8284 7.5 19 7.5C18.1716 7.5 17.5 8.17157 17.5 9V12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5 10V5C11.5 4.17157 10.8284 3.5 10 3.5C9.17157 3.5 8.5 4.17157 8.5 5V13L7 11.5C6.17157 10.6716 4.82843 10.6716 4 11.5C3.17157 12.3284 3.17157 13.6716 4 14.5L8.5 19C9.5 20 11 21 13 21H17C19.2091 21 21 19.2091 21 17V14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);