import React, { useContext, memo } from 'react';
import { GameContext } from '../context/GameContext';

/**
 * Componente para uma única célula de número no painel.
 * Memoizado para otimizar a performance.
 */
const NumberCell = memo(({ number, isCalled }: { number: number; isCalled: boolean }) => (
  <div
    className={`flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full font-bold text-sm md:text-base transition-all duration-300
      ${isCalled
        ? 'bg-green-500 text-white scale-110 shadow-md'
        : 'bg-gray-200 text-gray-600'
      }
    `}
  >
    {number}
  </div>
));

/**
 * Renderiza uma coluna completa do painel B-I-N-G-O para o jogo de 75 bolas.
 */
const BingoColumn = ({ letter, colIndex, calledNumbers }: { letter: string; colIndex: number; calledNumbers: Set<number> }) => {
  const startNumber = colIndex * 15 + 1;
  const numbers = Array.from({ length: 15 }, (_, i) => startNumber + i);

  return (
    <div className="flex flex-col items-center space-y-2">
      <h4 className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-800 text-white font-black text-xl md:text-2xl mb-1">
        {letter}
      </h4>
      {numbers.map(number => (
        <NumberCell
          key={number}
          number={number}
          isCalled={calledNumbers.has(number)}
        />
      ))}
    </div>
  );
};

/**
 * Renderiza uma grade genérica de números para modos diferentes de 75 bolas.
 */
const GenericNumbersPanel = ({ maxNumber, calledNumbers }: { maxNumber: number, calledNumbers: Set<number> }) => {
    const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
    return (
        <div className="p-4 md:p-6 bg-white rounded-2xl shadow-lg mt-6">
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-700">Painel de Números</h3>
            <div className="flex flex-wrap justify-center gap-2">
                {numbers.map(number => (
                    <NumberCell
                        key={number}
                        number={number}
                        isCalled={calledNumbers.has(number)}
                    />
                ))}
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">
                Os números em verde já foram sorteados.
            </p>
        </div>
    );
};


/**
 * Componente principal que renderiza o painel de números.
 * Escolhe entre o layout B-I-N-G-O (75 bolas) ou uma grade genérica.
 */
export const CalledNumbersTable: React.FC = () => {
  const context = useContext(GameContext);

  if (!context) return null;
  const { calledNumbers, maxNumber } = context;

  // Renderiza a grade genérica para 50 ou 90 bolas
  if (maxNumber !== 75) {
    return <GenericNumbersPanel maxNumber={maxNumber} calledNumbers={calledNumbers} />;
  }

  // Renderiza o painel B-I-N-G-O tradicional para 75 bolas
  const letters = "BINGO".split('');

  return (
    <div className="p-4 md:p-6 bg-white rounded-2xl shadow-lg mt-6">
      <h3 className="text-2xl font-bold mb-4 text-center text-gray-700">Painel de Números</h3>
      
      <div className="grid grid-cols-5 gap-1 md:gap-4 justify-items-center">
        {letters.map((letter, index) => (
          <BingoColumn
            key={letter}
            letter={letter}
            colIndex={index}
            calledNumbers={calledNumbers}
          />
        ))}
      </div>
      
      <p className="text-center text-xs text-gray-500 mt-4">
        Os números em verde já foram sorteados.
      </p>
    </div>
  );
};
