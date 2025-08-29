import React from 'react';
import { useApp } from '../../contexts/AppContext';

export function ActivationScheduledScreen() {
  const { currentScreen, goBack, isDarkMode } = useApp();
  const atIso: string | undefined = currentScreen.params?.at;
  const name: string | undefined = currentScreen.params?.name;
  const at = atIso ? new Date(atIso) : null;

  return (
    <div className={`p-6 min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`max-w-md mx-auto p-5 rounded-2xl border shadow ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="text-4xl mb-2">⏰</div>
        <div className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {name || 'Paket'} planlaşdırıldı
        </div>
        <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-4`}>
          Seçdiyiniz tarixdə paket aktivləşəcəkdir.
        </div>
        <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs`}>Aktivləşdirmə tarixi</div>
        <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-xl font-extrabold mb-5`}>
          {at ? at.toLocaleString('az-AZ') : '—'}
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

