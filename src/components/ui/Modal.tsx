import React from 'react';

interface ModalProps {
  open: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}

export function Modal({ open, title, message, onClose, primaryAction, secondaryAction }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Sheet/Modal */}
      <div className="relative w-full sm:max-w-sm sm:rounded-2xl bg-white text-gray-900 shadow-xl sm:mx-auto sm:my-8 rounded-t-2xl p-4">
        {title && <div className="text-base font-bold mb-1">{title}</div>}
        {message && <div className="text-sm text-gray-700 mb-3">{message}</div>}
        <div className="flex gap-2 justify-end">
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              {secondaryAction.label}
            </button>
          )}
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="px-3 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {primaryAction.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}