import { create } from "zustand";

type State = "light" | "dark" | null | undefined;

type ColorSchemeState = {
  colorScheme: State;
  setColorScheme: (colorScheme: State) => void;
};

export const useColorSchemeStore = create<ColorSchemeState>((set) => ({
  colorScheme: null,
  setColorScheme: (colorScheme) => set({ colorScheme }),
}));
