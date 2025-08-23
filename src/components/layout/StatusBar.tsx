import React from 'react';
import { useApp } from '../../contexts/AppContext';

export function StatusBar() {
  const { isDarkMode } = useApp();
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
      isDarkMode ? 'bg-black' : 'bg-black'
    }`}>
      <div className="max-w-md mx-auto">
        {/* AZ: iPhone notch və status bar */}
        {/* EN: iPhone notch and status bar */}
        <div className="relative h-11 flex items-end pb-2">
          {/* AZ: Qara çənti (notch) */}
          {/* EN: Black notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-black rounded-b-2xl flex items-center justify-center">
            <div className="w-14 h-1.5 bg-gray-800 rounded-full"></div>
          </div>
          
          {/* AZ: Status bar məzmunu */}
          {/* EN: Status bar content */}
          <div className="w-full px-6 flex items-center justify-between text-white text-sm font-medium">
            {/* AZ: Sol tərəf - saat */}
            {/* EN: Left side - time */}
            <div className="flex-1">
              <span className="font-semibold">{currentTime}</span>
            </div>
            
            {/* AZ: Sağ tərəf - şəbəkə və batareya */}
            {/* EN: Right side - network and battery */}
            <div className="flex items-center gap-1">
              {/* AZ: Şəbəkə siqnalı */}
              {/* EN: Network signal */}
              <div className="flex items-end gap-0.5">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1.5 bg-white rounded-full"></div>
                <div className="w-1 h-2 bg-white rounded-full"></div>
                <div className="w-1 h-2.5 bg-white rounded-full"></div>
              </div>
              
              {/* AZ: WiFi */}
              {/* EN: WiFi */}
              <div className="ml-1">
                <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                  <path d="M7.5 11C8.05 11 8.5 10.55 8.5 10C8.5 9.45 8.05 9 7.5 9C6.95 9 6.5 9.45 6.5 10C6.5 10.55 6.95 11 7.5 11Z" fill="white"/>
                  <path d="M7.5 7.5C8.85 7.5 10.1 8.05 11 8.95L12.05 7.9C10.8 6.65 9.2 6 7.5 6C5.8 6 4.2 6.65 2.95 7.9L4 8.95C4.9 8.05 6.15 7.5 7.5 7.5Z" fill="white"/>
                  <path d="M7.5 3C10.05 3 12.45 4.05 14.25 5.85L15.3 4.8C13.15 2.65 10.4 1.5 7.5 1.5C4.6 1.5 1.85 2.65 -0.3 4.8L0.75 5.85C2.55 4.05 4.95 3 7.5 3Z" fill="white"/>
                </svg>
              </div>
              
              {/* AZ: Batareya */}
              {/* EN: Battery */}
              <div className="ml-1 flex items-center">
                <div className="relative">
                  <div className="w-6 h-3 border border-white rounded-sm">
                    <div className="w-4 h-1.5 bg-white rounded-sm m-0.5"></div>
                  </div>
                  <div className="absolute -right-0.5 top-1 w-0.5 h-1 bg-white rounded-r-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}