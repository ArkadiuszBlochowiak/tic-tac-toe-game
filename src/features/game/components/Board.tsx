import "../styles/board.css";
import type { SquareElement } from "../types/game.ts";
import { calculateWinner, getSign } from "../utils/gameHelpers.ts";

function Square({
  value,
  setMove,
  highlight,
}: {
  value: string | null;
  setMove: () => void;
  highlight: boolean;
}) {
  function handleClick(): void {
    if (value) return;

    setMove();
  }

  const classNames = ["square"];
  if (highlight) classNames.push("highlight");

  return (
    <div className={classNames.join(" ")} onClick={handleClick}>
      {value}
    </div>
  );
}

function Status({
  squares,
  isCross,
}: {
  squares: SquareElement[];
  isCross: boolean;
}) {
  const winner = calculateWinner(squares);
  const allSelected = squares.every((square) => Boolean(square.value));
  const sign: string = getSign(isCross);

  let status = "";
  if (winner) {
    status = `The winner is ${winner.type}`;
  } else if (allSelected) {
    status = "It's a draw!";
  } else {
    status = `Next move ${sign}`;
  }

  return <span>{status}</span>;
}

export default function Board({
  squares,
  isCross,
  onUpdate,
}: {
  squares: SquareElement[];
  isCross: boolean;
  onUpdate: (squares: SquareElement[]) => void;
}) {
  const isWinner = calculateWinner(squares);

  function handleClick(index: number): void {
    if (isWinner) return;

    const list = structuredClone(squares);
    list[index].value = getSign(isCross);
    onUpdate(list);
  }

  const board = squares.map((square: SquareElement) => (
    <Square
      key={square.index}
      value={square.value}
      setMove={() => handleClick(square.index)}
      highlight={isWinner?.sequence.includes(square.index) ?? false}
    />
  ));

  return (
    <div className="board-container">
      <Status squares={squares} isCross={isCross} />
      <div className="board">{board}</div>
    </div>
  );
}
