import Board from '@features/board/ui/Board';
import { COLORS } from '@shared/const/colors';
import styled from 'styled-components';

import { useSizeStore } from '../features/board/model/useSizeStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${COLORS.Navy100};
  color: ${COLORS.White};
  font-family: 'Press Start 2P', cursive;
`;

const Title = styled.h1`
  text-transform: uppercase;
  text-shadow: 3px 3px 0px ${COLORS.Pink100};
  margin-bottom: 10px;
`;

const BoardContainer = styled.div`
  border: 4px solid ${COLORS.Pink100};
  padding: 20px;
  box-shadow: 0 0 15px ${COLORS.Pink200};
  border-radius: 10px;
`;

export default function Game() {
  const { size } = useSizeStore();
  return (
    <Container>
      <Title>Game Board</Title>
      <h4>
        Size: {size} x {size}
      </h4>
      <BoardContainer>
        <Board />
      </BoardContainer>
    </Container>
  );
}
