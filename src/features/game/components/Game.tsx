import { useState } from "react";
import "../styles/game.css";
import Board from "./Board.tsx";
import type { SquareElement } from "../types/game.ts";
import Moves from "./Moves.tsx";
import { Link } from "react-router";
import { calculateWinner } from "../utils/calculateWinner.ts";

function AfterGameActions({
  squares,
  resetState,
}: {
  squares: SquareElement[];
  resetState: () => void;
}) {
  const allSelected = squares.every((square) => Boolean(square.value));
  const shouldShowActions = Boolean(calculateWinner(squares)) || allSelected;

  const actions = (
    <div className="actions">
      <button type="button" onClick={resetState}>
        Play again
      </button>
      <Link to="/">
        <button type="button">Return to home page</button>
      </Link>
    </div>
  );

  return <div>{shouldShowActions && actions}</div>;
}

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

  function handleReset(): void {
    setCurrentMove(0);
    setHistory([list]);
    setCross(true);
  }

  return (
    <>
      <div className="game">
        <Board squares={currentStep} isCross={isCross} onUpdate={handleMove} />
        <Moves moves={history} onUpdate={handleCurrentStep} />
      </div>
      <div className="game-actions">
        <AfterGameActions squares={currentStep} resetState={handleReset} />
      </div>
    </>
  );
}
