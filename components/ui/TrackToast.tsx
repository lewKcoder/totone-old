import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { screenWidth } from "@/constants/ScreenSize";
import { BlurView } from "expo-blur";
import { usePlayingTrackStore } from "@/stores/playingTrackStore";
import { usePauseTrack } from "@/hooks/usePauseTrack";
import { useResumeTrack } from "@/hooks/useResumeTrack";
import { usePlayerStore } from "@/stores/playerStore";
import { useColorSchemeStore } from "@/stores/colorSchemeStore";
import Icon from "../Icon";

export default function TrackToast() {
  const { colorScheme } = useColorSchemeStore();
  const { status } = usePlayerStore();
  const { playingTrack } = usePlayingTrackStore();
  const pauseTrack = usePauseTrack();
  const resumeTrack = useResumeTrack();

  return (
    <View
      style={[
        styles.container,
        {
          bottom: Platform.OS === "ios" ? 90 : 57,
        },
      ]}
    >
      <BlurView
        intensity={80}
        tint={colorScheme as "dark" | "light"}
        style={[
          styles.content,
          {
            backgroundColor:
              colorScheme === "light"
                ? "rgba(249, 249, 249, 0.68)"
                : "rgba(25, 25, 25, 0.68)",
          },
        ]}
      >
        <View style={styles.track}>
          <Image source={playingTrack?.thumbnail} style={styles.thumbnail} />
          <ThemedText style={styles.label}>{playingTrack?.label}</ThemedText>
        </View>

        {status === "playing" && (
          <TouchableOpacity onPress={() => pauseTrack()}>
            <Icon name="pause" size={32} />
          </TouchableOpacity>
        )}

        {status === "pause" && (
          <TouchableOpacity onPress={() => resumeTrack()}>
            <Icon name="play" size={32} />
          </TouchableOpacity>
        )}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    position: "absolute",
    left: 8,
    zIndex: 1,
    overflow: "hidden",
  },
  content: {
    width: screenWidth - 16,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  track: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  label: {
    fontSize: 12,
  },
});
