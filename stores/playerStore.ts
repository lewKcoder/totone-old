import { Audio } from "expo-av";
import { MutableRefObject } from "react";
import { create } from "zustand";

type PlayerStatus = "playing" | "pause" | null;

type State = {
  status: PlayerStatus;
  $track: MutableRefObject<Audio.Sound | null> | null;
  setStatus: (status: PlayerStatus) => void;
  setTrackRef: ($track: MutableRefObject<Audio.Sound | null> | null) => void;
};

export const usePlayerStore = create<State>((set) => ({
  status: null,
  $track: null,
  setStatus: (status) => set({ status }),
  setTrackRef: ($track) => set({ $track }),
}));
