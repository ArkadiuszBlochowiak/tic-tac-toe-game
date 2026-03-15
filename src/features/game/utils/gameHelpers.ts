import type { SquareElement, WinnerSequence } from "../types/game.ts";

export function calculateWinner(list: SquareElement[]): WinnerSequence | null {
  const squares: SquareElement[] = list.slice();

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const indices of lines) {
    const [a, b, c] = indices;
    if (
      squares[a].value &&
      squares[a].value === squares[b].value &&
      squares[b].value === squares[c].value
    ) {
      return { type: squares[a].value, sequence: indices };
    }
  }
  return null;
}

export function doesGameEnded(list: SquareElement[]): boolean {
  const allSelected = list.every((square) => Boolean(square.value));

  return Boolean(calculateWinner(list)) || allSelected;
}

export function getSign(isCross: boolean) {
  return isCross ? "X" : "O";
}
