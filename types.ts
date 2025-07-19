export type GameState = 'idle' | 'running' | 'paused' | 'finished';

export interface GameContextType {
  gameState: GameState;
  calledNumbers: Set<number>;
  currentNumber: number | null;
  currentPhrase: string;
  speed: number; // in milliseconds
  isSoundOn: boolean;
  maxNumber: number;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  setSpeed: (speed: number) => void;
  setIsSoundOn: (isOn: boolean) => void;
  setMaxNumber: (n: number) => void;
}