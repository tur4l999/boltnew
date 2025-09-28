import React, { useState, useRef } from 'react';
import { useApp } from '../../contexts/AppContext';
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Send, 
  Paperclip, 
  Eye, 
  Clock, 
  Tag, 
  User,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import type { QAQuestion, QAMessage, QAUser } from '../../lib/types';

export function QADetailScreen() {
  const { t, isDarkMode, navigate, goBack, currentScreen, getQuestionById, qaUsers, addQAMessage, likeQuestion } = useApp();
  const questionId = currentScreen.params?.questionId;
  const [newMessage, setNewMessage] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const question = getQuestionById(questionId);
  
  if (!question) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <AlertCircle size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sual tapılmadı</p>
          <button
            onClick={goBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Geri qayıt
          </button>
        </div>
      </div>
    );
  }

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days} gün əvvəl`;
    if (hours > 0) return `${hours} saat əvvəl`;
    if (minutes > 0) return `${minutes} dəqiqə əvvəl`;
    return 'İndi';
  };

  const formatFullTime = (date: Date) => {
    return date.toLocaleDateString('az-AZ', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      addQAMessage(questionId, newMessage);
      setNewMessage('');
    }
  };

  const handleLike = () => {
    likeQuestion(questionId);
    setIsLiked(!isLiked);
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'answered':
        return 'Cavablandı';
      case 'open':
        return 'Açıq';
      case 'closed':
        return 'Bağlandı';
      default:
        return status;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 p-4 border-b ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center space-x-3">
          <button
            onClick={goBack}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <ArrowLeft size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
          </button>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(question.status)}`}>
                {getStatusText(question.status)}
              </span>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Yol qaydaları
              </span>
            </div>
            <h1 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Sual Detalları
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-20">
        {/* Question */}
        <div className={`p-4 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {/* Question Title */}
          <h2 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {question.title}
          </h2>

          {/* Question Content */}
          <p className={`text-base mb-4 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {question.content}
          </p>

          {/* Tags */}
          {question.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-300' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Tag size={12} className="mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Question Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{qaUsers[question.authorId]?.avatar}</span>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {qaUsers[question.authorId]?.name}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatFullTime(question.createdAt)}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Eye size={16} />
                <span className="text-sm">{question.viewCount}</span>
              </div>
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-colors ${
                  isLiked ? 'text-red-500' : isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                <span className="text-sm">{question.likeCount + (isLiked ? 1 : 0)}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <MessageCircle size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Cavablar və Müzakirələr
            </h3>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              ({question.messages.length - 1})
            </span>
          </div>

          {question.messages.slice(1).map((message) => {
            const user = qaUsers[message.userId];
            const isTeacher = user?.role === 'teacher';
            const isAnswer = message.isAnswer;

            return (
              <div key={message.id} className={`flex space-x-3 ${isAnswer ? 'bg-green-50 dark:bg-green-900/20 p-4 rounded-xl' : ''}`}>
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    isTeacher 
                      ? 'bg-blue-100 dark:bg-blue-900' 
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    {user?.avatar}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`font-medium text-sm ${
                      isTeacher 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {user?.name}
                    </span>
                    {isTeacher && (
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded-full text-xs font-medium">
                        Müəllim
                      </span>
                    )}
                    {isAnswer && (
                      <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                        <CheckCircle size={12} className="mr-1" />
                        Cavab
                      </span>
                    )}
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {message.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Message Input */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 border-t ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-md mx-auto">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleFileAttach}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <Paperclip size={20} />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Cavabınızı yazın..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className={`w-full px-4 py-2 pr-12 rounded-xl border-0 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white placeholder-gray-400' 
                    : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
                  newMessage.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : isDarkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-300 text-gray-500'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
          
          {/* Typing indicator (optional) */}
          <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Müəllim cavab yazmaqda...
          </p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        accept="image/*,application/pdf"
        onChange={(e) => {
          // Handle file upload
          console.log('Files selected:', e.target.files);
        }}
      />
    </div>
  );
}