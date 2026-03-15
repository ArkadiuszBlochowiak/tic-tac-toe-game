import "./header.css";
import { Link } from "react-router";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <img className="logo" src={logo} alt="game logo" />
      </div>
      <h2 className="header__title">
        <Link to={"/"}> Tic Tac Toe Game </Link>
      </h2>
      {/* place for dark/light mode switch */}
    </div>
  );
}
