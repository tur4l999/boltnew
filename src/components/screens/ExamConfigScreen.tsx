import React, { useMemo, useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

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
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="space-y-3">
        {!mode && (
          <Card>
            <div className="space-y-3">
              <Button onClick={() => navigate('ExamConfig', { mode: 'simulator' })} className="w-full">
                🧪 İmtahan simulyatoru
              </Button>
              <Button onClick={() => navigate('ExamConfig', { mode: 'final' })} className="w-full" variant="secondary">
                📋 Yekun imtahan
              </Button>
            </div>
          </Card>
        )}

        {mode && (
          <Card>
            <div className="space-y-3">
              <div className={`text-sm font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{header}</div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Əsl imtahan formatında hazırlanmış yeganə simulyator sistemidir. Real imtahan şəraiti, yüksək çətinlik dərəcəli testlər və tam rəqəmsal təcrübə – hamısı burada.
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                İmtahanda 15 dəqiqə vaxt və 10 sual təqdim olunur. İmtahanı bitirdikdən sonra nəticələrinizə və sualların izahlarına baxa bilərsiniz. İmtahana getməzdən əvvəl mütləq bu sınaqdan keçin.
              </div>
              <div className={`rounded-lg p-3 ${isDarkMode ? 'bg-blue-900/20 border border-blue-700 text-blue-200' : 'bg-blue-50 border border-blue-200 text-blue-900'}`}>
                <div className="text-center text-sm font-semibold mb-1">Hörmətli istifadəçi,</div>
                <div className="text-xs leading-relaxed text-center">
                  "İMTAHAN BAŞLA" düyməsinə klik etdikdə “Simulyator bileti” hesabından 1 bilet, bu hesab boş olduqda isə “BALANSDAN” 2 azn silinəcəkdir.
                </div>
              </div>

              {/* Promo link */}
              <button
                type="button"
                onClick={() => setShowPromo(!showPromo)}
                className={`text-sm underline self-start ${isDarkMode ? 'text-emerald-300 hover:text-emerald-200' : 'text-emerald-700 hover:text-emerald-800'}`}
              >
                Promokodu əlavə edin
              </button>

              {/* Collapsible promo area */}
              <div className={`overflow-hidden transition-all duration-300 ${showPromo ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className={`mt-1 p-2 rounded-lg border flex items-center gap-2 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => { setPromoCode(e.target.value); setPromoStatus('idle'); }}
                    placeholder="Promokod"
                    className={`flex-1 px-3 py-2 rounded-md border outline-none ${isDarkMode ? 'bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'}`}
                  />
                  <Button size="sm" onClick={applyPromo}>Tətbiq et</Button>
                </div>
                {promoStatus !== 'idle' && (
                  <div className={`text-xs mt-1 ${promoStatus === 'ok' ? 'text-emerald-600' : 'text-red-600'}`}>
                    {promoStatus === 'ok' ? 'Promokod tətbiq olundu.' : 'Promokod düzgün deyil.'}
                  </div>
                )}
              </div>

              <Button onClick={() => navigate('ExamIntro')} className="w-full">
                Davam et
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}