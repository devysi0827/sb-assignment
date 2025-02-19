import { useEffect, useState } from 'react';

import { GameState, Square } from './board.types';

// 상하좌우
const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

// NOTE. BFS
const countAndVisitBallonCluster = (board: Square[][], size: number, index: number) => {
  const startRow = Math.floor(index / size);
  const startCol = index % size;
  const queue: [number, number][] = [[startRow, startCol]];
  let count = 1;

  board[startRow][startCol].isClicked = true;
  while (queue.length > 0) {
    const [row, col] = queue.shift()!;

    for (const [dr, dc] of DIRECTIONS) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (
        newRow >= 0 &&
        newRow < size &&
        newCol >= 0 &&
        newCol < size &&
        !board[newRow][newCol].isClicked &&
        board[newRow][newCol].hasBallon
      ) {
        board[row][col].isClicked = true;
        queue.push([newRow, newCol]);
        count += 1;
      }
    }
  }

  return count;
};

const generateAnswer = (board: Square[][], size: number): number[] => {
  const answer: number[] = [];

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (board[row][col].hasBallon && !board[row][col].isClicked) {
        const count = countAndVisitBallonCluster(board, size, row * size + col);
        answer.push(count);
      }
    }
  }

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      board[row][col].isClicked = false;
    }
  }

  return answer.sort((a, b) => b - a);
};

const generateRandomBoard = (size: number, ratio: number = 0.5): Square[][] => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      hasBallon: Math.random() < ratio,
      isClicked: false,
    }))
  );
};

export function useBoard(size: number, setGameState: (gamestate: GameState) => void) {
  const [board, setBoard] = useState<Square[][]>([]);
  const [answers, setAnswer] = useState<number[]>([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const initializeBoard = () => {
      const board = generateRandomBoard(size);
      setBoard(board);
      setAnswer(() => generateAnswer(board, size));
      setStep(0);
      setGameState('proceed');
    };

    initializeBoard();
  }, [size, setGameState]);

  const completeGame = () => setGameState('complete');
  const endGame = () => setGameState('gameover');
  const isCorrectAnswer = (count: number) => answers[step] === count;
  const progressGame = () => {
    setStep((prev) => prev + 1);

    if (step === answers.length - 1) {
      completeGame();
    }
  };

  const checkAnswer = (index: number) => {
    const count = countAndVisitBallonCluster(board, size, index);

    if (isCorrectAnswer(count)) {
      progressGame();
    } else {
      endGame();
    }
  };

  return { board, checkAnswer };
}
