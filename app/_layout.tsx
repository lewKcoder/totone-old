import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "@/hooks/useProvider";
import { Header } from "@/components/ui/Header";
import { useInitScreen } from "@/hooks/useInitScreen";
import { usePlayerStore } from "@/stores/playerStore";
import { useEffect, useRef } from "react";
import { Audio } from "expo-av";
import TrackToast from "@/components/ui/TrackToast";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePathname } from "expo-router";
import { usePauseTrack } from "@/hooks/usePauseTrack";
import { ThemedView } from "@/components/ThemedView";

export default function RootLayout() {
  useInitScreen();
  const { status, setTrackRef } = usePlayerStore();
  const pathname = usePathname();
  const pauseTrack = usePauseTrack();

  const $track = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    if ($track === null) {
      return;
    }

    setTrackRef($track);
  }, []);

  useEffect(() => {
    if (pathname === "/plan" || pathname === "/contact") {
      pauseTrack();
    }
  }, [pathname]);

  return (
    <Provider>
      <ThemedView useAppBackground style={{ flex: 1 }}>
        <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: true,
                header: () => <Header />,
              }}
            />

            <Stack.Screen name="plan" options={{ headerShown: false }} />

            <Stack.Screen name="contact" options={{ headerShown: false }} />

            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaView>

        {!(pathname === "/plan" || pathname === "/contact") && status && (
          <TrackToast />
        )}

        <StatusBar style="auto" />
      </ThemedView>
    </Provider>
  );
}
