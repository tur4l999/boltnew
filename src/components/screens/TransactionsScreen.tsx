import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { EmojiIcon } from '../ui/EmojiIcon';
import { Progress } from '../ui/Progress';

export function TransactionsScreen() {
  const { goBack, balance, transactions, isDarkMode } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'purchase' | 'refund'>('all');
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [amount, setAmount] = useState<string>('');

  // Calculate statistics
  const totalSpent = transactions
    .filter(t => t.type === 'purchase')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalRefunded = transactions
    .filter(t => t.type === 'refund')
    .reduce((sum, t) => sum + t.amount, 0);

  const quickAmounts = [3, 5, 10, 20, 50];

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleAddBalance = () => {
    const amountNum = parseFloat(amount);
    if (amountNum && amountNum > 0) {
      alert(`${amountNum} AZN balans artırıldı (demo)`);
      setAmount('');
      setShowAddBalance(false);
    } else {
      alert('Zəhmət olmasa məbləğ daxil edin');
    }
  };

  const filteredTransactions = transactions.filter(t => 
    selectedFilter === 'all' ? true : t.type === selectedFilter
  );

  const currentMonth = new Date().toLocaleDateString('az-AZ', { month: 'long' });

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-200 ${
      isDarkMode ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50'
    } pt-11`}>
      {/* Enhanced Header with Gradient */}
      <div className={`sticky top-11 z-10 backdrop-blur-xl border-b transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-900/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
      }`}>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={goBack}
              className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                isDarkMode 
                  ? 'border-gray-600 bg-gray-800 hover:bg-gray-700 text-gray-200' 
                  : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm'
              }`}
            >
              <EmojiIcon emoji="←" size={18} />
            </button>
            <div className="flex-1">
              <h1 className={`text-xl font-bold transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>Daxili Balans</h1>
              <p className={`text-xs transition-colors duration-200 ${
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>{currentMonth} ayı üçün xərc</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Main Balance Card with Gradient Background */}
        <Card 
          variant="glass" 
          className={`relative overflow-hidden border-2 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-emerald-900/40 via-green-900/30 to-teal-900/40 border-emerald-500/30' 
              : 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-emerald-200/50'
          }`}
          hover={false}
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${
              isDarkMode ? 'bg-emerald-500' : 'bg-emerald-400'
            }`}></div>
            <div className={`absolute bottom-0 left-0 w-40 h-40 rounded-full blur-3xl ${
              isDarkMode ? 'bg-green-500' : 'bg-green-400'
            }`}></div>
          </div>

          <div className="relative z-10 text-center py-2">
            <div className={`text-sm font-medium mb-2 flex items-center justify-center gap-2 ${
              isDarkMode ? 'text-emerald-300' : 'text-emerald-700'
            }`}>
              <EmojiIcon emoji="💰" size={16} />
              <span>Cari Balans</span>
            </div>
            
            <div className={`text-5xl font-black mb-6 transition-all duration-300 ${
              isDarkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              {balance}
              <span className="text-3xl ml-2">AZN</span>
            </div>

            <Button
              variant="success"
              size="lg"
              fullWidth
              onClick={() => setShowAddBalance(!showAddBalance)}
              icon={<EmojiIcon emoji="💳" size={20} />}
              className="shadow-xl"
            >
              Balans artır
            </Button>
          </div>
        </Card>

        {/* Add Balance Section - Collapsible */}
        {showAddBalance && (
          <Card 
            variant="elevated"
            className={`transform transition-all duration-300 animate-fade-in-up ${
              isDarkMode ? 'bg-gray-800/90' : 'bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-bold ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Balans artır
              </h3>
              <button
                onClick={() => setShowAddBalance(false)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                ✕
              </button>
            </div>

            {/* Amount Input */}
            <div className="mb-4">
              <label className={`text-sm font-medium mb-2 block ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Məbləğ (AZN)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className={`w-full px-4 py-3 rounded-xl text-lg font-bold border-2 transition-all duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-500 focus:border-emerald-500 focus:bg-gray-700' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:bg-white'
                } focus:outline-none focus:ring-4 focus:ring-emerald-500/20`}
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="mb-4">
              <label className={`text-sm font-medium mb-2 block ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Sürətli seçim
              </label>
              <div className="grid grid-cols-5 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => handleQuickAmount(quickAmount)}
                    className={`py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                      amount === quickAmount.toString()
                        ? 'bg-emerald-600 text-white shadow-lg scale-105'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-300 border-2 border-gray-600 hover:border-emerald-500'
                          : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-emerald-500 shadow-sm'
                    }`}
                  >
                    {quickAmount}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method - Bank Card Only */}
            <div className="mb-4">
              <label className={`text-sm font-medium mb-2 block ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Ödəniş üsulu
              </label>
              <div className={`p-4 border-2 rounded-2xl transition-all duration-200 ${
                isDarkMode 
                  ? 'border-emerald-500 bg-gray-700/50' 
                  : 'border-emerald-500 bg-emerald-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                    <EmojiIcon emoji="💳" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-bold ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}>Bank Kartı</div>
                    <div className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Ani və təhlükəsiz ödəniş</div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <Button
              variant="success"
              size="lg"
              fullWidth
              onClick={handleAddBalance}
              className="shadow-xl"
            >
              Təsdiq et
            </Button>
          </Card>
        )}

        {/* Transaction Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 ${
              selectedFilter === 'all'
                ? isDarkMode
                  ? 'bg-emerald-600 text-white shadow-lg scale-105'
                  : 'bg-emerald-600 text-white shadow-lg scale-105'
                : isDarkMode
                  ? 'bg-gray-800 text-gray-300 border-2 border-gray-700'
                  : 'bg-white text-gray-700 border-2 border-gray-200'
            }`}
          >
            Hamısı ({transactions.length})
          </button>
          <button
            onClick={() => setSelectedFilter('purchase')}
            className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 ${
              selectedFilter === 'purchase'
                ? isDarkMode
                  ? 'bg-red-600 text-white shadow-lg scale-105'
                  : 'bg-red-600 text-white shadow-lg scale-105'
                : isDarkMode
                  ? 'bg-gray-800 text-gray-300 border-2 border-gray-700'
                  : 'bg-white text-gray-700 border-2 border-gray-200'
            }`}
          >
            Xərclər ({transactions.filter(t => t.type === 'purchase').length})
          </button>
          <button
            onClick={() => setSelectedFilter('refund')}
            className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 ${
              selectedFilter === 'refund'
                ? isDarkMode
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'bg-green-600 text-white shadow-lg scale-105'
                : isDarkMode
                  ? 'bg-gray-800 text-gray-300 border-2 border-gray-700'
                  : 'bg-white text-gray-700 border-2 border-gray-200'
            }`}
          >
            Geri qaytarma ({transactions.filter(t => t.type === 'refund').length})
          </button>
        </div>

        {/* Transactions History */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className={`text-lg font-bold ${
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            }`}>
              Ödənişlər Tarixçəsi
            </h2>
            {filteredTransactions.length > 0 && (
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
              }`}>
                {filteredTransactions.length} əməliyyat
              </span>
            )}
          </div>
          
          {filteredTransactions.length === 0 ? (
            <Card 
              variant="glass"
              className={`${
                isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
              }`}
            >
              <div className={`text-center py-12 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <EmojiIcon emoji="📋" size={40} />
                </div>
                <div className="text-base font-semibold mb-1">
                  {selectedFilter === 'all' ? 'Hələlik ödəniş yoxdur' : 
                   selectedFilter === 'purchase' ? 'Hələlik xərc yoxdur' : 
                   'Hələlik geri qaytarma yoxdur'}
                </div>
                <div className="text-sm">
                  Əməliyyatlar burada görünəcək
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-2">
              {filteredTransactions.map((transaction, index) => (
                <Card 
                  key={transaction.id} 
                  variant="elevated"
                  padding="md"
                  className={`transform transition-all duration-300 hover:scale-[1.01] ${
                    isDarkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white border-gray-200/50'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                      transaction.type === 'purchase' 
                        ? 'bg-gradient-to-br from-red-500 to-pink-500' 
                        : 'bg-gradient-to-br from-green-500 to-emerald-500'
                    }`}>
                      <EmojiIcon 
                        emoji={transaction.type === 'purchase' ? '📦' : '💰'} 
                        size={24} 
                        className="text-white"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-sm mb-1 truncate ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {transaction.description}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {transaction.date.toLocaleDateString('az-AZ', { 
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        <span className={`text-xs ${
                          isDarkMode ? 'text-gray-600' : 'text-gray-400'
                        }`}>•</span>
                        <span className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {transaction.date.toLocaleTimeString('az-AZ', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`font-black text-lg whitespace-nowrap ${
                      transaction.type === 'purchase' ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {transaction.type === 'purchase' ? '-' : '+'}{transaction.amount} ₼
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Security Info */}
        <Card 
          variant="glass" 
          padding="md"
          className={`${
            isDarkMode ? 'border-blue-500/20 bg-blue-900/10' : 'border-blue-200/50 bg-blue-50/30'
          }`}
          hover={false}
        >
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'
            }`}>
              <EmojiIcon emoji="🔒" size={20} />
            </div>
            <div className="flex-1">
              <div className={`text-sm font-bold mb-1 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-900'
              }`}>
                Təhlükəsiz ödənişlər
              </div>
              <div className={`text-xs leading-relaxed ${
                isDarkMode ? 'text-blue-400/80' : 'text-blue-700/80'
              }`}>
                Bütün ödənişləriniz 256-bit SSL şifrələməsi ilə qorunur. Kart məlumatlarınız saxlanılmır.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
