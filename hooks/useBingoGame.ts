import { useReducer, useEffect, useCallback } from 'react';
import { GameState, BingoCardData, Speed } from '../types';
import { generateCard } from '../lib/cardGenerator';
import { getBingoPhrase } from '../lib/bingoCalls';
import { speak } from '../lib/speech';

interface GameStateShape {
  gameState: GameState;
  cards: BingoCardData[];
  drawnNumbers: Set<number>;
  availableNumbers: number[];
  currentNumber: number | null;
  speed: Speed;
  isAutoMarking: boolean;
  isSoundOn: boolean;
  winningCardIndex: number | null;
}

type Action =
  | { type: 'START_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'ADD_CARD' }
  | { type: 'DRAW_NUMBER' }
  | { type: 'SET_SPEED'; payload: Speed }
  | { type: 'TOGGLE_AUTO_MARK' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'MANUAL_MARK'; payload: { cardId: number; cellNumber: number } }
  | { type: 'SET_BINGO'; payload: number };

const initialNumbers = Array.from({ length: 75 }, (_, i) => i + 1);

const initialState: GameStateShape = {
  gameState: 'idle',
  cards: [],
  drawnNumbers: new Set(),
  availableNumbers: [...initialNumbers],
  currentNumber: null,
  speed: Speed.Normal,
  isAutoMarking: true,
  isSoundOn: true,
  winningCardIndex: null,
};

function checkWin(card: BingoCardData): boolean {
  const grid = card.grid;
  // Check rows
  for (let i = 0; i < 5; i++) {
    if (grid[i].every(cell => cell.marked)) return true;
  }
  // Check columns
  for (let j = 0; j < 5; j++) {
    if (grid.map(row => row[j]).every(cell => cell.marked)) return true;
  }
  // Check diagonals
  if (Array.from({length: 5}, (_, i) => grid[i][i]).every(cell => cell.marked)) return true;
  if (Array.from({length: 5}, (_, i) => grid[i][4-i]).every(cell => cell.marked)) return true;
  
  return false;
}

function gameReducer(state: GameStateShape, action: Action): GameStateShape {
  switch (action.type) {
    case 'START_GAME':
      if (state.cards.length === 0 || state.gameState === 'running') return state;
      return { ...state, gameState: 'running' };

    case 'RESET_GAME':
      return {
        ...initialState,
        cards: [], // Reset cards as well for a truly new game
        isSoundOn: state.isSoundOn, // Persist sound preference
        isAutoMarking: state.isAutoMarking, // Persist marking preference
      };

    case 'ADD_CARD':
      const newCard = generateCard(state.cards.length);
      return { ...state, cards: [...state.cards, newCard] };

    case 'DRAW_NUMBER': {
      if (state.availableNumbers.length === 0) {
        return { ...state, gameState: 'paused' };
      }
      const randomIndex = Math.floor(Math.random() * state.availableNumbers.length);
      const newNumber = state.availableNumbers[randomIndex];
      const newAvailable = state.availableNumbers.filter(n => n !== newNumber);
      const newDrawn = new Set(state.drawnNumbers).add(newNumber);

      let newCards = state.cards;
      if (state.isAutoMarking) {
        newCards = state.cards.map(card => ({
          ...card,
          grid: card.grid.map(row =>
            row.map(cell =>
              cell.number === newNumber ? { ...cell, marked: true } : cell
            )
          ),
        }));
      }

      return {
        ...state,
        currentNumber: newNumber,
        drawnNumbers: newDrawn,
        availableNumbers: newAvailable,
        cards: newCards,
      };
    }
    
    case 'MANUAL_MARK': {
        const { cardId, cellNumber } = action.payload;
        if (!state.drawnNumbers.has(cellNumber)) return state; // Can't mark undrawn number

        const newCards = state.cards.map(card => {
            if (card.id === cardId) {
                const newGrid = card.grid.map(row => row.map(cell => {
                    if (cell.number === cellNumber) {
                        return {...cell, marked: !cell.marked};
                    }
                    return cell;
                }));
                return {...card, grid: newGrid};
            }
            return card;
        });

        // Check for win after manual mark
        const winningCard = newCards.find(checkWin);
        if (winningCard) {
            return {
                ...state,
                cards: newCards,
                gameState: 'bingo',
                winningCardIndex: winningCard.id
            }
        }

        return {...state, cards: newCards};
    }

    case 'SET_BINGO':
      return { ...state, gameState: 'bingo', winningCardIndex: action.payload };

    case 'SET_SPEED':
      return { ...state, speed: action.payload };

    case 'TOGGLE_AUTO_MARK':
      return { ...state, isAutoMarking: !state.isAutoMarking };

    case 'TOGGLE_SOUND':
      return { ...state, isSoundOn: !state.isSoundOn };

    default:
      return state;
  }
}

export const useBingoGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    if (state.gameState !== 'running') return;

    const timer = setInterval(() => {
      dispatch({ type: 'DRAW_NUMBER' });
    }, state.speed);

    return () => clearInterval(timer);
  }, [state.gameState, state.speed]);

  useEffect(() => {
    if (!state.currentNumber) return;

    if (state.isSoundOn) {
      const phrase = getBingoPhrase(state.currentNumber);
      speak(phrase);
    }
    
    for (const card of state.cards) {
        if(checkWin(card)) {
            dispatch({ type: 'SET_BINGO', payload: card.id });
            if (state.isSoundOn) {
                speak("BINGO! BINGO! BINGO! Temos um vencedor!");
            }
            break;
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentNumber, state.isSoundOn, state.cards]);

  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
  const resetGame = useCallback(() => dispatch({ type: 'RESET_GAME' }), []);
  const addCard = useCallback(() => dispatch({ type: 'ADD_CARD' }), []);
  const setSpeed = useCallback((speed: Speed) => dispatch({ type: 'SET_SPEED', payload: speed }), []);
  const toggleAutoMark = useCallback(() => dispatch({ type: 'TOGGLE_AUTO_MARK' }), []);
  const toggleSound = useCallback(() => dispatch({ type: 'TOGGLE_SOUND' }), []);
  const manualMark = useCallback((cardId: number, cellNumber: number) => {
    dispatch({ type: 'MANUAL_MARK', payload: { cardId, cellNumber } });
  }, []);

  return {
    state,
    startGame,
    resetGame,
    addCard,
    setSpeed,
    toggleAutoMark,
    toggleSound,
    manualMark
  };
};