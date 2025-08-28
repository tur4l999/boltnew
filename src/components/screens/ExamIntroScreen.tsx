import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export function ExamIntroScreen() {
  const { isDarkMode, navigate } = useApp();

  const startExam = () => {
    const config = { mode: 'simulator', questionsCount: 10 };
    navigate('ExamRun', { config });
  };

  return (
    <div className={`relative p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-emerald-50'
    }`}>
      {/* Soft background illustration */}
      <div className="pointer-events-none select-none absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] bg-emerald-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        <Card className={`${isDarkMode ? 'bg-gray-800/80' : 'bg-white/90'} backdrop-blur-sm`}> 
          <div className="text-center space-y-4">
            <div className={`text-lg font-black ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Hörmətli istifadəçi!
            </div>
            <div className={`leading-relaxed text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Siz <span className="font-bold">İMTAHAN SİMULYATORU</span> vasitəsilə Yol Hərəkəti Qaydaları üzrə
              nəzəri imtahan verəcəksiniz. Diqqətinizə 10 sualdan ibarət bilet təqdim
              olunacaqdır. Cavablandırmaq istədiyiniz suala toxunduqdan sonra həmin sual
              daha iri ölçüdə təsvir olunacaq. Göstərilən cavablardan düzgün hesab etdiyinizi
              seçib sonra <span className="font-bold">“TƏSDİQ”</span> düyməsini sıxın. Digər sualı seçmək üçün
              <span className="font-bold"> “GERİYƏ”</span> düyməsini istifadə edin.
            </div>
            <div className={`leading-relaxed text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Əgər 15 dəqiqə ərzində 10 sualdan 9 sualı düzgün cavablandırsanız, imtahanı uğurla
              vermiş sayılacaqsınız. Yalnız bir səhv etmək şansınız var. Monitorun aşağı hissəsində
              imtahanın gedişini bildirən vaxt və sualların nömrələri əks olunur.
            </div>
            <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              Sizə uğurlar arzulayırıq!
            </div>

            {/* Removed placeholder above start button */}

            <div className="pt-2">
              <Button onClick={startExam} className="w-full">
                İMTAHANA BAŞLA
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}