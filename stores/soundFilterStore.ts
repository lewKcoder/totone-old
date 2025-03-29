import { Tab } from "@/constants/TabMenu";
import { create } from "zustand";

export type State = {
  key: Tab["filter"];
  label: string;
};

type SoundFilterState = {
  soundFilter: State;
  setSoundFilter: (soundFilter: State) => void;
};

export const useSoundFilterStore = create<SoundFilterState>((set) => ({
  soundFilter: {
    key: "all",
    label: "全て",
  },
  setSoundFilter: (soundFilter) => set({ soundFilter }),
}));
