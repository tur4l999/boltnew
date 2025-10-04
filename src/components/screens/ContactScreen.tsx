import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

export function ContactScreen() {
  const { goBack, isDarkMode } = useApp();

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'support@dda.az',
      action: 'mailto:support@dda.az',
      color: 'blue'
    },
    {
      icon: '📱',
      title: 'Telefon',
      value: '+994 12 XXX XX XX',
      action: 'tel:+994XXXXXXXXX',
      color: 'emerald'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      value: '+994 XX XXX XX XX',
      action: 'https://wa.me/994XXXXXXXXX',
      color: 'green'
    },
    {
      icon: '📮',
      title: 'Telegram',
      value: '@dda_support',
      action: 'https://t.me/dda_support',
      color: 'cyan'
    }
  ];

  const socialMedia = [
    { icon: '📘', name: 'Facebook', handle: '@dda.az', color: 'blue' },
    { icon: '📷', name: 'Instagram', handle: '@dda.az', color: 'pink' },
    { icon: '🐦', name: 'Twitter', handle: '@dda_az', color: 'blue' },
    { icon: '▶️', name: 'YouTube', handle: 'DDA Azerbaijan', color: 'red' }
  ];

  const officeInfo = {
    address: 'Bakı şəhəri, Nəsimi rayonu, 28 May küçəsi 15',
    workHours: 'Bazar ertəsi - Cümə: 09:00 - 18:00',
    weekend: 'Şənbə - Bazar: İstirahət'
  };

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
    } pt-11`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-emerald-500/5' : 'bg-emerald-400/10'
        }`}></div>
      </div>

      <div className="relative z-10 p-4 pb-24">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={goBack}
            className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isDarkMode 
                ? 'border-gray-600/50 bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 backdrop-blur-sm' 
                : 'border-gray-300/50 bg-white/80 hover:bg-gray-50/80 text-gray-700 backdrop-blur-sm'
            }`}
          >
            <span className="text-lg">←</span>
          </button>
          <div>
            <h1 className={`text-2xl font-black transition-colors duration-200 bg-gradient-to-r ${
              isDarkMode ? 'from-emerald-400 to-green-400' : 'from-emerald-600 to-green-600'
            } bg-clip-text text-transparent`}>
              Bizimlə əlaqə
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              İstənilən vasitə ilə əlaqə saxlayın
            </p>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              variant="elevated"
              padding="lg"
              className="animate-fadeInUp hover-lift cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => window.location.href = method.action}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                  isDarkMode 
                    ? `bg-${method.color}-600/20` 
                    : `bg-${method.color}-100`
                }`}>
                  {method.icon}
                </div>
                <div className="flex-1">
                  <div className={`font-bold mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    {method.title}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {method.value}
                  </div>
                </div>
                <div className="text-2xl">→</div>
              </div>
            </Card>
          ))}
        </div>

        {/* Office Information */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
            }`}>
              <EmojiIcon emoji="🏢" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Ofis məlumatı
            </h2>
          </div>

          <div className="space-y-4">
            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl">📍</div>
                <div>
                  <div className={`font-bold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Ünvan
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {officeInfo.address}
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-start gap-3">
                <div className="text-2xl">⏰</div>
                <div>
                  <div className={`font-bold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    İş saatları
                  </div>
                  <div className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {officeInfo.workHours}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {officeInfo.weekend}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert('Xəritə açılır... (demo)')}
              className={`w-full p-4 rounded-2xl border-2 font-bold transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'border-purple-500/50 bg-purple-900/20 hover:bg-purple-900/30 text-purple-300' 
                  : 'border-purple-300 bg-purple-50 hover:bg-purple-100 text-purple-700'
              }`}
            >
              🗺️ Xəritədə göstər
            </button>
          </div>
        </Card>

        {/* Social Media */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <EmojiIcon emoji="🌐" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Sosial mediada izləyin
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {socialMedia.map((social, index) => (
              <button
                key={index}
                onClick={() => alert(`${social.name} səhifəsi açılır... (demo)`)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'border-gray-700 bg-gray-800/50 hover:bg-gray-700/50' 
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="text-3xl mb-2">{social.icon}</div>
                <div className={`font-bold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  {social.name}
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {social.handle}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Quick Contact Form */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
            }`}>
              <EmojiIcon emoji="✉️" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Sürətli mesaj
            </h2>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Adınız"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                isDarkMode
                  ? 'border-gray-700 bg-gray-800 text-gray-100 focus:border-emerald-500'
                  : 'border-gray-200 bg-white text-gray-900 focus:border-emerald-500'
              }`}
            />
            <input
              type="email"
              placeholder="Email ünvanınız"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                isDarkMode
                  ? 'border-gray-700 bg-gray-800 text-gray-100 focus:border-emerald-500'
                  : 'border-gray-200 bg-white text-gray-900 focus:border-emerald-500'
              }`}
            />
            <textarea
              placeholder="Mesajınız"
              rows={4}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-none ${
                isDarkMode
                  ? 'border-gray-700 bg-gray-800 text-gray-100 focus:border-emerald-500'
                  : 'border-gray-200 bg-white text-gray-900 focus:border-emerald-500'
              }`}
            />
            <button
              onClick={() => alert('Mesajınız göndərildi! (demo)')}
              className={`w-full p-4 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              📤 Göndər
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
