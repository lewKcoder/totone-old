import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useContext, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { ThemedText } from "@/components/ThemedText";
import SegmentControl from "@/components/ui/SegmentControl";
import { mockData } from "@/assets/mock/data";
import { Entypo } from "@expo/vector-icons";
import { Context } from "@/hooks/useProvider";
import { screenWidth } from "@/constants/ScreenWidth";
import { useTrackManager } from "@/hooks/useTrackManager";

export default function HomeScreen() {
  const value = useContext(Context);
  const trackManager = useTrackManager();

  if (!value || !trackManager) {
    return null;
  }

  const { playTrack, pauseTrack, resumeTrack } = trackManager;
  const { status, playingTrack } = value;

  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    // fetch(API_URL)
    //   .then((response) => response.json())
    //   .then((data) => setData(data))
    //   .catch((error) => console.error(error));

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <SegmentControl lightColor="#4E5D74" darkColor="#ffffff" />

      <View>
        <ThemedText style={styles.title}>環境音</ThemedText>
      </View>

      <View style={styles.cardContainer}>
        {mockData.tracks.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              playTrack(item.sound, soundRef, {
                thumbnail: item.image,
                label: item.label,
              })
            }
          >
            <View style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <ThemedText>{item.label}</ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.modal}>
        <View style={styles.label}>
          <Image source={playingTrack?.thumbnail} style={styles.thumbnail} />
          <ThemedText>{playingTrack?.label}</ThemedText>
        </View>

        <View style={{ width: 24, height: 24 }}>
          {status === "playing" && (
            <TouchableOpacity onPress={() => pauseTrack(soundRef)}>
              <Entypo name={"controller-paus"} size={24} color={"white"} />
            </TouchableOpacity>
          )}

          {status === "pause" && (
            <TouchableOpacity onPress={() => resumeTrack(soundRef)}>
              <Entypo name={"controller-play"} size={24} color={"white"} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 14,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
  card: {
    width: screenWidth / 3 - 24,
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 16,
  },
  modal: {
    position: "absolute",
    width: screenWidth - 32,
    backgroundColor: "grey",
    bottom: -100,
    left: 16,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
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
