import React from 'react';
import { useApp } from '../../contexts/AppContext';

interface ModalProps {
  open: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ open, title, message, onClose, primaryAction, secondaryAction, children, size = 'md' }: ModalProps) {
  const { isDarkMode } = useApp();
  if (!open) return null;
  const sizeClass = size === 'sm' ? 'sm:max-w-[320px]' : size === 'lg' ? 'sm:max-w-md' : 'sm:max-w-sm';
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Sheet/Modal */}
      <div className={`relative w-full ${sizeClass} sm:rounded-2xl ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
      } shadow-2xl sm:mx-auto sm:my-8 rounded-t-2xl p-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        {title && <div className="text-base font-bold mb-1">{title}</div>}
        {message && <div className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{message}</div>}
        {children}
        {(primaryAction || secondaryAction) && (
          <div className="flex gap-2 justify-end mt-4">
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className={`px-3 py-2 text-sm rounded-xl border ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                {secondaryAction.label}
              </button>
            )}
            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                className="px-3 py-2 text-sm rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
              >
                {primaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}