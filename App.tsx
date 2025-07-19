import React from 'react';
import { GameProvider } from './context/GameContext';
import { GamePage } from './pages/GamePage';

export default function App(): React.ReactNode {
  return (
    <GameProvider>
      <GamePage />
    </GameProvider>
  );
}