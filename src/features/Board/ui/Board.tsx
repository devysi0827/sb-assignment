import Cell from '@entities/Cell/ui/Cell';
import { useBoard } from '../model/useBoard';
import styled from 'styled-components';

interface BoardContainerProps {
  size: number;
}

const BoardContainer = styled.div<BoardContainerProps>`
  display: grid;
  grid-template-columns: ${({ size }) => `repeat(${size}, 1fr)`};
  grid-template-rows: ${({ size }) => `repeat(${size}, 1fr)`};
  width: fit-content;
  height: fit-content;
  gap: 0;
  margin: 0 auto;
`;

interface BoardProps {
  size: number;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Board({ size, setIsGameOver }: BoardProps) {
  const { randomBoard, ballons, checkAnswer } = useBoard(size, setIsGameOver);

  return (
    <>
      <hr />
      <BoardContainer size={size}>
        {randomBoard.map((row, rowIndex) =>
          row.map((ballon, colIndex) => {
            const index = rowIndex * size + colIndex;

            return (
              <Cell
                key={index}
                index={index}
                hasBallon={ballon}
                isClicked={ballons[rowIndex][colIndex]}
                checkAnswer={checkAnswer}
              />
            );
          })
        )}
      </BoardContainer>
    </>
  );
}
