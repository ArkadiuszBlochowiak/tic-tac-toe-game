import type { SquareElement } from "./types/game.ts";
import "./moves.css";

export default function Moves({ moves }: { moves: SquareElement[][] }) {
  const list = moves.map((item, index) => (
    <li key={index}>
      <List state={item} />
    </li>
  ));

  return <ol className="moves">{list}</ol>;
}

function List({ state }: { state: SquareElement[] }) {
  const listItems = state.map((element) => (
    <span key={element.index}>{element.value ?? " "},</span>
  ));

  return <div className="moves-list">{listItems}</div>;
}
