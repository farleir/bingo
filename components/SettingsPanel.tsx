import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { SoundOnIcon, SoundOffIcon } from './icons';

export const SettingsPanel: React.FC = () => {
  const context = useContext(GameContext);

  if (!context) return null;

  const { speed, setSpeed, isSoundOn, setIsSoundOn, gameState, maxNumber, setMaxNumber } = context;
  const isDisabled = gameState === 'running' || gameState === 'paused';

  return (
    <div className={`p-6 bg-teal-50 rounded-2xl shadow-lg transition-opacity duration-300 ${isDisabled ? 'opacity-60 pointer-events-none' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-teal-800">Configurações</h3>
        <button
            onClick={() => setIsSoundOn(!isSoundOn)}
            className={`p-2 rounded-full transition-colors ${isSoundOn ? 'bg-teal-600 text-white' : 'bg-teal-200 text-teal-800'}`}
            aria-label={isSoundOn ? 'Desativar som' : 'Ativar som'}
        >
            {isSoundOn ? <SoundOnIcon className="w-6 h-6"/> : <SoundOffIcon className="w-6 h-6" />}
        </button>
      </div>

      <div className="space-y-6">
        {/* Controle de Número Máximo */}
        <div>
          <label htmlFor="maxNumber" className="block text-md font-medium text-teal-800 mb-2">Total de Bolas</label>
          <div className="relative">
            <select
              id="maxNumber"
              value={maxNumber}
              onChange={(e) => setMaxNumber(Number(e.target.value))}
              disabled={isDisabled}
              className="appearance-none w-full p-3 font-semibold text-teal-800 bg-teal-100 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition cursor-pointer"
            >
              <option value="75">75 Bolas (BINGO)</option>
              <option value="50">50 Bolas</option>
              <option value="90">90 Bolas</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-teal-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Controle de Velocidade */}
        <div>
          <label htmlFor="speed" className="block text-md font-medium text-teal-800 mb-2">Velocidade do Sorteio</label>
          <input
            id="speed"
            type="range"
            min="5000" 
            max="15000" 
            step="1000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isDisabled}
            className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer accent-amber-500 disabled:cursor-not-allowed"
          />
          <div className="text-center text-sm text-gray-600 mt-2">{(speed / 1000).toFixed(1)} segundos</div>
        </div>
      </div>
      {isDisabled && <p className="text-center text-xs text-amber-600 mt-6">É preciso pausar ou reiniciar o jogo para alterar as configurações.</p>}
    </div>
  );
};