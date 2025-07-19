import React, { createContext, useState, useRef, useCallback, useEffect, ReactNode } from 'react';
import { GameState, GameContextType } from '../types';
import { bingoPhrases } from '../data/bingoPhrases';

export const GameContext = createContext<GameContextType | undefined>(undefined);

/**
 * Provedor de Contexto do Jogo.
 * Gerencia todo o estado e lógica do sorteio do bingo.
 */
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [calledNumbers, setCalledNumbers] = useState<Set<number>>(new Set());
  const [availableNumbers, setAvailableNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [currentPhrase, setCurrentPhrase] = useState<string>('Clique em "Iniciar" para começar!');
  const [speed, setSpeed] = useState<number>(10000); // Padrão de 10 segundos
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [maxNumber, setMaxNumber] = useState<number>(75);

  const timerRef = useRef<number | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      utteranceRef.current = new SpeechSynthesisUtterance();
      utteranceRef.current.lang = 'pt-BR';
      utteranceRef.current.rate = 0.9; // Voz um pouco mais lenta
      utteranceRef.current.pitch = 1.0; // Tom de voz mais padrão/grave
    }
    setAvailableNumbers(Array.from({ length: maxNumber }, (_, i) => i + 1));
  }, [maxNumber]);

  const speak = useCallback((text: string) => {
    if (isSoundOn && utteranceRef.current && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      utteranceRef.current.text = text;
      window.speechSynthesis.speak(utteranceRef.current);
    }
  }, [isSoundOn]);

  const drawNumber = useCallback(() => {
    if (availableNumbers.length === 0) {
      setGameState('finished');
      const endMessage = 'Fim de jogo! Todos os números foram sorteados.';
      setCurrentPhrase(endMessage);
      speak(endMessage);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const newNumber = availableNumbers[randomIndex];
    
    setAvailableNumbers(prev => prev.filter(n => n !== newNumber));
    setCurrentNumber(newNumber);
    setCalledNumbers(prev => new Set(prev).add(newNumber));

    // Seleciona uma frase da lista estática
    const phrases = bingoPhrases[newNumber] || [`Número ${newNumber}!`];
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    
    setCurrentPhrase(phrase);
    // Fala a frase e depois repete o número para confirmação
    speak(`${phrase}. Número ${newNumber}.`);

  }, [availableNumbers, speak]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(drawNumber, speed);
  }, [drawNumber, speed]);

  const startGame = () => {
    if (gameState !== 'idle' && gameState !== 'finished') return;

    setCalledNumbers(new Set());
    setAvailableNumbers(Array.from({ length: maxNumber }, (_, i) => i + 1));
    setCurrentNumber(null);
    setGameState('running');

    setTimeout(() => {
      drawNumber();
      startTimer();
    }, 500);
  };

  const pauseGame = () => {
    if (gameState !== 'running') return;
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState('paused');
    window.speechSynthesis.cancel();
  };

  const resumeGame = () => {
    if (gameState !== 'paused') return;
    setGameState('running');
    drawNumber();
    startTimer();
  };

  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    window.speechSynthesis.cancel();
    setGameState('idle');
    setCalledNumbers(new Set());
    setAvailableNumbers(Array.from({ length: maxNumber }, (_, i) => i + 1));
    setCurrentNumber(null);
    setCurrentPhrase('Clique em "Iniciar" para começar!');
  };

  const handleSetSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (gameState === 'running') {
      startTimer();
    }
  };

  const handleSetMaxNumber = (n: number) => {
    setMaxNumber(n);
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState('idle');
    setCalledNumbers(new Set());
    setAvailableNumbers(Array.from({ length: n }, (_, i) => i + 1));
    setCurrentNumber(null);
    setCurrentPhrase('Configuração alterada. Clique em "Iniciar"!');
  };

  const value: GameContextType = {
    gameState, calledNumbers, currentNumber, currentPhrase, speed, isSoundOn, maxNumber,
    startGame, pauseGame, resumeGame, resetGame, setSpeed: handleSetSpeed, setIsSoundOn, setMaxNumber: handleSetMaxNumber
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};