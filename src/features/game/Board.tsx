import { useState } from "react";
import "./board.css";

function Square({
  element,
  move,
  setMove,
}: {
  element: SquareElement;
  move: number;
  setMove: () => void;
}) {
  const [isSelected, setSelected] = useState(element.isSelected);
  const [isCross, setCross] = useState(true);

  function handleSelection(): void {
    if (isSelected) {
      return;
    }

    setSelected(true);
    setCross(move % 2 === 0);
    setMove();
  }

  const sign: string = isCross ? "X" : "O";

  return (
    <div className="square" onClick={handleSelection}>
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
  const [move, setMove] = useState(0);

  function handleClick(): void {
    setMove(move + 1);
  }

  const squares: SquareElement[] = [];
  for (let i = 0; i < 9; i++) {
    squares.push({
      index: i,
      isSelected: false,
      isCross: false,
    });
  }

  const board = squares.map((square: SquareElement) => (
    <Square
      key={square.index}
      element={square}
      move={move}
      setMove={handleClick}
    />
  ));

  return (
    <>
      <div className="board">{board}</div>
    </>
  );
}
