import { useState } from "react";
import "./game.css";
import Board from "./Board.tsx";
import type { SquareElement } from "./types/game.ts";

export default function Game() {
  const list: SquareElement[] = [];
  for (let i = 0; i < 9; i++) {
    list.push({
      index: i,
      value: null,
    });
  }

  const [isCross, setCross] = useState(true);
  const [history, setHistory] = useState<SquareElement[][]>([list]);
  const currentSquares = history[history.length - 1];

  function handleClick(squares: SquareElement[]): void {
    setCross(!isCross);
    setHistory([...history, squares]);
  }

  return (
    <div className="game">
      <Board
        squares={currentSquares}
        isCross={isCross}
        onUpdate={handleClick}
      />
    </div>
  );
}
