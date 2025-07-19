import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

export const NumberDisplay: React.FC = () => {
  const { currentNumber, currentPhrase, gameState } = useContext(GameContext)!;
  
  const numberKey = `${currentNumber}-${(Math.random() * 1000)}`;

  return (
    <div className="text-center p-6 bg-white rounded-2xl shadow-xl border-4 border-green-600 flex flex-col justify-center items-center h-64 md:h-80 min-h-[256px] md:min-h-[320px] relative overflow-hidden">
      {gameState === 'idle' && (
        <div className="transition-opacity duration-500">
          <h2 className="text-5xl font-bold text-green-800">Bem-vindo!</h2>
          <p className="text-xl text-gray-600 mt-4">Seu sorteador de bingo digital.</p>
          <p className="text-md text-gray-500 mt-8">Configure o jogo e clique em <span className="font-bold text-green-600">Iniciar</span>.</p>
        </div>
      )}
      {(gameState === 'running' || gameState === 'paused' || gameState === 'finished') && (
        <div className="w-full">
            {currentNumber && (
                 <div key={numberKey} className="text-9xl font-black text-green-800 my-2 animate-jump-in">
                    {currentNumber}
                 </div>
            )}
            <div className="h-20 flex items-center justify-center mt-4 px-4">
              <p className="text-3xl md:text-4xl text-amber-700 font-semibold text-center leading-tight">
                "{currentPhrase}"
              </p>
            </div>
        </div>
      )}
    </div>
  );
};