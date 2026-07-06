import React from 'react';

interface DecorativeBorderProps {
  /** 允許從外部注入額外的樣式（例如改變顏色、高度或特定間距） */
  className?: string;
}

export const DecorativeBorder: React.FC<DecorativeBorderProps> = ({ className = '' }) => {
  return (
    <div 
      className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 transition-all duration-500 ease-out group-hover:h-2 ${className}`} 
    />
  );
};