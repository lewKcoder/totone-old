import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { screenWidth } from "@/constants/ScreenWidth";
import { useColorScheme } from "@/hooks/useColorScheme";
import { BlurView } from "expo-blur";
import { usePlayingTrackStore } from "@/stores/playingTrackStore";
import { usePauseTrack } from "@/hooks/usePauseTrack";
import { useResumeTrack } from "@/hooks/useResumeTrack";
import { useStatusStore } from "@/stores/statusStore";

export const Modal = () => {
  const theme = useColorScheme();
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
        intensity={56}
        tint={theme as "dark" | "light"}
        style={styles.content}
      >
        <View style={styles.track}>
          <Image source={playingTrack?.thumbnail} style={styles.thumbnail} />
          <ThemedText>{playingTrack?.label}</ThemedText>
        </View>

        <View style={{ width: 24, height: 24 }}>
          {status === "playing" && (
            <TouchableOpacity onPress={() => pauseTrack()}>
              <Entypo name={"controller-paus"} size={24} color={"white"} />
            </TouchableOpacity>
          )}

          {status === "pause" && (
            <TouchableOpacity onPress={() => resumeTrack()}>
              <Entypo name={"controller-play"} size={24} color={"white"} />
            </TouchableOpacity>
          )}
        </View>
      </BlurView>
    </View>
  );
};

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
