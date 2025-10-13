import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  MoreVertical,
  Phone,
  Video,
  AlertCircle
} from 'lucide-react';
import type { QAChat, QAMessage, QAUser } from '../../lib/types';

export function QADetailScreen() {
  const { t, isDarkMode, navigate, goBack, currentScreen, getChatById, qaUsers, sendMessage, markChatAsRead } = useApp();
  const chatId = currentScreen.params?.chatId;
  const [newMessage, setNewMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chat = getChatById(chatId);
  
  useEffect(() => {
    if (chat) {
      markChatAsRead(chatId);
    }
  }, [chatId, chat, markChatAsRead]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);
  
  if (!chat) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <AlertCircle size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Yazışma tapılmadı</p>
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

  const partner = chat.teacherAssigned && chat.teacherId ? qaUsers[chat.teacherId] : { name: 'Müəllim axtarılır...', avatar: '🔍', isOnline: false };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('az-AZ', { 
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateHeader = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Bu gün';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Dünən';
    } else {
      return date.toLocaleDateString('az-AZ', { 
        day: 'numeric', 
        month: 'long'
      });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(chatId, newMessage.trim());
      setNewMessage('');
    }
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const groupMessagesByDate = (messages: QAMessage[]) => {
    const groups: { [key: string]: QAMessage[] } = {};
    messages.forEach(message => {
      const dateKey = message.timestamp.toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(chat.messages);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* WhatsApp-style Header */}
      <div className={`p-4 border-b ${
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
          
          {/* Partner Info */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                partner.isOnline 
                  ? 'bg-green-100 dark:bg-green-900' 
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}>
                {partner.avatar}
              </div>
              {partner.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h1 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {partner.name}
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {partner.isOnline ? 'Onlayn' : 'Son görünmə: ' + ('lastSeen' in partner && partner.lastSeen ? formatTime(partner.lastSeen) : 'naməlum')}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <Phone size={20} />
            </button>
            <button
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <Video size={20} />
            </button>
            <button
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Subject Badge */}
        <div className="mt-3">
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${
            isDarkMode 
              ? 'bg-blue-900 text-blue-200' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            📚 {chat.subject}
          </span>
        </div>
      </div>

      {/* Messages Area - WhatsApp Style */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(messageGroups).map(([dateKey, messages]) => (
          <div key={dateKey}>
            {/* Date Header */}
            <div className="flex justify-center mb-4">
              <span className={`px-3 py-1 rounded-full text-xs ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {formatDateHeader(new Date(dateKey))}
              </span>
            </div>

            {/* Messages for this date */}
            {messages.map((message, index) => {
              const isCurrentUser = message.senderId === 'current';
              const nextMessage = messages[index + 1];
              const isLastInGroup = !nextMessage || nextMessage.senderId !== message.senderId;
              
              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-1`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      isCurrentUser
                        ? 'bg-blue-600 text-white'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-100'
                        : 'bg-white text-gray-900 border border-gray-200'
                    } ${
                      isCurrentUser
                        ? isLastInGroup ? 'rounded-br-md' : ''
                        : isLastInGroup ? 'rounded-bl-md' : ''
                    }`}
                  >
                    {/* Message content */}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {/* Time */}
                    <div className={`flex items-center justify-end space-x-1 mt-1 ${
                      isCurrentUser ? 'text-blue-100' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">{formatTime(message.timestamp)}</span>
                      {isCurrentUser && (
                        <div className="text-xs">
                          {message.isRead ? '✓✓' : '✓'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* WhatsApp-style Message Input */}
      <div className={`p-4 border-t ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-md mx-auto">
          <div className="flex items-end space-x-2">
            <button
              onClick={handleFileAttach}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <Paperclip size={22} />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Mesaj yazın..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className={`w-full px-4 py-3 pr-12 rounded-full border-0 text-sm ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white placeholder-gray-400' 
                    : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`p-3 rounded-full transition-all ${
                newMessage.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700 scale-100'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 scale-95 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
          
          {/* Typing indicator (when teacher is typing) */}
          {partner.isOnline && (
            <div className={`text-xs mt-2 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {partner.name} yazır...
            </div>
          )}
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
