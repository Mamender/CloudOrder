'use client';

import React from 'react';

interface AlertProps {
  type: 'error' | 'success' | 'info';
  message: string;
  onClose?: () => void;
}

export function Alert({ type, message, onClose }: AlertProps) {
  if (!message) return null;

  const colorStyles = {
    error: 'bg-red-50 border-red-300 text-red-800',
    success: 'bg-green-50 border-green-300 text-green-800',
    info: 'bg-blue-50 border-blue-300 text-blue-800',
  }[type];

  return (
    <div className={`flex items-center justify-between p-3.5 mb-4 border rounded-lg text-sm font-medium ${colorStyles}`}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-3 text-lg font-bold leading-none hover:opacity-75 focus:outline-none"
        >
          &times;
        </button>
      )}
    </div>
  );
}
