import Cell from '@entities/cell/ui/Cell';
import Modal from '@shared/components/Modal/Modal';
import useNavigatePage from '@shared/hooks/useNavigatePage';
import { useState } from 'react';
import styled from 'styled-components';

import { GameState } from '../model/board.types';
import { useBoard } from '../model/useBoard';
import { useSizeStore } from '../model/useSizeStore';

interface BoardProps {
  size: number;
}

const BoardContainer = styled.div<BoardProps>`
  display: grid;
  grid-template-columns: ${({ size }) => `repeat(${size}, 1fr)`};
  grid-template-rows: ${({ size }) => `repeat(${size}, 1fr)`};
  width: fit-content;
  height: fit-content;
  gap: 0;
  margin: 0 auto;
`;

export default function Board() {
  const { size, setSize } = useSizeStore();
  const [gameState, setGameState] = useState<GameState>('proceed');
  const { board, checkAnswer } = useBoard(size, setGameState);
  const { movePage } = useNavigatePage();

  const moveToIntro = () => {
    movePage('/');
  };

  return (
    <>
      <BoardContainer size={size}>
        {board.map((row, rowIndex) =>
          row.map((square, colIndex) => {
            const index = rowIndex * size + colIndex;
            return (
              <Cell
                key={index}
                index={index}
                hasBallon={square.hasBallon}
                isClicked={square.isClicked}
                checkAnswer={checkAnswer}
              />
            );
          })
        )}
      </BoardContainer>

      {gameState === 'gameover' && (
        <Modal
          onClose={moveToIntro}
          title="게임 오버"
          text={`current level : ${size}`}
          buttonText="타이틀로 돌아가기"
        />
      )}

      {gameState === 'complete' && (
        <Modal
          onClose={() => setSize(size + 1)}
          title="레벨 업"
          text={`next level : ${size + 1}`}
          buttonText="다음 스테이지로 가기"
        />
      )}
    </>
  );
}
