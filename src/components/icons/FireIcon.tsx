import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const FireIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 10.7679 5.37764 9.62668 6.02499 8.68C6.31278 8.26541 6.98039 8.34674 7.14974 8.81625L7.62775 10.1125C7.95463 11.0156 8.35764 11.8879 8.83296 12.72C9.27126 13.4878 10.2595 13.4943 10.7065 12.7312L11.5422 11.3097C11.7025 11.0398 12.0745 11.0033 12.2834 11.229L13.6333 12.6984C13.8524 12.9352 14.237 12.8984 14.408 12.6263C14.7307 12.111 15 11.5681 15 11C15 10.0572 14.6761 9.19225 14.1268 8.50725M12 3V7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);