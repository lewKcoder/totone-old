import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "@/hooks/useProvider";
import { Header } from "@/components/ui/Header";
import { useInitScreen } from "@/hooks/useInitScreen";
import { useStatusStore } from "@/stores/statusStore";
import { useTrackRefStore } from "@/stores/trackRefStore";
import { useEffect, useRef } from "react";
import { Audio } from "expo-av";
import TrackToast from "@/components/ui/TrackToast";

export default function RootLayout() {
  useInitScreen();
  const { status } = useStatusStore();
  const { setTrackRef } = useTrackRefStore();

  const $track = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    if ($track === null) {
      return;
    }

    setTrackRef($track);
  }, []);

  return (
    <Provider>
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

      {status && <TrackToast />}

      <StatusBar style="auto" />
    </Provider>
  );
}
