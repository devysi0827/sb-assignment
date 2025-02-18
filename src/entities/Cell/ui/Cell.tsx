import styled from 'styled-components';

interface CellWrapperProps {
  $hasBallon: boolean;
  $isClicked: boolean;
}

const CellWrapper = styled.div<CellWrapperProps>`
  width: 25px;
  height: 25px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.$isClicked ? '#ffeb3b' : '#fff')};

  img {
    width: 30px;
    height: 30px;
    display: ${(props) => (props.$hasBallon ? 'block' : 'none')};
  }

  &:hover {
    background-color: ${(props) => (props.$hasBallon && !props.$isClicked ? '#f0f0f0' : '')};
  }
`;

interface CellProps {
  hasBallon: boolean;
  checkAnswer: (index: number) => void;
  index: number;
  isClicked: boolean;
}

export default function Cell({ hasBallon, checkAnswer, index, isClicked }: CellProps) {
  const handleClick = () => {
    if (hasBallon && !isClicked) {
      checkAnswer(index);
    }
  };

  return (
    <CellWrapper $hasBallon={hasBallon} $isClicked={isClicked} onClick={handleClick}>
      {hasBallon && <p>1</p>}
    </CellWrapper>
  );
}
