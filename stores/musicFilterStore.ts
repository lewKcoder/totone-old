import { Tab } from "@/constants/TabMenu";
import { create } from "zustand";

export type State = {
  key: Tab["filter"];
  label: string;
};

type musicFilterState = {
  musicFilter: State;
  setMusicFilter: (musicFilter: State) => void;
};

export const useMusicFilterStore = create<musicFilterState>((set) => ({
  musicFilter: {
    key: "all",
    label: "全て",
  },
  setMusicFilter: (musicFilter) => set({ musicFilter }),
}));
