import { useState } from 'react';
import styled from 'styled-components';
import { useSizeStore } from '@features/Board/model/useSizeStore';
import Modal from '@shared/components/Modal/Modal';
import useNavigatePage from '@shared/hooks/useNavigatePage';
import Board from '@features/Board/ui/Board';

export default function Game() {
  const { movePage } = useNavigatePage();
  const { size } = useSizeStore();
  const [score] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const moveToIntro = () => {
    movePage('/');
  };

  return (
    <GameContainer>
      <h1>Game</h1>
      <h4>Score : {score}</h4>
      <h4>Size : {size}</h4>

      <Board size={size} setIsGameOver={setIsGameOver} />

      {isGameOver && (
        <Modal
          onClose={moveToIntro}
          title="게임 오버"
          text={`score : ${score}`}
          buttonText="타이틀로 돌아가기"
        />
      )}
    </GameContainer>
  );
}

const GameContainer = styled.div`
  text-align: center;
`;
