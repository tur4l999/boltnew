import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { 
  ArrowLeft, 
  Send, 
  Paperclip, 
  MoreVertical,
  AlertCircle,
  Clock,
  CheckCircle,
  UserCheck,
  Image,
  X,
  Camera
} from 'lucide-react';
import type { QAChat, QAMessage, QAUser } from '../../lib/types';

export function QADetailScreen() {
  const { t, isDarkMode, navigate, goBack, currentScreen, getChatById, qaUsers, sendMessage, markChatAsRead } = useApp();
  const chatId = currentScreen.params?.chatId;
  const [newMessage, setNewMessage] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [showImageUpload, setShowImageUpload] = useState(false);
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
    if (newMessage.trim() || selectedImages.length > 0) {
      if (selectedImages.length > 0) {
        // Send images
        const imageNames = selectedImages.map(img => img.name);
        sendMessage(chatId, newMessage.trim() || '📷 Şəkil göndərildi', imageNames, 'image');
        setSelectedImages([]);
      } else {
        // Send text only
        sendMessage(chatId, newMessage.trim());
      }
      setNewMessage('');
      setShowImageUpload(false);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validImages: File[] = [];
    const errors: string[] = [];

    files.forEach(file => {
      // Check if it's an image
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name}: Yalnız şəkil faylları göndərilə bilər`);
        return;
      }
      
      // Check size (2MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        errors.push(`${file.name}: Şəkil 2MB-dan böyük ola bilməz`);
        return;
      }

      // Check total count (max 3)
      if (selectedImages.length + validImages.length >= 3) {
        errors.push('Maksimum 3 şəkil göndərilə bilər');
        return;
      }

      validImages.push(file);
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    if (validImages.length > 0) {
      setSelectedImages([...selectedImages, ...validImages]);
      setShowImageUpload(true);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    if (selectedImages.length === 1) {
      setShowImageUpload(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
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

  const getChatStatus = () => {
    if (!chat.teacherAssigned) {
      return { status: 'waiting', text: 'Müəllim axtarılır', icon: Clock, color: 'text-orange-500' };
    }
    if (chat.messages.length === 0) {
      return { status: 'assigned', text: 'Müəllim təyin edildi', icon: UserCheck, color: 'text-blue-500' };
    }
    if (chat.messages.length > 0 && chat.messages[chat.messages.length - 1].senderId !== 'current') {
      return { status: 'responded', text: 'Cavab verildi', icon: CheckCircle, color: 'text-green-500' };
    }
    return { status: 'active', text: 'Aktiv yazışma', icon: CheckCircle, color: 'text-green-500' };
  };

  const chatStatus = getChatStatus();

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

          {/* Chat Status */}
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <chatStatus.icon size={14} className={chatStatus.color} />
              <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {chatStatus.text}
              </span>
            </div>
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
                    className={`max-w-xs lg:max-w-md ${
                      message.messageType === 'image' ? 'p-1' : 'px-4 py-2'
                    } rounded-2xl ${
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
                    {/* Image Messages */}
                    {message.messageType === 'image' && message.attachments && (
                      <div className="space-y-1">
                        {message.attachments.map((attachment, imgIndex) => (
                          <div key={imgIndex} className="relative">
                            <div className="rounded-xl overflow-hidden">
                              <img
                                src={`/public/${attachment}`} // Demo path
                                alt="Shared image"
                                className="w-full max-w-48 h-auto"
                                onError={(e) => {
                                  // Fallback for demo
                                  e.currentTarget.src = '/public/image.png';
                                }}
                              />
                            </div>
                          </div>
                        ))}
                        {message.content && message.content !== '📷 Şəkil göndərildi' && (
                          <p className={`text-sm px-3 py-1 ${
                            isCurrentUser ? 'text-white' : isDarkMode ? 'text-gray-100' : 'text-gray-900'
                          }`}>
                            {message.content}
                          </p>
                        )}
                        
                        {/* Time for image messages */}
                        <div className={`flex items-center justify-end space-x-1 px-3 py-1 ${
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
                    )}

                    {/* Text Messages */}
                    {message.messageType === 'text' && (
                      <>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        
                        {/* Time for text messages */}
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
                      </>
                    )}
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
      <div className={`border-t ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        {/* Image Preview Area */}
        {showImageUpload && selectedImages.length > 0 && (
          <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-3">
                <h4 className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Seçilən şəkillər ({selectedImages.length}/3)
                </h4>
                <button
                  onClick={() => {
                    setSelectedImages([]);
                    setShowImageUpload(false);
                  }}
                  className={`text-xs ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Hamısını sil
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <div className={`aspect-square rounded-lg overflow-hidden ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    >
                      <X size={12} />
                    </button>
                    <div className={`absolute bottom-1 left-1 right-1 text-xs text-center text-white bg-black bg-opacity-50 rounded px-1`}>
                      {formatFileSize(image.size)}
                    </div>
                  </div>
                ))}
                
                {/* Add more images button */}
                {selectedImages.length < 3 && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className={`aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-colors ${
                      isDarkMode 
                        ? 'border-gray-600 hover:border-gray-500 bg-gray-700 hover:bg-gray-600' 
                        : 'border-gray-300 hover:border-gray-400 bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <Camera size={20} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
                    <span className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      +
                    </span>
                  </button>
                )}
              </div>
              
              {/* Image upload info */}
              <div className={`mt-3 p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                <div className="flex items-center space-x-2">
                  <Image size={16} className="text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className={`text-xs font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                      Şəkil göndərmə qaydaları:
                    </p>
                    <ul className={`text-xs mt-1 space-y-0.5 ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`}>
                      <li>• Maksimum 3 şəkil göndərilə bilər</li>
                      <li>• Hər şəkil 2MB-dan kiçik olmalıdır</li>
                      <li>• PNG, JPG, JPEG formatları dəstəklənir</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-end space-x-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`p-2 rounded-full transition-colors ${
                  isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <Camera size={22} />
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
                disabled={!newMessage.trim() && selectedImages.length === 0}
                className={`p-3 rounded-full transition-all ${
                  (newMessage.trim() || selectedImages.length > 0)
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
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        accept="image/*"
        onChange={handleImageSelect}
      />
    </div>
  );
}