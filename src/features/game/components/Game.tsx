import { useState } from "react";
import "../styles/game.css";
import Board from "./Board.tsx";
import type { SquareElement } from "../types/game.ts";
import Moves from "./Moves.tsx";

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
  const [currentMove, setCurrentMove] = useState(0);
  const currentStep = history[currentMove];

  function handleMove(squares: SquareElement[]): void {
    const newHistory = [...history.splice(0, currentMove + 1), squares];
    setCross(!isCross);
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  }

  function handleCurrentStep(step: number): void {
    setCurrentMove(step);
    setCross(step % 2 === 0);
  }

  return (
    <div className="game">
      <Board squares={currentStep} isCross={isCross} onUpdate={handleMove} />
      <Moves moves={history} onUpdate={handleCurrentStep} />
    </div>
  );
}
