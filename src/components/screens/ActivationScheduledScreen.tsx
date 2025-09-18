import React from 'react';
import { useApp } from '../../contexts/AppContext';

export function ActivationScheduledScreen() {
  const { currentScreen, goBack, isDarkMode } = useApp();
  const atIso: string | undefined = currentScreen.params?.at;
  const name: string | undefined = currentScreen.params?.name;
  const at = atIso ? new Date(atIso) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={goBack} />
      <div className={`relative z-10 w-[92%] max-w-md rounded-2xl p-5 shadow-xl border ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <button
          onClick={goBack}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm border ${
            isDarkMode ? 'border-gray-600 hover:bg-gray-700 text-gray-300' : 'border-gray-300 hover:bg-gray-100 text-gray-600'
          }`}
          aria-label="Bağla"
        >
          ✖
        </button>
        <div className="text-4xl mb-2">⏰</div>
        <div className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {name || 'Paket'} planlaşdırıldı
        </div>
        <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-4`}>
          Seçdiyiniz tarixdə paket aktivləşəcəkdir.
        </div>
        <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs`}>Aktivləşdirmə tarixi</div>
        <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-xl font-extrabold mb-2`}>
          {at ? at.toLocaleString('az-AZ') : '—'}
        </div>
        <div className={`${isDarkMode ? 'text-gray-500' : 'text-gray-500'} text-xs mb-4`}>
          Bu pəncərəni bağlaya bilərsiniz.
        </div>
        <button
          onClick={goBack}
          className={`w-full px-4 py-2 rounded-xl font-bold min-h-[44px] ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
        >
          Bağla
        </button>
      </div>
    </div>
  );
}

