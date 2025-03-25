import { create } from "zustand";

type State = {
  key: "all" | "nature" | "artificial";
  label: string;
};

type FilterState = {
  filter: State;
  setFilter: (filter: State) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  filter: {
    key: "all",
    label: "全て",
  },
  setFilter: (filter) => set({ filter }),
}));
