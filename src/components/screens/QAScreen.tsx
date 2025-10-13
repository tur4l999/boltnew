import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Search, Plus, MessageCircle, Clock, CheckCircle2, Circle } from 'lucide-react';
import type { QAChat } from '../../lib/types';

export function QAScreen() {
  const { t, isDarkMode, navigate, qaChats, qaUsers, getActiveChatsList } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const chats = getActiveChatsList();
  
  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          chat.messages.some(msg => msg.content.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} gün əvvəl`;
    }
    if (hours > 0) return `${hours} saat əvvəl`;
    if (minutes > 0) return `${minutes} dəqiqə əvvəl`;
    return 'İndi';
  };

  const getLastMessagePreview = (chat: QAChat) => {
    if (chat.messages.length === 0) return 'Hələ mesaj yoxdur';
    const lastMessage = chat.messages[chat.messages.length - 1];
    if (lastMessage.messageType === 'image') return '📷 Şəkil';
    if (lastMessage.messageType === 'file') return '📎 Fayl';
    return lastMessage.content.length > 50 
      ? lastMessage.content.substring(0, 50) + '...'
      : lastMessage.content;
  };

  const getChatPartner = (chat: QAChat) => {
    if (chat.teacherAssigned && chat.teacherId) {
      return qaUsers[chat.teacherId];
    }
    return { name: 'Müəllim axtarılır...', avatar: '🔍', isOnline: false };
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 p-4 border-b ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Sual-Cavab
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Müəllimlə birbaşa yazışma
            </p>
          </div>
          <button
            onClick={() => navigate('QAForm')}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors shadow-lg"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mt-4">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
          <input
            type="text"
            placeholder="Yazışmalarda axtarış..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 rounded-xl border-0 ${
              isDarkMode 
                ? 'bg-gray-700 text-white placeholder-gray-400' 
                : 'bg-gray-100 text-gray-900 placeholder-gray-500'
            } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="pb-4">
        {filteredChats.length === 0 ? (
          <div className={`text-center py-16 px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <MessageCircle size={64} className="mx-auto mb-6 opacity-30" />
            <h3 className="text-xl font-semibold mb-2">Hələ yazışma yoxdur</h3>
            <p className="mb-6">İlk sualınızı verin və müəllimlə yazışın!</p>
            <button
              onClick={() => navigate('QAForm')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors"
            >
              Yeni yazışma başlat
            </button>
          </div>
        ) : (
          filteredChats.map((chat) => {
            const partner = getChatPartner(chat);
            const lastMessage = chat.messages[chat.messages.length - 1];
            
            return (
              <div
                key={chat.id}
                onClick={() => navigate('QADetail', { chatId: chat.id })}
                className={`p-4 border-b cursor-pointer transition-colors hover:bg-opacity-70 ${
                  isDarkMode 
                    ? 'border-gray-700 hover:bg-gray-800' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                      partner.isOnline 
                        ? 'bg-green-100 dark:bg-green-900' 
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      {partner.avatar}
                    </div>
                    {/* Online indicator */}
                    {partner.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-medium truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {partner.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {lastMessage && (
                          <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {formatTimeAgo(lastMessage.timestamp)}
                          </span>
                        )}
                        {/* Unread indicator */}
                        {chat.unreadCount > 0 && (
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">
                              {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {chat.subject}
                        </p>
                        <p className={`text-xs truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {lastMessage?.senderId === 'current' && (
                            <span className="mr-1">Siz: </span>
                          )}
                          {getLastMessagePreview(chat)}
                        </p>
                      </div>
                      
                      {/* Status indicators */}
                      <div className="flex items-center space-x-1 ml-2">
                        {chat.teacherAssigned ? (
                          <CheckCircle2 size={16} className="text-green-500" />
                        ) : (
                          <Circle size={16} className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
