import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
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
]);

const root = document.getElementById("root");

createRoot(root!).render(<RouterProvider router={router} />);
