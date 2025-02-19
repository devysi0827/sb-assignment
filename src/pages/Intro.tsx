import { COLORS } from '@shared/const/colors';
import { useState } from 'react';
import styled from 'styled-components';

import { useSizeStore } from '../features/board/model/useSizeStore';
import useNavigatePage from '../shared/hooks/useNavigatePage';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 24px;
`;

const LevelContainer = styled.div`
  margin-bottom: 20px;
  font-size: 1.2rem;
`;

const LevelInput = styled.input`
  width: 60px;
  padding: 6px;
  font-size: 1rem;
  text-align: center;
  margin-left: 8px;
  border: 1px solid ${COLORS.Gray200};
  border-radius: 4px;
`;

const StartButton = styled.button`
  background-color: ${COLORS.Blue100};
  color: ${COLORS.White};
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.2rem;
  transition: background-color 0.3s;
  border: none;

  &:hover {
    background-color: ${COLORS.Blue200};
  }
`;

const MIN_LEVEL = 1;
const MAX_LEVEL = 9999;
const DEFAULT_LEVEL = 5;

export default function Intro() {
  const { movePage } = useNavigatePage();
  const { setSize } = useSizeStore();
  const [level, setLevel] = useState(DEFAULT_LEVEL.toString());

  const changeLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      const numValue = Number(value);

      if (numValue >= MIN_LEVEL && numValue <= MAX_LEVEL) {
        setLevel(value);
        setSize(numValue);
      } else if (value === '') {
        setLevel('');
        setSize(DEFAULT_LEVEL);
      }
    }
  };

  return (
    <Container>
      <Title>SuperBlock Assignment Game!</Title>
      <Description>준비가 되셨나요? 게임을 시작해보세요.</Description>

      <LevelContainer>
        <label htmlFor="level">Select Level: </label>
        <LevelInput
          type="number"
          id="level"
          value={level}
          onChange={changeLevel}
          min={MIN_LEVEL}
          max={MAX_LEVEL}
        />
      </LevelContainer>

      <StartButton onClick={() => movePage('/game')}>Start Game</StartButton>
    </Container>
  );
}
