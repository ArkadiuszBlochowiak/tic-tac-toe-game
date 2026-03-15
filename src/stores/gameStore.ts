import { create } from "zustand";
import type { SquareElement } from "../types/game";
import { getEmptyList } from "../utils/generateList.ts";

interface GameState {
  games: Map<string, SquareElement[][]>;
  update: (id: string, moves: SquareElement[][]) => void;
  append: (id: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  games: new Map<string, SquareElement[][]>(),
  update: (id: string, moves: SquareElement[][]) => {
    set((state: GameState): Partial<GameState> => {
      const updatedGames = new Map<string, SquareElement[][]>(state.games);
      updatedGames.set(id, moves);
      return { games: updatedGames };
    });
  },
  append: (id: string) => {
    set((state: GameState): Partial<GameState> => {
      const newList = new Map<string, SquareElement[][]>(state.games);
      newList.set(id, getEmptyList());
      return { games: newList };
    });
  },
}));
