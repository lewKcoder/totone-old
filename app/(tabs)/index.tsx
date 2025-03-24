import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useContext, useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import SegmentControl from "@/components/ui/SegmentControl";
import { mockData } from "@/assets/mock/data";
import { screenWidth } from "@/constants/ScreenWidth";
import { useTrackManager } from "@/hooks/useTrackManager";
import { Context } from "@/hooks/useProvider";

export default function HomeScreen() {
  const value = useContext(Context);
  const trackManager = useTrackManager();

  if (!value || !trackManager) {
    return null;
  }

  const { playTrack } = trackManager;
  const { $soundRef } = value;

  useEffect(() => {
    // fetch(API_URL)
    //   .then((response) => response.json())
    //   .then((data) => setData(data))
    //   .catch((error) => console.error(error));

    return () => {
      if ($soundRef.current) {
        $soundRef.current.unloadAsync();
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
              playTrack(item.sound, {
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 16,
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
});
