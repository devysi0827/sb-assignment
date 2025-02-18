import styled from 'styled-components';

export interface ModalProps {
  onClose: () => void;
  title: string;
  text: string;
  buttonText: string;
}

export default function Modal({ onClose, title, text, buttonText }: ModalProps) {
  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{title}</h2>
        <p>{text}</p>
        <ModalButton onClick={onClose}>{buttonText}</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
