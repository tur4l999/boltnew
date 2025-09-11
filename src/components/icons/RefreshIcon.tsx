import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const RefreshIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 4V10H1M1 10H7M1 10L5.64 5.64C6.71063 4.56975 7.99028 3.73207 9.39597 3.17878C10.8017 2.62549 12.3032 2.36824 13.8078 2.42268C15.3125 2.47712 16.7877 2.84188 18.1464 3.49426C19.5052 4.14665 20.7176 5.07305 21.71 6.21M23 20V14H23M23 14H17M23 14L18.36 18.36C17.2894 19.4303 16.0097 20.2679 14.604 20.8212C13.1983 21.3745 11.6968 21.6318 10.1922 21.5773C8.68754 21.5229 7.21234 21.1581 5.85356 20.5057C4.49478 19.8534 3.28243 18.927 2.29 17.79"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);