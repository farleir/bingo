export type GameState = 'idle' | 'running' | 'paused' | 'finished' | 'bingo';

export interface Cell {
  number: number;
  marked: boolean;
  isFree?: boolean;
}

export interface BingoCardData {
  id: number;
  grid: Cell[][];
}

export enum Speed {
  Slow = 3000,
  Normal = 2000,
  Fast = 1000,
}

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
