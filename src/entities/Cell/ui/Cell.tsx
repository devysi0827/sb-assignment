import ballonImg from '@shared/assets/ballon.png';
import { COLORS } from '@shared/const/colors';
import styled from 'styled-components';

interface CellWrapperProps {
  $hasBallon: boolean;
  $isClicked: boolean;
}

const CellWrapper = styled.div<CellWrapperProps>`
  width: 25px;
  height: 25px;
  padding: 5px;
  border: 1px solid ${COLORS.gray200};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => props.$hasBallon && !props.$isClicked && 'pointer'};
  background-color: ${(props) => (props.$isClicked ? COLORS.yellow100 : COLORS.white)};

  img {
    width: 25px;
    height: 25px;
  }

  &:hover {
    background-color: ${(props) => props.$hasBallon && !props.$isClicked && COLORS.gray100};
  }
`;

interface CellProps {
  index: number;
  hasBallon: boolean;
  isClicked: boolean;
  checkAnswer: (index: number) => void;
}

export default function Cell({ index, hasBallon, isClicked, checkAnswer }: CellProps) {
  const isClickable = () => {
    return hasBallon && !isClicked;
  };

  const clickHandler = () => {
    if (isClickable()) {
      checkAnswer(index);
    }
  };

  return (
    <CellWrapper $hasBallon={hasBallon} $isClicked={isClicked} onClick={clickHandler}>
      {hasBallon && <img src={ballonImg} alt="풍선" />}
    </CellWrapper>
  );
}
