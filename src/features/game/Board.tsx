import { useState } from "react";
import "./board.css";

function Square({ element }: { element: SquareElement }) {
  const [isSelected, setSelected] = useState(element.isSelected);
  const [isCross, setCross] = useState(true);

  function handleSelection(): void {
    if (isSelected) {
      return;
    }

    setSelected(true);
    setCross(element.index % 2 === 0);
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
  const squares: SquareElement[] = [];
  for (let i = 0; i < 9; i++) {
    squares.push({
      index: i,
      isSelected: false,
      isCross: false,
    });
  }

  const board = squares.map((square: SquareElement) => (
    <Square key={square.index} element={square} />
  ));

  return (
    <>
      start
      <div className="board">{board}</div>
    </>
  );
}
