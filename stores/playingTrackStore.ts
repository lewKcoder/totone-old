import { create } from "zustand";
import { ImageSourcePropType } from "react-native";

type State = {
  thumbnail: ImageSourcePropType;
  label: string;
} | null;

type PlayingTrackState = {
  playingTrack: State;
  setPlayingTrack: (playingTrack: State) => void;
};

export const usePlayingTrackStore = create<PlayingTrackState>((set) => ({
  playingTrack: null,
  setPlayingTrack: (playingTrack) => set({ playingTrack }),
}));
