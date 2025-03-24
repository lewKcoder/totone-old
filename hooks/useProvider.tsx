import { createContext, useContext, ReactNode } from "react";
import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { useColorScheme } from "./useColorScheme";
import { ImageSourcePropType } from "react-native";

export const Context = createContext<
  | undefined
  | {
      error: string;
      status: "playing" | "pause";
      playingTrack: {
        thumbnail: ImageSourcePropType;
        label: string;
      };
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

  return (
    <Context.Provider value={value}>
      <ThemeProvider value={theme}>{children}</ThemeProvider>
    </Context.Provider>
  );
};
