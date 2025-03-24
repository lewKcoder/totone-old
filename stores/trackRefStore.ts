import { Audio } from "expo-av";
import { MutableRefObject } from "react";
import { create } from "zustand";

type State = MutableRefObject<Audio.Sound | null> | null;

type trackRefState = {
  $track: State;
  setTrackRef: (status: State) => void;
};

export const useTrackRefStore = create<trackRefState>((set) => ({
  $track: null,
  setTrackRef: ($track) => set({ $track }),
}));
