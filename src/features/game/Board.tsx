import { useState } from "react";
import "./board.css";

function Square({
  value,
  setMove,
}: {
  value: string | null;
  setMove: () => void;
}) {
  function handleClick(): void {
    if (value) return;

    setMove();
  }

  return (
    <div className="square" onClick={handleClick}>
      {value}
    </div>
  );
}

interface SquareElement {
  index: number;
  value: string | null;
}

function calculateWinner(list: SquareElement[]): string {
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
      return squares[a].value;
    }
  }
  return "";
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
    status = `The winner is ${winner}`;
  } else if (allSelected) {
    status = "It's a draw!";
  } else {
    status = `Next move ${sign}`;
  }

  return <span>{status}</span>;
}

export default function Board() {
  const list: SquareElement[] = [];
  for (let i = 0; i < 9; i++) {
    list.push({
      index: i,
      value: null,
    });
  }

  const [move, setMove] = useState(1);
  const [isCross, setCross] = useState(true);
  const [squares, setSquares] = useState<SquareElement[]>(list);

  function handleClick(index: number): void {
    if (calculateWinner(squares)) return;

    setMove(move + 1);
    setCross(!isCross);

    const list = squares.slice();
    list[index].value = isCross ? "X" : "O";
    setSquares(list);
  }

  const board = squares.map((square: SquareElement) => (
    <Square
      key={square.index}
      value={square.value}
      setMove={() => handleClick(square.index)}
    />
  ));

  return (
    <>
      <Status squares={squares} isCross={isCross} />
      <div className="board">{board}</div>
    </>
  );
}
