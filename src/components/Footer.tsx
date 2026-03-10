import "./footer.css";
import viteLogo from "/vite.svg?url";
import reactLogo from "../assets/react.svg";

export default function Footer() {
  return (
    <div className="footer">
      <p>Powered by: </p>
      <a
        href="https://vite.dev"
        target="_blank"
        rel="noreferrer"
        className="link"
      >
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a
        href="https://react.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="link"
      >
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  );
}
