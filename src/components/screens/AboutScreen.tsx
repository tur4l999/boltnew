import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

export function AboutScreen() {
  const { goBack, isDarkMode } = useApp();

  const appInfo = {
    version: 'v1.0.0',
    buildNumber: '2025.10.001',
    releaseDate: '04 Oktyabr 2025',
    platform: 'Web, iOS, Android'
  };

  const features = [
    { icon: '📚', title: '1500+ Sual', desc: 'Rəsmi imtahan sualları' },
    { icon: '🎥', title: 'Video dərslər', desc: 'HD keyfiyyətdə dərslər' },
    { icon: '🚗', title: 'Simulyator', desc: 'Virtual sürücülük təcrübəsi' },
    { icon: '🤖', title: 'AI Köməkçi', desc: 'Süni intellekt dəstəyi' },
    { icon: '📱', title: 'Offline dəstək', desc: 'İnternetsiz istifadə' },
    { icon: '🎯', title: 'Fərdi təlim', desc: 'Sizə uyğun proqram' }
  ];

  const team = [
    { role: 'CEO & Founder', name: 'Tural Qarayev', icon: '👨‍💼' },
    { role: 'Lead Developer', name: 'Development Team', icon: '👨‍💻' },
    { role: 'UI/UX Designer', name: 'Design Team', icon: '🎨' },
    { role: 'Content Creator', name: 'Content Team', icon: '📝' }
  ];

  const stats = [
    { value: '50K+', label: 'Aktiv istifadəçi', icon: '👥' },
    { value: '1500+', label: 'Sual bazası', icon: '📚' },
    { value: '95%', label: 'Uğur nisbəti', icon: '🎯' },
    { value: '4.8', label: 'Orta reytinq', icon: '⭐' }
  ];

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
              Haqqında
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              DDA.az - Sürücülük təhsil platforması
            </p>
          </div>
        </div>

        {/* App Logo & Info */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp">
          <div className="text-center">
            <div className={`w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center text-5xl shadow-xl`}>
              🚗
            </div>
            <h2 className={`text-3xl font-black mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              DDA.az
            </h2>
            <p className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Sürücülük Kursları
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                <div className={`text-sm font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Versiya
                </div>
                <div className={`font-black ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                  {appInfo.version}
                </div>
              </div>
              <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                <div className={`text-sm font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Build
                </div>
                <div className={`font-black ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                  {appInfo.buildNumber}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Mission */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
            }`}>
              <EmojiIcon emoji="🎯" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Missiyamız
            </h2>
          </div>
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Sürücülük təhsilini hər kəs üçün əlçatan, keyfiyyətli və effektiv etmək. Müasir texnologiyalar və 
            innovativ metodlarla gələcəyin sürücülərini hazırlamaq.
          </p>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              variant="elevated"
              padding="lg"
              className="animate-fadeInUp text-center"
              style={{ animationDelay: `${(index + 2) * 50}ms` }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-black mb-1 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                {stat.value}
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Features */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <EmojiIcon emoji="✨" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Xüsusiyyətlər
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <div className={`font-bold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                  {feature.title}
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.desc}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Team */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-purple-600/20' : 'bg-purple-100'
            }`}>
              <EmojiIcon emoji="👥" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Komandamız
            </h2>
          </div>

          <div className="space-y-3">
            {team.map((member, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl flex items-center gap-4 ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center text-2xl`}>
                  {member.icon}
                </div>
                <div>
                  <div className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    {member.name}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Legal Links */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
          <div className="space-y-3">
            <button
              onClick={() => alert('İstifadə şərtləri (demo)')}
              className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-200' 
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">📜</div>
                <span className="font-bold">İstifadə şərtləri</span>
              </div>
              <div className="text-2xl">→</div>
            </button>

            <button
              onClick={() => alert('Məxfilik siyasəti (demo)')}
              className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-200' 
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">🔒</div>
                <span className="font-bold">Məxfilik siyasəti</span>
              </div>
              <div className="text-2xl">→</div>
            </button>

            <button
              onClick={() => alert('Lisenziya (demo)')}
              className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-200' 
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">©</div>
                <span className="font-bold">Lisenziya</span>
              </div>
              <div className="text-2xl">→</div>
            </button>
          </div>
        </Card>

        {/* Copyright */}
        <div className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <p className="mb-2">© 2025 DDA.az - Bütün hüquqlar qorunur</p>
          <p>Made with ❤️ in Azerbaijan</p>
        </div>
      </div>
    </div>
  );
}
