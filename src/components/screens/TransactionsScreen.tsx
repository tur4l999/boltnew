import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card } from '../ui/Card';

export function TransactionsScreen() {
  const { goBack, balance, transactions } = useApp();

  return (
    <div className="p-3 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-lg border border-gray-300 bg-gray-50 flex items-center justify-center hover:bg-gray-100"
        >
          ←
        </button>
        <h1 className="text-lg font-bold text-gray-900">Daxili Balans</h1>
      </div>

      {/* Balance Card */}
      <Card className="mb-4 text-center">
        <div className="text-sm text-gray-500 mb-1">Cari Balans</div>
        <div className="text-3xl font-bold text-emerald-600 mb-2">{balance} AZN</div>
        <button
          onClick={() => alert('Balans artırma (demo)')}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
        >
          💳 Balans artır
        </button>
      </Card>

      {/* Transactions */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Ödənişlər Tarixçəsi</h2>
        
        {transactions.length === 0 ? (
          <Card>
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">📋</div>
              <div className="text-sm">Hələlik ödəniş yoxdur</div>
            </div>
          </Card>
        ) : (
          <div className="space-y-2">
            {transactions.map((transaction) => (
              <Card key={transaction.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'purchase' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {transaction.type === 'purchase' ? '📦' : '💰'}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">
                        {transaction.description}
                      </div>
                      <div className="text-xs text-gray-500">
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
      <Card>
        <h3 className="font-bold text-gray-900 mb-3 text-center">Balans artırma üsulları</h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => alert('Kart ilə ödəniş (demo)')}
            className="p-3 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-2xl mb-1">💳</div>
            <div className="text-xs text-gray-600">Kart</div>
          </button>
          <button
            onClick={() => alert('Mobil ödəniş (demo)')}
            className="p-3 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-2xl mb-1">📱</div>
            <div className="text-xs text-gray-600">Mobil</div>
          </button>
          <button
            onClick={() => alert('Bank köçürməsi (demo)')}
            className="p-3 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-2xl mb-1">🏦</div>
            <div className="text-xs text-gray-600">Bank</div>
          </button>
        </div>
      </Card>
    </div>
  );
}