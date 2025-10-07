import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { EmojiIcon } from '../ui/EmojiIcon';

export function ReferralListScreen() {
  const { goBack, isDarkMode } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'registered' | 'purchased'>('all');

  // Demo data
  const referrals = [
    {
      id: 1,
      name: 'Fərid Məmmədov',
      email: 'ferid.m@example.com',
      date: '15 Sen 2025',
      status: 'purchased',
      earnings: [
        { amount: 5, reason: 'Qeydiyyat bonusu', date: '15 Sen 2025' },
        { amount: 20, reason: 'Premium paket alışı', date: '18 Sen 2025' }
      ],
      totalEarned: 25,
      package: 'Premium 90 gün'
    },
    {
      id: 2,
      name: 'Leyla Həsənova',
      email: 'leyla.h@example.com',
      date: '22 Sen 2025',
      status: 'purchased',
      earnings: [
        { amount: 5, reason: 'Qeydiyyat bonusu', date: '22 Sen 2025' },
        { amount: 15, reason: 'Standart paket alışı', date: '23 Sen 2025' }
      ],
      totalEarned: 20,
      package: 'Standart 60 gün'
    },
    {
      id: 3,
      name: 'Rəşad Əliyev',
      email: 'rashad.a@example.com',
      date: '28 Sen 2025',
      status: 'registered',
      earnings: [
        { amount: 5, reason: 'Qeydiyyat bonusu', date: '28 Sen 2025' }
      ],
      totalEarned: 5,
      package: null
    },
    {
      id: 4,
      name: 'Günel İsmayılova',
      email: 'gunel.i@example.com',
      date: '01 Okt 2025',
      status: 'purchased',
      earnings: [
        { amount: 5, reason: 'Qeydiyyat bonusu', date: '01 Okt 2025' },
        { amount: 20, reason: 'Premium paket alışı', date: '01 Okt 2025' }
      ],
      totalEarned: 25,
      package: 'Premium 90 gün'
    },
    {
      id: 5,
      name: 'Kamran Quliyev',
      email: 'kamran.q@example.com',
      date: '03 Okt 2025',
      status: 'registered',
      earnings: [
        { amount: 5, reason: 'Qeydiyyat bonusu', date: '03 Okt 2025' }
      ],
      totalEarned: 5,
      package: null
    }
  ];

  const filteredReferrals = referrals.filter(ref => {
    if (selectedFilter === 'all') return true;
    return ref.status === selectedFilter;
  });

  const totalReferrals = referrals.length;
  const totalEarnings = referrals.reduce((sum, ref) => sum + ref.totalEarned, 0);
  const purchasedCount = referrals.filter(r => r.status === 'purchased').length;

  return (
    <div className={`min-h-screen transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-br from-gray-50 via-white to-emerald-50'
    } pt-11`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className={`absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl animate-pulse ${
          isDarkMode ? 'bg-purple-500/5' : 'bg-purple-400/10'
        }`}></div>
      </div>

      <div className="relative z-10 p-4 pb-24">
        {/* Header */}
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
              isDarkMode ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'
            } bg-clip-text text-transparent`}>
              Dəvət edilənlər
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Referal proqram statistikası
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card variant="elevated" padding="md" className="animate-fadeInUp text-center">
            <div className={`text-3xl font-black mb-1 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>
              {totalReferrals}
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
              Dəvət edilən
            </div>
          </Card>
          <Card variant="elevated" padding="md" className="animate-fadeInUp text-center" style={{ animationDelay: '50ms' }}>
            <div className={`text-3xl font-black mb-1 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
              {totalEarnings} ₼
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
              Qazanılan
            </div>
          </Card>
          <Card variant="elevated" padding="md" className="animate-fadeInUp text-center" style={{ animationDelay: '100ms' }}>
            <div className={`text-3xl font-black mb-1 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              {purchasedCount}
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              Alış edib
            </div>
          </Card>
        </div>

        {/* Filter Buttons */}
        <Card variant="elevated" padding="md" className="mb-6 animate-fadeInUp" style={{ animationDelay: '150ms' }}>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
                selectedFilter === 'all'
                  ? isDarkMode
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Hamısı
            </button>
            <button
              onClick={() => setSelectedFilter('purchased')}
              className={`py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
                selectedFilter === 'purchased'
                  ? isDarkMode
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Alış edib
            </button>
            <button
              onClick={() => setSelectedFilter('registered')}
              className={`py-3 px-4 rounded-xl font-bold transition-all duration-300 ${
                selectedFilter === 'registered'
                  ? isDarkMode
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Qeydiyyat
            </button>
          </div>
        </Card>

        {/* Referral List */}
        <div className="space-y-4">
          {filteredReferrals.map((referral, index) => (
            <Card 
              key={referral.id} 
              variant="elevated" 
              padding="lg" 
              className="animate-fadeInUp"
              style={{ animationDelay: `${(index + 2) * 50}ms` }}
            >
              {/* User Info */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-purple-600/30 to-pink-600/30 text-purple-300' 
                    : 'bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700'
                }`}>
                  {referral.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`font-black text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      {referral.name}
                    </div>
                    {referral.status === 'purchased' && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-600 text-white'
                      }`}>
                        ✓ Aktiv
                      </span>
                    )}
                  </div>
                  <div className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    📧 {referral.email}
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    📅 Qeydiyyat: {referral.date}
                  </div>
                  {referral.package && (
                    <div className={`text-sm mt-1 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                      📦 {referral.package}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-black ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                    {referral.totalEarned} ₼
                  </div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Ümumi
                  </div>
                </div>
              </div>

              {/* Earnings Breakdown */}
              <div className={`pt-4 border-t-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className={`text-sm font-bold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  💰 Qazanc ətraflı:
                </div>
                <div className="space-y-2">
                  {referral.earnings.map((earning, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-xl flex items-center justify-between ${
                        isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                      }`}
                    >
                      <div>
                        <div className={`font-bold text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                          {earning.reason}
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {earning.date}
                        </div>
                      </div>
                      <div className={`font-black text-lg ${
                        isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
                      }`}>
                        +{earning.amount} ₼
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredReferrals.length === 0 && (
          <Card variant="elevated" padding="lg" className="text-center animate-fadeInUp">
            <div className="text-6xl mb-4">🤷</div>
            <h3 className={`font-black text-xl mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Heç kim tapılmadı
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Bu filtrdə dəvət edilmiş şəxs yoxdur
            </p>
          </Card>
        )}

        {/* How It Works */}
        <Card variant="elevated" padding="lg" className="mt-6 animate-fadeInUp">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDarkMode ? 'bg-blue-600/20' : 'bg-blue-100'
            }`}>
              <EmojiIcon emoji="💡" size={20} />
            </div>
            <h2 className={`font-black text-xl ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Necə işləyir?
            </h2>
          </div>

          <div className="space-y-3">
            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-start gap-3">
                <div className={`text-2xl ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  1️⃣
                </div>
                <div>
                  <div className={`font-bold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Dostunuz qeydiyyatdan keçir
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Sizin referal kodunuzla → <strong>+5 ₼ bonus</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-start gap-3">
                <div className={`text-2xl ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  2️⃣
                </div>
                <div>
                  <div className={`font-bold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Dostunuz paket alır
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Standart paket → <strong>+15 ₼</strong> | Premium paket → <strong>+20 ₼</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="flex items-start gap-3">
                <div className={`text-2xl ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  3️⃣
                </div>
                <div>
                  <div className={`font-bold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    Bonusdan istifadə edin
                  </div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Qazandığınız bonuslarla paket alın və ya balansınızı artırın
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
