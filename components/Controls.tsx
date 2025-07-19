import React from 'react';
import { GameState, Speed } from '../types';
import { PlayIcon, RefreshIcon, PlusIcon, SoundOnIcon, SoundOffIcon, CheckCircleIcon, XCircleIcon } from './icons';

interface ControlsProps {
  gameState: GameState;
  speed: Speed;
  isAutoMarking: boolean;
  isSoundOn: boolean;
  onStart: () => void;
  onReset: () => void;
  onAddCard: () => void;
  onSetSpeed: (speed: Speed) => void;
  onToggleAutoMark: () => void;
  onToggleSound: () => void;
}

const baseButton = "w-full flex items-center justify-center px-4 py-3 font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900";
const primaryButton = `${baseButton} bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 focus:ring-pink-500`;
const secondaryButton = `${baseButton} bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-500`;
const disabledButton = "bg-gray-600 text-gray-400 cursor-not-allowed";

export const Controls: React.FC<ControlsProps> = ({
  gameState,
  speed,
  isAutoMarking,
  isSoundOn,
  onStart,
  onReset,
  onAddCard,
  onSetSpeed,
  onToggleAutoMark,
  onToggleSound,
}) => {
  const isIdle = gameState === 'idle';
  const isRunning = gameState === 'running';

  return (
    <div className="bg-gray-800/50 p-6 rounded-xl shadow-2xl space-y-6">
      <h2 className="text-xl font-bold text-center text-gray-200">Controles do Jogo</h2>
      
      <div className="space-y-3">
        <button onClick={onStart} className={`${primaryButton} ${!isIdle && 'opacity-50 ' + disabledButton}`} disabled={!isIdle}>
          <PlayIcon className="w-5 h-5 mr-2" />
          {isRunning ? 'Em Jogo' : 'Iniciar Sorteio'}
        </button>
        <button onClick={onReset} className={secondaryButton}>
            <RefreshIcon className="w-5 h-5 mr-2" />
            Novo Jogo
        </button>
        <button onClick={onAddCard} className={`${secondaryButton} ${isRunning && 'opacity-50 ' + disabledButton}`} disabled={isRunning}>
            <PlusIcon className="w-5 h-5 mr-2" />
            Gerar Cartela
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-300 text-center">Velocidade</h3>
        <div className="flex justify-between space-x-2">
          {(Object.keys(Speed).filter((v) => isNaN(Number(v)))).map((level) => (
            <button
              key={level}
              onClick={() => onSetSpeed(Speed[level as keyof typeof Speed])}
              className={`w-full py-2 text-sm font-bold rounded-md transition-colors ${speed === Speed[level as keyof typeof Speed] ? 'bg-pink-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <button onClick={onToggleAutoMark} className={`${baseButton} ${isAutoMarking ? 'bg-green-500' : 'bg-gray-700'} text-white`}>
          {isAutoMarking ? <CheckCircleIcon className="w-5 h-5 mr-2" /> : <XCircleIcon className="w-5 h-5 mr-2" />}
          Auto
        </button>
        <button onClick={onToggleSound} className={`${baseButton} ${isSoundOn ? 'bg-blue-500' : 'bg-gray-700'} text-white`}>
          {isSoundOn ? <SoundOnIcon className="w-5 h-5 mr-2" /> : <SoundOffIcon className="w-5 h-5 mr-2" />}
          Som
        </button>
      </div>
    </div>
  );
};