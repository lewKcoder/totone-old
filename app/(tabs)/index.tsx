import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import SegmentControl from "@/components/ui/SegmentControl";
import { mockData } from "@/assets/mock/data";
import { screenWidth } from "@/constants/ScreenSize";
import { usePlayTrack } from "@/hooks/usePlayTrack";
import { useTrackRefStore } from "@/stores/trackRefStore";
import { useFilterStore } from "@/stores/filterStore";

export default function HomeScreen() {
  const { $track } = useTrackRefStore();
  const playTrack = usePlayTrack();
  const { filter } = useFilterStore();

  useEffect(() => {
    // fetch(API_URL)
    //   .then((response) => response.json())
    //   .then((data) => setData(data))
    //   .catch((error) => console.error(error));

    return () => {
      if ($track && $track.current) {
        $track.current.unloadAsync();
      }
    };
  }, []);

  const filteredData =
    filter.key === "all"
      ? mockData.tracks
      : mockData.tracks.filter((item) => item.category === filter.key);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <SegmentControl />

      <View>
        <ThemedText style={styles.title}>{filter.label}</ThemedText>
      </View>

      <View style={styles.cardContainer}>
        {filteredData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              playTrack({
                soundUrl: item.sound,
                playingTrack: {
                  thumbnail: item.image,
                  label: item.label,
                },
              })
            }
          >
            <View style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <ThemedText style={styles.label}>{item.label}</ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 124,
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
    rowGap: 12,
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
  label: {
    fontSize: 12,
    paddingTop: 2,
  },
});
