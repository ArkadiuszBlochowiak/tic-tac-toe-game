import "./../styles/gamesHistory.css";
import { useGameStore } from "../../../stores/gameStore.ts";
import { Link } from "react-router";

export function GamesHistory() {
  const games = useGameStore((state) => state.games);

  const list = Array.from(games.keys()).map((id) => {
    return (
      <li key={id}>
        <div className="games-history__item">
          ID: {id}
          <Link to={`/game/${id}`}>
            <button type="button">Preview</button>
          </Link>
        </div>
      </li>
    );
  });

  return (
    <div className="games-history">
      <span>Games history:</span>
      <ul>{list}</ul>
    </div>
  );
}
