import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';
import { CreditCardIcon, ClipboardIcon, PackageIcon, WalletIcon, PhoneIcon, BankIcon } from '../icons';

export function TransactionsScreen() {
  const { goBack, balance, transactions, isDarkMode } = useApp();

  return (
    <div className={`p-3 pb-24 min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    } pt-11`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={goBack}
          className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-colors duration-200 ${
            isDarkMode 
              ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-200' 
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700'
          }`}
        >
          ←
        </button>
        <h1 className={`text-lg font-bold transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>Daxili Balans</h1>
      </div>

      {/* Balance Card */}
      <Card className={`mb-4 text-center transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className={`text-sm mb-1 transition-colors duration-200 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>Cari Balans</div>
        <div className="text-3xl font-bold text-emerald-600 mb-2">{balance} AZN</div>
        <button
          onClick={() => alert('Balans artırma (demo)')}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
        >
          <CreditCardIcon size={20} className="inline mr-1" />
          Balans artır
        </button>
      </Card>

      {/* Transactions */}
      <div className="mb-4">
        <h2 className={`text-lg font-bold mb-3 transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>Ödənişlər Tarixçəsi</h2>
        
        {transactions.length === 0 ? (
          <Card className={`transition-colors duration-200 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className={`text-center py-8 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className="mb-2">
                <ClipboardIcon size={48} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              </div>
              <div className="text-sm">Hələlik ödəniş yoxdur</div>
            </div>
          </Card>
        ) : (
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className={`transition-colors duration-200 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'purchase' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {transaction.type === 'purchase' ? 
                        <PackageIcon size={24} className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} /> : 
                        <WalletIcon size={24} className={isDarkMode ? 'text-green-400' : 'text-green-600'} />
                      }
                    </div>
                    <div>
                      <div className={`font-medium text-sm transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        {transaction.description}
                      </div>
                      <div className={`text-xs transition-colors duration-200 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {transaction.date.toLocaleDateString('az-AZ')} - {transaction.date.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  <div className={`font-bold ${
                    transaction.type === 'purchase' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {transaction.type === 'purchase' ? '-' : '+'}{transaction.amount} AZN
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Payment Methods */}
      <Card className={`transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`font-bold mb-3 text-center transition-colors duration-200 ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>Balans artırma üsulları</h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => alert('Kart ilə ödəniş (demo)')}
            className={`p-3 border rounded-lg text-center transition-colors duration-200 ${
              isDarkMode 
                ? 'border-gray-600 hover:bg-gray-700' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="mb-1">
              <CreditCardIcon size={32} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
            </div>
            <div className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Kart</div>
          </button>
          <button
            onClick={() => alert('Mobil ödəniş (demo)')}
            className={`p-3 border rounded-lg text-center transition-colors duration-200 ${
              isDarkMode 
                ? 'border-gray-600 hover:bg-gray-700' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="mb-1">
              <PhoneIcon size={32} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
            </div>
            <div className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Mobil</div>
          </button>
          <button
            onClick={() => alert('Bank köçürməsi (demo)')}
            className={`p-3 border rounded-lg text-center transition-colors duration-200 ${
              isDarkMode 
                ? 'border-gray-600 hover:bg-gray-700' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="mb-1">
              <BankIcon size={32} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
            </div>
            <div className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Bank</div>
          </button>
        </div>
      </Card>
    </div>
  );
}