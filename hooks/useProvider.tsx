import { createContext, ReactNode, useRef, MutableRefObject } from "react";
import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { useColorScheme } from "./useColorScheme";
import { ImageSourcePropType } from "react-native";
import { Audio } from "expo-av";

export const Context = createContext<
  | undefined
  | {
      error: string;
      status: "playing" | "pause";
      playingTrack: {
        thumbnail: ImageSourcePropType;
        label: string;
      };
      $soundRef: MutableRefObject<Audio.Sound | null>;
      setError: (param: string) => void;
      setStatus: (param: string) => void;
      setPlayingTrack: (param: {
        thumbnail: ImageSourcePropType;
        label: string;
      }) => void;
    }
>(undefined);

export const Provider: React.FC<{ value: any; children: ReactNode }> = ({
  value,
  children,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const $soundRef = useRef<Audio.Sound | null>(null);

  return (
    <Context.Provider value={{ ...value, $soundRef }}>
      <ThemeProvider value={theme}>{children}</ThemeProvider>
    </Context.Provider>
  );
};
