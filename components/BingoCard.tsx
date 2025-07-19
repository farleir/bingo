
import React, { useEffect, useState } from 'react';
import type { BingoCardData, Cell } from '../types';

interface BingoCardProps {
  cardData: BingoCardData;
  drawnNumbers: Set<number>;
  onMark: (cellNumber: number) => void;
  isWinner: boolean;
}

const CardCell: React.FC<{ cell: Cell; onMark: () => void; isDrawn: boolean; isWinner: boolean }> = ({ cell, onMark, isDrawn, isWinner }) => {
  const baseStyle = "w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-md font-bold text-xl cursor-pointer transition-all duration-200";
  
  let style = "bg-gray-700 text-white hover:bg-gray-600";
  if (cell.isFree) {
    style = "bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm";
  } else if (cell.marked) {
    style = `bg-gradient-to-br from-green-400 to-cyan-500 text-white shadow-lg ${isWinner ? 'animate-pulse' : ''}`;
  } else if (isDrawn) {
     style = "bg-gray-700 text-yellow-300 animate-pulse";
  }

  return (
    <div className={`${baseStyle} ${style}`} onClick={!cell.isFree ? onMark : undefined}>
      {cell.isFree ? 'FREE' : cell.number}
    </div>
  );
};

export const BingoCard: React.FC<BingoCardProps> = ({ cardData, drawnNumbers, onMark, isWinner }) => {
  const columnLetters = "BINGO";

  return (
    <div className={`p-4 rounded-xl shadow-lg transition-all duration-500 ${isWinner ? 'bg-yellow-400 ring-4 ring-yellow-200 shadow-yellow-300/50' : 'bg-gray-800'}`}>
        <h3 className={`text-center text-lg font-bold mb-3 ${isWinner ? 'text-gray-900' : 'text-purple-300'}`}>Cartela #{cardData.id + 1}</h3>
        <div className="grid grid-cols-5 gap-2">
            {columnLetters.split('').map(letter => (
                <div key={letter} className={`text-center font-black text-2xl ${isWinner ? 'text-gray-800' : 'text-gray-400'}`}>{letter}</div>
            ))}
            {cardData.grid.flat().map((cell, index) => (
                <CardCell
                    key={index}
                    cell={cell}
                    onMark={() => onMark(cell.number)}
                    isDrawn={!cell.marked && drawnNumbers.has(cell.number)}
                    isWinner={isWinner}
                />
            ))}
        </div>
    </div>
  );
};
