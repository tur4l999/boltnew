import React from 'react';
import { useApp } from '../../contexts/AppContext';

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
}

export function QuantityStepper({ value, min = 1, max = 99, onChange }: QuantityStepperProps) {
  const { isDarkMode } = useApp();
  const btn = `w-8 h-8 flex items-center justify-center rounded-md border ${isDarkMode ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-100' : 'border-gray-300 bg-white hover:bg-gray-100 text-gray-800'}`;
  const canDec = value > min;
  const canInc = value < max;
  return (
    <div className="flex items-center gap-2">
      <button className={`${btn} ${!canDec ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => canDec && onChange(value - 1)}>-</button>
      <div className={`w-10 text-center text-sm font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{value}</div>
      <button className={`${btn} ${!canInc ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => canInc && onChange(value + 1)}>+</button>
    </div>
  );
}

