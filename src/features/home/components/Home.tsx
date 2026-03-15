import "../styles/home.css";
import { useGameStore } from "../../../stores/gameStore.ts";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router";
import { GamesHistory } from "./GamesHistory.tsx";

export default function Home() {
  const addGame = useGameStore((state) => state.append);
  const navigate = useNavigate();

  const startGame = async () => {
    const id = uuid();
    addGame(id);
    await navigate(`/game/${id}`);
  };

  return (
    <>
      <div className="play-button">
        <button type="button" onClick={startGame}>
          Play game
        </button>
      </div>
      <GamesHistory />
    </>
  );
}
