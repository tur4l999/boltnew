import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { EmojiIcon } from '../ui/Icon';
import { Sparkles, Rocket } from 'lucide-react';

export function ExamConfigScreen() {
  const { t, navigate, isDarkMode, currentScreen } = useApp();
  const mode: 'simulator' | 'final' | undefined = currentScreen.params?.mode;

  const header = useMemo(() => {
    if (mode === 'final') return '📋 Yekun imtahan';
    return '🧪 İmtahan simulyatoru';
  }, [mode]);

  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState<'idle' | 'ok' | 'err'>('idle');

  const applyPromo = () => {
    if (promoCode.trim().length >= 4) {
      setPromoStatus('ok');
    } else {
      setPromoStatus('err');
    }
  };

  const start = () => {
    const config = mode === 'final'
      ? { mode: 'final', questionsCount: 20 }
      : { mode: 'simulator', questionsCount: 10 };
    navigate('ExamRun', { config });
  };

  return (
    <div className={`p-4 pb-24 min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-purple-50'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-purple-500/5' : 'bg-purple-400/10'
        }`}></div>
        <div className={`absolute bottom-20 left-10 w-32 h-32 rounded-full blur-2xl animate-pulse ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-400/10'
        }`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 space-y-6">
        {!mode && (
          <div>
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🧪</div>
              <h1 className="text-2xl font-black mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                İmtahan Mərkəzi
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                İmtahan növünü seçin və hazırlığınızı yoxlayın
              </p>
            </div>

            <Card variant="elevated" padding="lg">
              <div className="space-y-4">
                <Button 
                  onClick={() => navigate('ExamConfig', { mode: 'simulator' })} 
                  fullWidth
                  size="xl"
                  icon="🧪"
                  variant="primary"
                >
                  İmtahan simulyatoru
                </Button>
                <Button 
                  onClick={() => navigate('ExamConfig', { mode: 'final' })} 
                  fullWidth
                  size="xl"
                  icon="📋"
                  variant="secondary"
                >
                  Yekun imtahan
                </Button>
              </div>
            </Card>
          </div>
        )}

        {mode && (
          <div>
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">{mode === 'final' ? '📋' : '🧪'}</div>
              <h1 className="text-2xl font-black mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {header}
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Real imtahan şəraitində hazırlıq
              </p>
            </div>

            <Card variant="elevated" padding="lg">
              <div className="space-y-6">
                <div className={`p-4 rounded-2xl ${
                  isDarkMode ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50' : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📚</div>
                    <div>
                      <div className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-blue-200' : 'text-blue-900'}`}>
                        İmtahan haqqında
                      </div>
                      <div className={`text-xs leading-relaxed ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                        Əsl imtahan formatında hazırlanmış yeganə simulyator sistemidir. Real imtahan şəraiti, yüksək çətinlik dərəcəli testlər və tam rəqəmsal təcrübə.
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl ${
                  isDarkMode ? 'bg-gradient-to-r from-emerald-900/30 to-green-900/30 border border-emerald-700/50' : 'bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/50'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">⏱️</div>
                    <div>
                      <div className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-emerald-200' : 'text-emerald-900'}`}>
                        Vaxt və suallar
                      </div>
                      <div className={`text-xs leading-relaxed ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                        İmtahanda 15 dəqiqə vaxt və 10 sual təqdim olunur. İmtahanı bitirdikdən sonra nəticələrinizə və sualların izahlarına baxa bilərsiniz.
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl ${
                  isDarkMode ? 'bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-700/50' : 'bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/50'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💰</div>
                    <div>
                      <div className={`text-sm font-bold mb-2 ${isDarkMode ? 'text-orange-200' : 'text-orange-900'}`}>
                        Ödəniş məlumatı
                      </div>
                      <div className={`text-xs leading-relaxed ${isDarkMode ? 'text-orange-300' : 'text-orange-700'}`}>
                        "İMTAHAN BAŞLA" düyməsinə klik etdikdə "Simulyator bileti" hesabından 1 bilet, bu hesab boş olduqda isə "BALANSDAN" 2 azn silinəcəkdir.
                      </div>
                    </div>
                  </div>
                </div>

              {/* Enhanced Promo Section */}
              <div className={`p-4 rounded-2xl border-2 border-dashed transition-all duration-300 ${
                isDarkMode 
                  ? 'border-emerald-700/50 bg-emerald-900/10 hover:bg-emerald-900/20' 
                  : 'border-emerald-300/50 bg-emerald-50/50 hover:bg-emerald-50/80'
              }`}>
                <button
                  type="button"
                  onClick={() => setShowPromo(!showPromo)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🎟️</div>
                    <div className="text-left">
                      <div className={`text-sm font-bold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
                        Promokod var?
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                        Endirim kodu daxil edin
                      </div>
                    </div>
                  </div>
                  <div className={`text-lg transition-transform duration-200 ${showPromo ? 'rotate-180' : ''} ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    ▼
                  </div>
                </button>

                {/* Collapsible promo area */}
                <div className={`overflow-hidden transition-all duration-300 ${showPromo ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => { setPromoCode(e.target.value); setPromoStatus('idle'); }}
                      placeholder="Promokod daxil edin"
                      className={`flex-1 px-4 py-3 rounded-2xl border-2 outline-none transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-emerald-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-emerald-500'
                      }`}
                    />
                    <Button size="md" onClick={applyPromo} icon={<Sparkles size={16} strokeWidth={2} />}>
                      Tətbiq et
                    </Button>
                  </div>
                  {promoStatus !== 'idle' && (
                    <div className={`text-sm mt-3 p-2 rounded-xl ${
                      promoStatus === 'ok' 
                        ? isDarkMode ? 'bg-emerald-900/30 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                        : isDarkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
                    }`}>
                      {promoStatus === 'ok' ? '✅ Promokod tətbiq olundu!' : '❌ Promokod düzgün deyil.'}
                    </div>
                  )}
                </div>
              </div>

              <Button 
                onClick={() => navigate('ExamIntro')} 
                fullWidth 
                size="xl"
                icon={<Rocket size={20} strokeWidth={2} />}
                variant="primary"
              >
                İmtahana başla
              </Button>
            </div>
          </Card>
        </div>
        )}
      </div>
    </div>
  );
}