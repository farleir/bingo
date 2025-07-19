import React from 'react';

interface BingoBoardProps {
  drawnNumbers: Set<number>;
  currentNumber: number | null;
}

interface NumberCellProps {
    number: number;
    isDrawn: boolean;
    isCurrent: boolean;
}

const NumberCell: React.FC<NumberCellProps> = ({ number, isDrawn, isCurrent }) => {
  const baseStyle = "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full font-bold text-lg transition-all duration-300";
  
  let style = "bg-gray-800 text-gray-400";
  if (isDrawn) {
    style = "bg-pink-500 text-white shadow-lg shadow-pink-500/50";
  }
  if (isCurrent) {
    style = "bg-purple-500 text-white scale-110 ring-4 ring-purple-300 shadow-xl shadow-purple-500/50";
  }
  
  return (
    <div className={baseStyle + " " + style}>
      {number}
    </div>
  );
};

export const BingoBoard: React.FC<BingoBoardProps> = ({ drawnNumbers, currentNumber }) => {
  const numbers = Array.from({ length: 75 }, (_, i) => i + 1);
  const columnLetters = "BINGO";

  return (
    <div className="bg-gray-800/50 p-4 md:p-6 rounded-xl shadow-2xl">
      <div className="flex justify-around mb-4">
        {columnLetters.split('').map((letter) => (
          <div key={letter} className="w-1/5 text-center text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-400">
            {letter}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-15 gap-2 justify-items-center hidden md:grid">
        {numbers.map(num => (
          <NumberCell 
            key={num}
            number={num}
            isDrawn={drawnNumbers.has(num)}
            isCurrent={currentNumber === num}
          />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2 md:hidden">
          {columnLetters.split('').map((letter, colIndex) => (
              <div key={letter} className="flex flex-col items-center gap-2">
                  {numbers.slice(colIndex * 15, colIndex * 15 + 15).map(num => (
                    <NumberCell
                        key={num}
                        number={num}
                        isDrawn={drawnNumbers.has(num)}
                        isCurrent={currentNumber === num}
                    />
                  ))}
              </div>
          ))}
      </div>
    </div>
  );
};

// Custom grid-cols for 15 columns
const tailwindConfig = `
  <style>
    .grid-cols-15 {
      grid-template-columns: repeat(15, minmax(0, 1fr));
    }
  </style>
`;
const head = document.head;
head.insertAdjacentHTML('beforeend', tailwindConfig);