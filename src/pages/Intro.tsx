import { useState } from 'react';
import styled from 'styled-components';

import { useSizeStore } from '../features/board/model/useSizeStore';
import useNavigatePage from '../shared/hooks/useNavigatePage';

const IntroContainer = styled.div`
  text-align: center;
`;

const MIN_SIZE = 1;
const MAX_SIZE = 9999;
const DEFAULT_SIZE = 5;

export default function Intro() {
  const { movePage } = useNavigatePage();
  const { setSize } = useSizeStore();
  const [text, setText] = useState(DEFAULT_SIZE.toString());

  const changeBoxSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      const numValue = Number(value);

      if (numValue >= MIN_SIZE && numValue <= MAX_SIZE) {
        setText(value);
        setSize(numValue);
      } else if (value === '') {
        setText('');
        setSize(DEFAULT_SIZE);
      }
    }
  };

  return (
    <IntroContainer>
      <h1>Intro Page</h1>

      <div>
        <label htmlFor="size">Box Size : </label>
        <input
          type="number"
          value={text}
          onChange={(e) => changeBoxSize(e)}
          min={MIN_SIZE}
          max={MAX_SIZE}
          maxLength={4}
        />
      </div>

      <button onClick={() => movePage('/game')}>게임 시작하기</button>
    </IntroContainer>
  );
}
