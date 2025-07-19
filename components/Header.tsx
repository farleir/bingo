import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full mx-auto flex justify-between items-center py-4 px-4 md:px-0">
      <div>
        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-600">
          Bingo Cantado
        </h1>
        <p className="text-sm text-gray-500 mt-1">Com Frases Brasileiras para cada número</p>
      </div>
    </header>
  );
};