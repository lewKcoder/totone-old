import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import "react-native-reanimated";
import { ImageSourcePropType } from "react-native";
import { Provider } from "@/hooks/useProvider";
import { Header } from "@/components/ui/Header";
import { useInitScreen } from "@/hooks/useInitScreen";
import { Modal } from "@/components/ui/Modal";

export default function RootLayout() {
  useInitScreen();

  const [error, setError] = useState<null | string>(null);
  const [status, setStatus] = useState<null | "playing" | "pause">(null);
  const [playingTrack, setPlayingTrack] = useState<null | {
    thumbnail: ImageSourcePropType;
    label: string;
  }>(null);

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

      {status && <Modal />}

      <StatusBar style="auto" />
    </Provider>
  );
}
