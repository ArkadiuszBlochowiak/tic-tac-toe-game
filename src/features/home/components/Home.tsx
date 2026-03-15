import { useState } from "react";
import { useGameStore } from "../../../stores/gameStore.ts";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router";

export default function Home() {
  const [count, setCount] = useState(0);
  const games = useGameStore((state) => state.games);
  const addGame = useGameStore((state) => state.append);
  const navigate = useNavigate();

  console.log(games);

  const startGame = async () => {
    const id = uuid();
    addGame(id);
    await navigate(`/game/${id}`);
  };

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button type={"button"} onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div className="card">
        <button type="button" onClick={startGame}>
          Play game
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
