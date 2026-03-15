import { useState } from "react";
import "../styles/game.css";
import Board from "./Board.tsx";
import type { SquareElement } from "../types/game.ts";
import Moves from "./Moves.tsx";
import { Link, useNavigate } from "react-router";
import { doesGameEnded } from "../utils/gameHelpers.ts";
import { useParams } from "react-router";
import { useGameStore } from "../../../stores/gameStore.ts";
import { useShallow } from "zustand/react/shallow";
import { v4 as uuid } from "uuid";

function GameActions({
  squares,
  resetState,
}: {
  squares: SquareElement[];
  resetState: () => void;
}) {
  const shouldShowActions = doesGameEnded(squares);

  const actions = (
    <div>
      <hr />
      <div className="game-actions__buttons">
        <button type="button" onClick={resetState}>
          Play again
        </button>
        <Link to="/">
          <button type="button">Return to home page</button>
        </Link>
      </div>
    </div>
  );

  return shouldShowActions && actions;
}

export default function Game() {
  const params = useParams();
  const id: string = params.id ?? "";
  const { games, updateGame, addGame } = useGameStore(
    useShallow((state) => ({
      games: state.games,
      updateGame: state.update,
      addGame: state.append,
    })),
  );
  const navigate = useNavigate();

  const list: SquareElement[] = [];
  for (let i = 0; i < 9; i++) {
    list.push({
      index: i,
      value: null,
    });
  }

  const game = games.get(id) ?? [list];

  const [isCross, setCross] = useState(true);
  const [history, setHistory] = useState<SquareElement[][]>(game);
  const [currentMove, setCurrentMove] = useState(0);
  const currentStep = history[currentMove];

  function handleMove(squares: SquareElement[]): void {
    const newHistory = [...history.splice(0, currentMove + 1), squares];
    setCross(!isCross);
    setHistory(newHistory);
    updateGame(id, newHistory);
    setCurrentMove(newHistory.length - 1);
  }

  function handleCurrentStep(step: number): void {
    setCurrentMove(step);
    setCross(step % 2 === 0);
  }

  async function handleReset(): Promise<void> {
    const id = uuid();

    addGame(id);
    setCurrentMove(0);
    setHistory(games.get(id) ?? [list]);
    setCross(true);

    await navigate(`/game/${id}`);
  }

  return (
    <>
      <div className="game">
        <Board squares={currentStep} isCross={isCross} onUpdate={handleMove} />
        <Moves moves={history} onUpdate={handleCurrentStep} />
      </div>
      <GameActions squares={currentStep} resetState={handleReset} />
    </>
  );
}
