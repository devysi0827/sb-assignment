import Cell from '@entities/cell/ui/Cell';
import Modal from '@shared/components/Modal/Modal';
import useNavigatePage from '@shared/hooks/useNavigatePage';
import React, { useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import styled from 'styled-components';

import { GameState } from '../model/board.types';
import { useBoard } from '../model/useBoard';
import { useSizeStore } from '../model/useSizeStore';

interface BoardProps {
  size: number;
}

const BoardContainer = styled.div<BoardProps>`
  display: flex;
  flex-wrap: wrap;
  width: ${({ size }) => size * CELL_SIZE + 20}px;
  height: ${({ size }) => size * CELL_SIZE + 20}px;
  overflow: auto;
  gap: 0;
  margin: 0 auto;
`;

const CELL_SIZE = 37;

export default function Board() {
  const [gameState, setGameState] = useState<GameState>('proceed');

  const { size, setSize } = useSizeStore();
  const { board, checkAnswer } = useBoard(size, setGameState);
  const { movePage } = useNavigatePage();

  const MemoizedCell = React.memo(Cell);

  const moveToIntro = () => {
    movePage('/');
  };

  return (
    <>
      <BoardContainer size={size}>
        {board.length >= size && (
          <Grid
            columnCount={size}
            rowCount={size}
            columnWidth={CELL_SIZE}
            rowHeight={CELL_SIZE}
            width={size * CELL_SIZE}
            height={size * CELL_SIZE}
            outerElementType={BoardContainer}
            itemKey={({ columnIndex, rowIndex }) => rowIndex * size + columnIndex}
          >
            {({ columnIndex, rowIndex, style }) => {
              const square = board[rowIndex][columnIndex];
              const index = rowIndex * size + columnIndex;

              return (
                <div style={style}>
                  <MemoizedCell
                    key={index}
                    index={index}
                    hasBallon={square.hasBallon}
                    isClicked={square.isClicked}
                    checkAnswer={checkAnswer}
                  />
                </div>
              );
            }}
          </Grid>
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
