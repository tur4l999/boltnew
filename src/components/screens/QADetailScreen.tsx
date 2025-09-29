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
      // Sanitize text message
      const sanitizedMessage = newMessage.trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '[SCRIPT REMOVED]')
        .replace(/javascript:/gi, '[JS REMOVED]')
        .replace(/vbscript:/gi, '[VBS REMOVED]')
        .replace(/data:text\/html/gi, '[HTML REMOVED]')
        .substring(0, 1000); // Limit message length

      if (selectedImages.length > 0) {
        // Send images with sanitized names
        const sanitizedImageNames = selectedImages.map(img => sanitizeFilename(img.name));
        sendMessage(chatId, sanitizedMessage || '📷 Şəkil göndərildi', sanitizedImageNames, 'image');
        setSelectedImages([]);
      } else {
        // Send text only
        if (sanitizedMessage !== newMessage.trim()) {
          alert('⚠️ Mesajda təhlükəli məzmun aşkar edildi və təmizləndi');
        }
        sendMessage(chatId, sanitizedMessage);
      }
      setNewMessage('');
      setShowImageUpload(false);
    }
  };

  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const validImages: File[] = [];
    const errors: string[] = [];

    // Allowed image types with strict checking
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ];

    // Comprehensive list of dangerous extensions
    const dangerousExtensions = [
      '.exe', '.bat', '.cmd', '.scr', '.pif', '.com', '.vbs', '.js', '.jar',
      '.app', '.deb', '.dmg', '.pkg', '.rpm', '.msi', '.apk', '.ipa',
      '.php', '.asp', '.jsp', '.cgi', '.py', '.rb', '.pl', '.sh', '.ps1',
      '.html', '.htm', '.svg', '.xml', '.swf', '.dll', '.sys', '.bin'
    ];

    // Process each file with comprehensive security checks
    for (const file of files) {
      try {
        // 1. Basic validations
        const originalName = file.name.toLowerCase();
        const fileExtension = originalName.substring(originalName.lastIndexOf('.'));
        
        // Check for dangerous extensions
        const isDangerous = dangerousExtensions.some(ext => originalName.endsWith(ext));
        if (isDangerous) {
          errors.push(`${file.name}: Təhlükəli fayl növü bloklandı`);
          continue;
        }

        // Check for double extensions (e.g., image.jpg.exe)
        const extensionCount = (file.name.match(/\./g) || []).length;
        if (extensionCount > 1) {
          errors.push(`${file.name}: Çoxlu uzantılı fayl qəbul edilmir`);
          continue;
        }

        // 2. MIME type validation
        if (!allowedTypes.includes(file.type)) {
          errors.push(`${file.name}: Yalnız PNG, JPG, GIF, WebP formatları qəbul edilir`);
          continue;
        }

        // 3. File extension and MIME type consistency
        const expectedExtensions = {
          'image/jpeg': ['.jpg', '.jpeg'],
          'image/png': ['.png'],
          'image/gif': ['.gif'],
          'image/webp': ['.webp']
        };
        
        const expectedExts = expectedExtensions[file.type as keyof typeof expectedExtensions];
        if (expectedExts && !expectedExts.includes(fileExtension)) {
          errors.push(`${file.name}: Format və uzantı uyğunsuzluğu`);
          continue;
        }
        
        // 4. Size validations
        if (file.size > 2 * 1024 * 1024) {
          errors.push(`${file.name}: 2MB limitini aşır (${formatFileSize(file.size)})`);
          continue;
        }

        if (file.size < 100) {
          errors.push(`${file.name}: Çox kiçik fayl (minimum 100 bayt)`);
          continue;
        }

        // 5. Count limit
        if (selectedImages.length + validImages.length >= 3) {
          errors.push('Maksimum 3 şəkil seçilə bilər');
          break;
        }

        // 6. Filename security checks
        if (file.name.length > 100) {
          errors.push(`${file.name}: Fayl adı çox uzun (maksimum 100 simvol)`);
          continue;
        }

        // Check for suspicious patterns in filename
        const suspiciousPatterns = [
          /\.exe\./i, /\.bat\./i, /\.cmd\./i, /\.scr\./i,
          /script/i, /javascript/i, /vbscript/i, /onload/i, /onclick/i,
          /<script/i, /<?php/i, /<%/i, /\$\{/i, /#{/i
        ];
        
        if (suspiciousPatterns.some(pattern => pattern.test(file.name))) {
          errors.push(`${file.name}: Şübhəli fayl adı bloklandı`);
          continue;
        }

        // 7. Advanced security validation
        const securityCheck = await validateImageSecurity(file);
        if (!securityCheck.isValid) {
          errors.push(`${file.name}: ${securityCheck.error}`);
          continue;
        }

        // If all checks pass, add to valid images
        validImages.push(file);
        
      } catch (error) {
        errors.push(`${file.name}: Yoxlanarkən xəta baş verdi`);
      }
    }

    // Display errors with security warning
    if (errors.length > 0) {
      const errorMessage = `🛡️ TƏHLÜKƏSIZLIK XƏBƏRDARLIGI\n\nAşağıdakı fayllar bloklandı:\n\n${errors.join('\n')}\n\n⚠️ Təhlükəsizlik üçün yalnız yoxlanılmış şəkil faylları qəbul edilir.`;
      alert(errorMessage);
    }

    // Add valid images
    if (validImages.length > 0) {
      // Additional check: Ensure no duplicate files
      const newImages = validImages.filter(newImg => 
        !selectedImages.some(existingImg => 
          existingImg.name === newImg.name && existingImg.size === newImg.size
        )
      );
      
      if (newImages.length > 0) {
        setSelectedImages(prev => [...prev, ...newImages]);
        setShowImageUpload(true);
      } else if (validImages.length > 0) {
        alert('⚠️ Seçdiyiniz şəkillər artıq əlavə edilib');
      }
    }

    // Always clear the file input for security
    if (event.target) {
      event.target.value = '';
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

  // Advanced security validation
  const validateImageSecurity = async (file: File): Promise<{ isValid: boolean; error?: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const bytes = new Uint8Array(arrayBuffer);
          
          // Check file headers (magic numbers) for actual image files
          const jpegHeader = [0xFF, 0xD8, 0xFF];
          const pngHeader = [0x89, 0x50, 0x4E, 0x47];
          const gifHeader = [0x47, 0x49, 0x46];
          const webpHeader = [0x52, 0x49, 0x46, 0x46];
          
          const isJPEG = jpegHeader.every((byte, i) => bytes[i] === byte);
          const isPNG = pngHeader.every((byte, i) => bytes[i] === byte);
          const isGIF = gifHeader.every((byte, i) => bytes[i] === byte);
          const isWebP = webpHeader.every((byte, i) => bytes[i] === byte);
          
          if (!isJPEG && !isPNG && !isGIF && !isWebP) {
            resolve({ isValid: false, error: 'Fayl həqiqi şəkil deyil (file header yoxlanışı uğursuz)' });
            return;
          }

          // Check for embedded scripts or suspicious content
          const fileContent = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
          const suspiciousContent = [
            '<script', '<?php', '<%', 'javascript:', 'vbscript:',
            'data:text/html', 'data:application', 'eval(', 'document.write'
          ];
          
          if (suspiciousContent.some(pattern => fileContent.toLowerCase().includes(pattern))) {
            resolve({ isValid: false, error: 'Şəkildə zərərli kod aşkar edildi' });
            return;
          }

          // Check file size again from actual content
          if (bytes.length !== file.size) {
            resolve({ isValid: false, error: 'Fayl ölçüsü uyğunsuzluğu aşkar edildi' });
            return;
          }

          resolve({ isValid: true });
        } catch (error) {
          resolve({ isValid: false, error: 'Fayl oxunarkən xəta baş verdi' });
        }
      };

      reader.onerror = () => {
        resolve({ isValid: false, error: 'Fayl oxuna bilmədi' });
      };

      // Read only first 1KB for header check and security scan
      const chunk = file.slice(0, Math.min(file.size, 1024));
      reader.readAsArrayBuffer(chunk);
    });
  };

  // Enhanced filename sanitization
  const sanitizeFilename = (filename: string): string => {
    return filename
      .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace special chars
      .replace(/_{2,}/g, '_') // Remove multiple underscores
      .substring(0, 50) // Limit length
      .toLowerCase();
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
                        onLoad={(e) => {
                          // Clean up object URL after loading for memory management
                          setTimeout(() => URL.revokeObjectURL(e.currentTarget.src), 1000);
                        }}
                        onError={(e) => {
                          URL.revokeObjectURL(e.currentTarget.src);
                          console.error('Image preview failed for:', image.name);
                        }}
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
              
              {/* Security and upload info */}
              <div className={`mt-3 p-3 rounded-lg ${isDarkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Image size={16} className="text-blue-600 dark:text-blue-400" />
                    <p className={`text-xs font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                      Şəkil göndərmə qaydaları:
                    </p>
                  </div>
                  <ul className={`text-xs space-y-0.5 ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`}>
                    <li>• Maksimum 3 şəkil göndərilə bilər</li>
                    <li>• Hər şəkil 2MB-dan kiçik olmalıdır</li>
                    <li>• Yalnız PNG, JPG, GIF, WebP formatları</li>
                  </ul>
                  
                  <div className={`pt-2 border-t ${isDarkMode ? 'border-blue-800' : 'border-blue-200'}`}>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">🛡️</span>
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                        Təhlükəsizlik:
                      </p>
                    </div>
                    <ul className={`text-xs mt-1 space-y-0.5 ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`}>
                      <li>• Bütün fayllar avtomatik yoxlanılır</li>
                      <li>• Zərərli məzmun bloklanır</li>
                      <li>• Yalnız təsdiqlənmiş şəkillər qəbul edilir</li>
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

      {/* Hidden file input with security restrictions */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleImageSelect}
        onClick={(e) => {
          // Clear any previous selections for security
          e.currentTarget.value = '';
        }}
      />
    </div>
  );
}