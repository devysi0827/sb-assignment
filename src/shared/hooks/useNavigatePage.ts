import { useNavigate } from 'react-router-dom';

// NOTE. 상황에 따라서 확장
type StateType = Record<string, unknown>;

export default function useNavigatePage() {
  const navigate = useNavigate();

  const movePage = (destination: string, state?: StateType) => {
    navigate(destination, { state });
  };

  return { movePage };
}
