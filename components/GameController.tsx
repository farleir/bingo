import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { PlayIcon, PauseIcon } from './icons';

export const GameController: React.FC = () => {
    const { gameState, startGame, pauseGame, resumeGame } = useContext(GameContext)!;

    const baseButton = "w-full flex items-center justify-center px-4 py-3 font-bold text-lg rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none";
    const primaryButton = `${baseButton} bg-gradient-to-br from-teal-600 to-green-500 text-white hover:from-teal-700 hover:to-green-600 focus:ring-teal-300`;
    const secondaryButton = `${baseButton} bg-gray-200 text-teal-800 hover:bg-gray-300 focus:ring-teal-400`;
    
    return (
        <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(gameState === 'idle' || gameState === 'finished') && (
                    <button onClick={startGame} className={`${primaryButton} sm:col-span-2`}>
                        <PlayIcon className="w-6 h-6 mr-2" />
                        Iniciar Jogo
                    </button>
                )}

                {gameState === 'running' && (
                     <button onClick={pauseGame} className={`${secondaryButton} sm:col-span-2`}>
                        <PauseIcon className="w-6 h-6 mr-2" />
                        Pausar
                    </button>
                )}

                {gameState === 'paused' && (
                    <button onClick={resumeGame} className={`${primaryButton} sm:col-span-2`}>
                        <PlayIcon className="w-6 h-6 mr-2" />
                        Continuar
                    </button>
                )}
            </div>
        </div>
    );
};