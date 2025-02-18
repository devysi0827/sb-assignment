import { useState } from 'react';

const DIRECTIONS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const bfs = (
  board: boolean[][],
  size: number,
  startRow: number,
  startCol: number,
  visited: boolean[][]
) => {
  const newVisited = visited.map((row) => [...row]);
  const queue: [number, number][] = [[startRow, startCol]];
  newVisited[startRow][startCol] = true;
  let count = 1;

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
        !newVisited[newRow][newCol] &&
        board[newRow][newCol]
      ) {
        newVisited[newRow][newCol] = true;
        queue.push([newRow, newCol]);
        count++;
      }
    }
  }

  return { count, visited: newVisited };
};

const generateAnswer = (board: boolean[][], size: number): number[] => {
  let visited: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
  const answer: number[] = [];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] && !visited[row][col]) {
        const groupSize = bfs(board, size, row, col, visited);
        visited = groupSize.visited;
        answer.push(groupSize.count);
      }
    }
  }

  return answer.sort((a, b) => b - a);
};

const generateRandomBoard = (size: number, ratio: number = 0.5): boolean[][] => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => Math.random() < ratio)
  );
};

export function useBoard(size: number, setIsGameOver: (gameOver: boolean) => void) {
  const [randomBoard] = useState(() => generateRandomBoard(size));
  const [answers] = useState(() => generateAnswer(randomBoard, size));
  const [ballons, setBallons] = useState<boolean[][]>(generateRandomBoard(size, 0));
  const [cnt, setCnt] = useState(0);

  const checkAnswer = (index: number) => {
    const userAnswer = bfs(randomBoard, size, Math.floor(index / size), index % size, ballons);
    if (answers[cnt] === userAnswer.count) {
      setCnt((prev) => prev + 1);
      setBallons(userAnswer.visited);
    } else {
      setIsGameOver(true);
    }
  };

  return { randomBoard, ballons, checkAnswer };
}
