import { useState } from "react";
import "./board.css";

function Square({
  isSelected,
  isCross,
  setMove,
}: {
  isSelected: boolean;
  isCross: boolean;
  setMove: () => void;
}) {
  const sign: string = isCross ? "X" : "O";

  function handleClick(): void {
    if (!isSelected) {
      setMove();
    }
  }

  return (
    <div className="square" onClick={handleClick}>
      {isSelected ? sign : ""}
    </div>
  );
}

interface SquareElement {
  index: number;
  isSelected: boolean;
  isCross: boolean;
}

export default function Board() {
  const list: SquareElement[] = [];
  for (let i = 0; i < 9; i++) {
    list.push({
      index: i,
      isSelected: false,
      isCross: false,
    });
  }

  const [move, setMove] = useState(1);
  const [isCross, setCross] = useState(true);
  const [squares, setSquares] = useState<SquareElement[]>(list);

  function handleClick(index: number): void {
    setMove(move + 1);
    setCross(move % 2 === 0);

    const list = squares.slice();
    list[index].isSelected = true;
    list[index].isCross = isCross;
    setSquares(list);
  }

  const board = squares.map((square: SquareElement) => (
    <Square
      key={square.index}
      isSelected={square.isSelected}
      isCross={square.isCross}
      setMove={() => handleClick(square.index)}
    />
  ));

  return (
    <>
      <div className="board">{board}</div>
    </>
  );
}
