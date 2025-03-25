import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { screenWidth } from "@/constants/ScreenSize";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BlurView } from "expo-blur";
import { usePlayingTrackStore } from "@/stores/playingTrackStore";
import { usePauseTrack } from "@/hooks/usePauseTrack";
import { useResumeTrack } from "@/hooks/useResumeTrack";
import { useStatusStore } from "@/stores/statusStore";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorSchemeStore } from "@/stores/colorSchemeStore";

export default function TrackToast() {
  const { colorScheme } = useColorSchemeStore();
  const iconTheme = useThemeColor("tabIconDefault");
  const { status } = useStatusStore();
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
        style={styles.content}
      >
        <View style={styles.track}>
          <Image source={playingTrack?.thumbnail} style={styles.thumbnail} />
          <ThemedText>{playingTrack?.label}</ThemedText>
        </View>

        <View
          style={{
            width: 32,
            height: 32,
            borderColor: iconTheme,
            borderWidth: 2,
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {status === "playing" && (
            <TouchableOpacity onPress={() => pauseTrack()}>
              <Entypo name={"controller-paus"} size={20} color={iconTheme} />
            </TouchableOpacity>
          )}

          {status === "pause" && (
            <TouchableOpacity onPress={() => resumeTrack()}>
              <Entypo name={"controller-play"} size={24} color={iconTheme} />
            </TouchableOpacity>
          )}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    position: "absolute",
    left: 16,
    zIndex: 1,
    overflow: "hidden",
  },
  content: {
    width: screenWidth - 32,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24,
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
});
