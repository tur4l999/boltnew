/** @jsxImportSource react */
import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { EmojiIcon } from '../ui/EmojiIcon';

interface AppealSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionId: string;
  questionText: string;
}

export function AppealSubmitModal({ isOpen, onClose, questionId, questionText }: AppealSubmitModalProps) {
  const { isDarkMode } = useApp();
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success message
    alert('Müraciətiniz göndərildi!');
    setIsSubmitting(false);
    setReason('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card 
        variant="glass"
        padding="lg"
        className={`w-full max-w-md ${
          isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Müraciət et
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-gray-700/50 text-gray-400 hover:text-gray-200' 
                : 'hover:bg-gray-100/50 text-gray-500 hover:text-gray-700'
            }`}
          >
            <EmojiIcon emoji="✕" size={20} />
          </button>
        </div>

        <div className={`mb-4 p-3 rounded-lg ${
          isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
        }`}>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {questionText}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Müraciət səbəbi
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Zəhmət olmasa müraciət səbəbinizi yazın..."
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-700/50 border-gray-600/50 text-gray-100 placeholder:text-gray-500' 
                  : 'bg-white/70 border-gray-200/50 text-gray-900 placeholder:text-gray-500'
              } focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20`}
              required
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Ləğv et
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!reason.trim() || isSubmitting}
              loading={isSubmitting}
              className="flex-1"
            >
              Göndər
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
