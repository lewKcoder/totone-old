import { Tab } from "@/constants/TabMenu";
import { create } from "zustand";

export type FilterState = {
  key: Tab["filter"];
  label: string;
};

type FilterStore = {
  soundFilter: FilterState;
  musicFilter: FilterState;
  setSoundFilter: (soundFilter: FilterState) => void;
  setMusicFilter: (musicFilter: FilterState) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  soundFilter: {
    key: "all",
    label: "全て",
  },
  musicFilter: {
    key: "all",
    label: "全て",
  },
  setSoundFilter: (soundFilter) => set({ soundFilter }),
  setMusicFilter: (musicFilter) => set({ musicFilter }),
}));
