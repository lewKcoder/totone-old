import { create } from "zustand";

type State = "all" | "nature" | "artificial" | "favorite";

type FilterState = {
  filter: State;
  setFilter: (filter: State) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));
