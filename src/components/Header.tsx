import "./header.css";
import { Link } from "react-router";

export default function Header() {
  return (
    <div className="header">
      <div className="header__logo">place for logo</div>
      <h2 className="header__title">
        <Link to={"/"}> Tac Toe Game </Link>
      </h2>
      {/* place for dark/light mode switch */}
    </div>
  );
}
