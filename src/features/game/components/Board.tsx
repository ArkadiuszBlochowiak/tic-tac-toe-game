import "../styles/board.css";
import type { SquareElement, WinnerSequence } from "../types/game.ts";

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

function calculateWinner(list: SquareElement[]): WinnerSequence | null {
  const squares: SquareElement[] = list.slice();

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const indices of lines) {
    const [a, b, c] = indices;
    if (
      squares[a].value &&
      squares[a].value === squares[b].value &&
      squares[b].value === squares[c].value
    ) {
      return { type: squares[a].value, sequence: indices };
    }
  }
  return null;
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
  const sign: string = isCross ? "X" : "O";

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
    list[index].value = isCross ? "X" : "O";
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
    <>
      <Status squares={squares} isCross={isCross} />
      <div className="board">{board}</div>
    </>
  );
}
