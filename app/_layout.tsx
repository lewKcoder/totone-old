import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { ImageSourcePropType } from "react-native";
import { Provider } from "@/hooks/useProvider";
import { Header } from "@/components/ui/Header";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [error, setError] = useState<null | string>(null);
  const [status, setStatus] = useState<null | "playing" | "pause">(null);
  const [playingTrack, setPlayingTrack] = useState<null | {
    thumbnail: ImageSourcePropType;
    label: string;
  }>(null);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider
      value={{
        error,
        status,
        playingTrack,
        setError,
        setStatus,
        setPlayingTrack,
      }}
    >
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            header: () => <Header />,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </Provider>
  );
}
