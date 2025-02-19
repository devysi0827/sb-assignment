import { useEffect, useState } from 'react';

import { GameState, Square } from './board.types';

// 상하좌우
const DIRECTIONS = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

const countAndVisitBallonCluster = (board: Square[][], size: number, index: number) => {
  const startRow = Math.floor(index / size);
  const startCol = index % size;
  const newBoard = board.map((row) => row.map((square) => ({ ...square })));
  const queue: [number, number][] = [[startRow, startCol]];
  let count = 1;

  newBoard[startRow][startCol].isClicked = true;

  // NOTE. BFS 로직
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
        !newBoard[newRow][newCol].isClicked &&
        newBoard[newRow][newCol].hasBallon
      ) {
        newBoard[newRow][newCol].isClicked = true;
        queue.push([newRow, newCol]);
        count += 1;
      }
    }
  }

  return { newBoard, count };
};

const generateAnswer = (board: Square[][], size: number): number[] => {
  let copyBoard = board.map((row) => row.map((square) => ({ ...square })));
  const answer: number[] = [];

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (copyBoard[row][col].hasBallon && !copyBoard[row][col].isClicked) {
        const { count, newBoard } = countAndVisitBallonCluster(copyBoard, size, row * size + col);
        copyBoard = newBoard;
        answer.push(count);
      }
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
  const progressGame = (newBoard: Square[][]) => {
    setStep((prev) => prev + 1);
    setBoard(newBoard);

    if (step === answers.length - 1) {
      completeGame();
    }
  };

  const checkAnswer = (index: number) => {
    const { count, newBoard } = countAndVisitBallonCluster(board, size, index);

    if (isCorrectAnswer(count)) {
      progressGame(newBoard);
    } else {
      endGame();
    }
  };

  return { board, checkAnswer };
}
