import type { SquareElement } from "../types/game";

export function getEmptyList(): SquareElement[][] {
  const list: SquareElement[] = [];
  for (let i = 0; i < 9; i++) {
    list.push({
      index: i,
      value: null,
    });
  }
  return [list];
}
