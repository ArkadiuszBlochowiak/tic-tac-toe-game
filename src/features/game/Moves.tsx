import type { SquareElement } from "./types/game.ts";
import "./moves.css";

export default function Moves({
  moves,
  onUpdate,
}: {
  moves: SquareElement[][];
  onUpdate: (step: number) => void;
}) {
  const list = moves.map((_item, index) => (
    <li key={index}>
      <List step={index} changeStep={() => onUpdate(index)} />
    </li>
  ));

  return <ol className="moves">{list}</ol>;
}

function List({ step, changeStep }: { step: number; changeStep: () => void }) {
  const label = step ? `Go to move #${step}` : "Go to game start";

  return (
    <button type="button" className="moves-item" onClick={changeStep}>
      {label}
    </button>
  );
}
