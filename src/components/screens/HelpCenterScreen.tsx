import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

export function HelpCenterScreen() {
  const { goBack, isDarkMode } = useApp();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqCategories = [
    {
      category: 'Ümumi suallar',
      icon: '❓',
      questions: [
        {
          q: 'Tətbiqdən necə istifadə edim?',
          a: 'Tətbiqimizdə qeydiyyatdan keçin, paket seçin və dərslərə başlayın. Hər dərs sonunda testlər mövcuddur.'
        },
        {
          q: 'Nə qədər sual var?',
          a: 'Tətbiqdə 1500+ sual və video dərs mövcuddur. Bütün suallar rəsmi imtahan proqramına uyğundur.'
        },
        {
          q: 'Offline istifadə mümkündürmü?',
          a: 'Bəli! Sualları və videolar yükləyərək internetə ehtiyac olmadan öyrənə bilərsiniz.'
        }
      ]
    },
    {
      category: 'Ödəniş və paketlər',
      icon: '💳',
      questions: [
        {
          q: 'Hansı ödəniş üsulları mövcuddur?',
          a: 'Bank kartları, e-manat, PayPal və digər ödəniş üsulları ilə ödəniş edə bilərsiniz.'
        },
        {
          q: 'Paket müddəti necə işləyir?',
          a: 'Aldığınız paket 30, 60 və ya 90 gün ərzində aktiv olur. Müddət bitdikdən sonra yeniləmək lazımdır.'
        },
        {
          q: 'Geri qaytarma mümkündürmü?',
          a: 'Alış tarixindən 7 gün ərzində istifadə etməsəniz, tam geri qaytarma mümkündür.'
        }
      ]
    },
    {
      category: 'Texniki problemlər',
      icon: '🔧',
      questions: [
        {
          q: 'Video yüklənmir, nə etməliyəm?',
          a: 'İnternet bağlantınızı yoxlayın və tətbiqi yenidən başladın. Problem davam edərsə, keşi təmizləyin.'
        },
        {
          q: 'Hesaba daxil ola bilmirəm',
          a: 'Şifrənizi unutmusunuzsa "Şifrəni unutdum" bölməsindən bərpa edə bilərsiniz.'
        },
        {
          q: 'Tətbiq yavaş işləyir',
          a: 'Keşi təmizləyin və tətbiqi yeniləyin. Cihazınızın yaddaşını yoxlayın.'
        }
      ]
    }
  ];

  const quickLinks = [
    { icon: '📚', title: 'İstifadə təlimatı', desc: 'Addım-addım bələdçi' },
    { icon: '🎥', title: 'Video dərs', desc: 'Necə istifadə etməli' },
    { icon: '💬', title: 'Canlı dəstək', desc: 'Operatorla əlaqə' },
    { icon: '📞', title: 'Əlaqə', desc: 'Bizimlə əlaqə saxlayın' }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
    } pt-11`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-400/10'
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
              isDarkMode ? 'from-blue-400 to-cyan-400' : 'from-blue-600 to-cyan-600'
            } bg-clip-text text-transparent`}>
              Kömək mərkəzi
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Suallarınıza cavab tapın
            </p>
          </div>
        </div>

        {/* Search */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp">
          <div className={`flex items-center gap-3 p-4 rounded-2xl border-2 ${
            isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="text-2xl">🔍</div>
            <input
              type="text"
              placeholder="Sualınızı yazın..."
              className={`flex-1 bg-transparent outline-none ${
                isDarkMode ? 'text-gray-200 placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickLinks.map((link, index) => (
            <Card
              key={index}
              variant="elevated"
              padding="md"
              className="animate-fadeInUp cursor-pointer hover-lift"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => alert(`${link.title} (demo)`)}
            >
              <div className="text-3xl mb-2 text-center">{link.icon}</div>
              <div className={`font-bold text-center mb-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {link.title}
              </div>
              <div className={`text-xs text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {link.desc}
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Categories */}
        {faqCategories.map((category, catIndex) => (
          <Card
            key={catIndex}
            variant="elevated"
            padding="lg"
            className="mb-6 animate-fadeInUp"
            style={{ animationDelay: `${(catIndex + 4) * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDarkMode ? 'bg-emerald-600/20' : 'bg-emerald-100'
              }`}>
                <span className="text-xl">{category.icon}</span>
              </div>
              <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {category.category}
              </h2>
            </div>

            <div className="space-y-3">
              {category.questions.map((faq, qIndex) => {
                const faqId = catIndex * 100 + qIndex;
                const isExpanded = expandedFAQ === faqId;

                return (
                  <div
                    key={qIndex}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      isExpanded
                        ? isDarkMode
                          ? 'border-emerald-500/50 bg-emerald-900/20'
                          : 'border-emerald-500/50 bg-emerald-50'
                        : isDarkMode
                          ? 'border-gray-700 bg-gray-800/50'
                          : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedFAQ(isExpanded ? null : faqId)}
                      className="w-full flex items-center justify-between gap-3 text-left"
                    >
                      <div className="flex-1">
                        <div className="font-bold">{faq.q}</div>
                      </div>
                      <div className={`text-xl transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : 'rotate-0'
                      }`}>
                        ↓
                      </div>
                    </button>

                    {isExpanded && (
                      <div className={`mt-3 pt-3 border-t-2 ${
                        isDarkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {faq.a}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        ))}

        {/* Still Need Help */}
        <Card variant="elevated" padding="lg" className="mb-6 animate-fadeInUp">
          <div className="text-center">
            <div className="text-4xl mb-4">🤔</div>
            <h3 className={`font-black text-xl mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Hələ də kömək lazımdır?
            </h3>
            <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Dəstək komandamız sizə kömək etməyə hazırdır
            </p>
            <button
              onClick={() => alert('Dəstək komandası ilə əlaqə (demo)')}
              className={`w-full p-4 rounded-2xl font-bold transition-all duration-300 hover:scale-[1.02] ${
                isDarkMode 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              💬 Bizimlə əlaqə saxlayın
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
