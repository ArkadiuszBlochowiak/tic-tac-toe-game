import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Board from "./features/game/Board.tsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

export function Root() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
  },
  {
    path: "/game",
    Component: Board,
  },
]);

const root = document.getElementById("root");

createRoot(root!).render(<RouterProvider router={router} />);
