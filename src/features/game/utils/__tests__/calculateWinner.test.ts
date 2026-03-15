import { describe, it, expect } from "vitest";
import { calculateWinner } from "../gameHelpers.ts";
import type { SquareElement, WinnerSequence } from "../../types/winner.ts";

describe("calculateWinner", () => {
  it("should return X as winner", () => {
    const state: SquareElement[] = [
      { index: 0, value: "x" },
      { index: 1, value: "o" },
      { index: 2, value: null },
      { index: 3, value: "x" },
      { index: 4, value: "o" },
      { index: 5, value: null },
      { index: 6, value: "x" },
      { index: 7, value: null },
      { index: 8, value: null },
    ];

    expect(calculateWinner(state)).toEqual({
      type: "x",
      sequence: [0, 3, 6],
    } satisfies WinnerSequence);
  });

  it("should return O as winner", () => {
    const state: SquareElement[] = [
      { index: 0, value: "x" },
      { index: 1, value: "o" },
      { index: 2, value: "x" },
      { index: 3, value: null },
      { index: 4, value: "o" },
      { index: 5, value: "x" },
      { index: 6, value: "x" },
      { index: 7, value: "o" },
      { index: 8, value: "o" },
    ];

    expect(calculateWinner(state)).toEqual({
      type: "o",
      sequence: [1, 4, 7],
    } satisfies WinnerSequence);
  });

  it("should return null as there is no winner", () => {
    const state: SquareElement[] = [
      { index: 0, value: "x" },
      { index: 1, value: "o" },
      { index: 2, value: "x" },
      { index: 3, value: "x" },
      { index: 4, value: "o" },
      { index: 5, value: "x" },
      { index: 6, value: "o" },
      { index: 7, value: "x" },
      { index: 8, value: "o" },
    ];

    expect(calculateWinner(state)).toEqual(null);
  });
});
