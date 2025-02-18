import useNavigatePage from '../shared/hooks/useNavigatePage';
import { useSizeStore } from '../features/Board/model/useSizeStore';

export default function Intro() {
  const { movePage } = useNavigatePage();
  const { size, setSize } = useSizeStore();

  const changeBoxSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(Number(event.target.value));
  };

  return (
    <div>
      <h1>Intro Page</h1>

      <div>
        <label htmlFor="size">Box Size : </label>
        <input type="number" value={size} onChange={changeBoxSize} min={1} max={100} />
      </div>

      <button onClick={() => movePage('/game')}>게임 시작하기</button>
    </div>
  );
}
