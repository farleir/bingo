
import React, { useEffect } from 'react';

interface BingoModalProps {
  onNewGame: () => void;
}

export const BingoModal: React.FC<BingoModalProps> = ({ onNewGame }) => {
  useEffect(() => {
    // A simple confetti effect
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      const colors = ['bg-pink-500', 'bg-purple-500', 'bg-yellow-400', 'bg-green-400', 'bg-cyan-400'];
      confetti.className = `absolute w-3 h-3 ${colors[Math.floor(Math.random() * colors.length)]} opacity-70 rounded-full animate-fall`;
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      confetti.style.animationDuration = `${3 + Math.random() * 2}s`;
      confettiContainer.appendChild(confetti);
    }
    
    return () => {
        if(confettiContainer) confettiContainer.innerHTML = '';
    }
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl border border-purple-500/50 text-center p-8 overflow-hidden">
          <div id="confetti-container" className="absolute inset-0 pointer-events-none"></div>
          <h2 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 animate-pulse">
            BINGO!
          </h2>
          <p className="mt-4 text-xl text-gray-300">Parabéns, você ganhou!</p>
          <button
            onClick={onNewGame}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Jogar Novamente
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </>
  );
};
