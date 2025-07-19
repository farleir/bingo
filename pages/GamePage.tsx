import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { useBeforeUnload } from '../hooks/useBeforeUnload';
import { GameController } from '../components/GameController';
import { NumberDisplay } from '../components/NumberDisplay';
import { CalledNumbersTable } from '../components/CalledNumbersTable';
import { SettingsPanel } from '../components/SettingsPanel';
import { Header } from '../components/Header';
import { Instructions } from '../components/Instructions';
import { RefreshIcon } from '../components/icons';

export const GamePage: React.FC = () => {
  const context = useContext(GameContext);

  if (!context) {
    return <div>Carregando...</div>; // Ou algum componente de fallback
  }

  const { gameState, resetGame } = context;
  useBeforeUnload(gameState === 'running' || gameState === 'paused');

  return (
    <div className="container mx-auto p-4 max-w-7xl">
        <Header />
        <main>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                {/* Coluna Principal */}
                <div className="lg:col-span-2 space-y-6">
                    <NumberDisplay />
                    <GameController />
                </div>
                {/* Coluna Lateral */}
                <aside className="space-y-6">
                    <SettingsPanel />
                </aside>
            </div>
            <CalledNumbersTable />
            <Instructions />

            <div className="mt-12 text-center">
              <button
                  onClick={resetGame}
                  disabled={gameState === 'idle'}
                  className="flex items-center justify-center mx-auto px-6 py-2 font-semibold text-teal-700 rounded-lg shadow-none transition-all duration-200 hover:bg-teal-100 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent"
              >
                  <RefreshIcon className="w-5 h-5 mr-2" />
                  Reiniciar Jogo
              </button>
            </div>
        </main>
         <footer className="w-full mx-auto mt-8 py-4 text-center text-gray-500 text-sm border-t border-gray-200">
            <p>&copy; 2025 @farleir. Todos os direitos reservados.</p>
        </footer>
    </div>
  );
};