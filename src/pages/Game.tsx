import Board from '@features/board/ui/Board';
import styled from 'styled-components';

const GameContainer = styled.div`
  text-align: center;
`;

export default function Game() {
  return (
    <GameContainer>
      <h1>Game</h1>
      <hr />
      <Board />
    </GameContainer>
  );
}
