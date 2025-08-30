import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { AppIcon } from '../ui/AppIcon';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  lastMessage: Date;
}

export function AIChatScreen() {
  const { goBack } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Salam! Mən DDA.az AI köməkçisiyəm. Sürücülük qaydaları və imtahan hazırlığı ilə bağlı suallarınızı verə bilərsiniz.',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState('current');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatHistory] = useState<ChatHistory[]>([
    {
      id: 'chat1',
      title: 'Yol nişanları haqqında',
      messages: [
        { id: '1', text: 'Yol nişanlarının növləri hansılardır?', isUser: true, timestamp: new Date(Date.now() - 86400000) },
        { id: '2', text: 'Yol nişanları 4 əsas qrupa bölünür: xəbərdarlıq, qadağan, məcburi və məlumat nişanları.', isUser: false, timestamp: new Date(Date.now() - 86400000) }
      ],
      lastMessage: new Date(Date.now() - 86400000)
    },
    {
      id: 'chat2', 
      title: 'Dairəvi hərəkət qaydaları',
      messages: [
        { id: '1', text: 'Dairəvi hərəkətdə kim üstünlük hüququna malikdir?', isUser: true, timestamp: new Date(Date.now() - 172800000) },
        { id: '2', text: 'Dairəvi hərəkətdə içəridə olan nəqliyyat vasitəsi üstünlük hüququna malikdir.', isUser: false, timestamp: new Date(Date.now() - 172800000) }
      ],
      lastMessage: new Date(Date.now() - 172800000)
    },
    {
      id: 'chat3',
      title: 'Sürət məhdudiyyətləri',
      messages: [
        { id: '1', text: 'Şəhər daxilində maksimum sürət nə qədərdir?', isUser: true, timestamp: new Date(Date.now() - 259200000) },
        { id: '2', text: 'Şəhər daxilində maksimum sürət 60 km/saat-dır.', isUser: false, timestamp: new Date(Date.now() - 259200000) }
      ],
      lastMessage: new Date(Date.now() - 259200000)
    }
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (question: string): string => {
    const responses = [
      'Bu sual çox maraqlıdır! Sürücülük qaydalarına görə...',
      'Yol hərəkəti qaydalarında bu məsələ belə izah olunur...',
      'İmtahan hazırlığı üçün bu mövzunu yaxşı öyrənmək vacibdir...',
      'DDA.az platformasında bu mövzu haqqında ətraflı video dərslər var...',
      'Bu sualın cavabı yol hərəkəti qaydalarının müvafiq bəndində verilmişdir...'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const loadChatHistory = (chatId: string) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
      setHistoryOpen(false);
    }
  };

  const startNewChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Salam! Mən DDA.az AI köməkçisiyəm. Sürücülük qaydaları və imtahan hazırlığı ilə bağlı suallarınızı verə bilərsiniz.',
        isUser: false,
        timestamp: new Date()
      }
    ]);
    setCurrentChatId('current');
    setHistoryOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative pt-11">
      {/* Backdrop */}
      {historyOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setHistoryOpen(false)}
        />
      )}
      
      {/* Chat History Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-transform duration-300 z-50 ${
        historyOpen ? 'translate-x-0' : '-translate-x-full'
      } w-80 shadow-xl`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900">Söhbət Tarixçəsi</h3>
            <button
              onClick={() => setHistoryOpen(false)}
              className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
            >
              ×
            </button>
          </div>
          <Button onClick={startNewChat} size="sm" className="w-full">
            + Yeni söhbət
          </Button>
        </div>
        
        <div className="p-2 space-y-2 overflow-y-auto" style={{ height: 'calc(100vh - 120px)' }}>
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => loadChatHistory(chat.id)}
              className={`w-full p-3 text-left rounded-lg hover:bg-gray-100 transition-colors ${
                currentChatId === chat.id ? 'bg-emerald-50 border border-emerald-200' : 'bg-white'
              }`}
            >
              <div className="font-medium text-sm text-gray-900 mb-1 truncate">
                {chat.title}
              </div>
              <div className="text-xs text-gray-500">
                {chat.lastMessage.toLocaleDateString('az-AZ')}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-white mt-11">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={goBack}
                className="w-9 h-9 rounded-lg border border-gray-300 bg-gray-50 flex items-center justify-center hover:bg-gray-100"
              >
                ←
              </button>
              <button
                onClick={() => setHistoryOpen(!historyOpen)}
                className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <AppIcon name="assistant" className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">DDA.az AI Köməkçi</div>
                  <div className="text-xs text-emerald-600">● Onlayn</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100vh - 184px)' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${message.isUser ? 'order-2' : 'order-1'}`}>
                <div
                  className={`p-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-emerald-600 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-900 rounded-bl-md'
                  }`}
                >
                  <div className="text-sm leading-relaxed">{message.text}</div>
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${
                  message.isUser ? 'text-right' : 'text-left'
                }`}>
                  {message.timestamp.toLocaleTimeString('az-AZ', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                message.isUser 
                  ? 'bg-emerald-600 text-white order-1 ml-2' 
                  : 'bg-gray-200 text-gray-600 order-2 mr-2'
              }`}>
                {message.isUser ? <AppIcon name="user" className="text-white" /> : <AppIcon name="assistant" />}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                  <AppIcon name="assistant" />
                </div>
                <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Sualınızı yazın..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              disabled={isTyping}
            />
            <Button
              onClick={sendMessage}
              disabled={!inputText.trim() || isTyping}
              className="px-6"
            >
              Göndər
            </Button>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            AI köməkçi sürücülük qaydaları və imtahan hazırlığı ilə bağlı suallarınıza cavab verir
          </div>
        </div>
      </div>
    </div>
  );
}