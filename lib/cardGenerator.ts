
import type { BingoCardData, Cell } from '../types';

function getRandomNumbersInRange(min: number, max: number, count: number): number[] {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
}

export function generateCard(id: number): BingoCardData {
  const grid: Cell[][] = Array.from({ length: 5 }, () => Array(5));

  const columns = [
    getRandomNumbersInRange(1, 15, 5),  // B
    getRandomNumbersInRange(16, 30, 5), // I
    getRandomNumbersInRange(31, 45, 4), // N (4 numbers)
    getRandomNumbersInRange(46, 60, 5), // G
    getRandomNumbersInRange(61, 75, 5), // O
  ];

  for (let j = 0; j < 5; j++) {
    for (let i = 0; i < 5; i++) {
      if (i === 2 && j === 2) { // Center cell
        grid[i][j] = { number: 0, marked: true, isFree: true };
      } else if (j === 2) { // N column
        // Need to handle the shorter N column array
        const nIndex = i < 2 ? i : i-1;
        grid[i][j] = { number: columns[j][nIndex], marked: false };
      }
      else {
        grid[i][j] = { number: columns[j][i], marked: false };
      }
    }
  }

  return { id, grid };
}
