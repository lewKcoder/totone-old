import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import SegmentControl from "@/components/ui/SegmentControl";
import { mockData } from "@/assets/mock/data";
import { screenWidth } from "@/constants/ScreenSize";
import { usePlayTrack } from "@/hooks/usePlayTrack";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Tab } from "@/constants/TabMenu";
import { ScrollView } from "@/components/ui/ScrollView";
import { FilterState } from "@/stores/filterStore";

type Props = {
  tabs: Tab[];
  filter: FilterState;
  setFilter: (filter: FilterState) => void;
};

export default function TrackList({ tabs, filter, setFilter }: Props) {
  const playTrack = usePlayTrack();
  const themeColor = useThemeColor("text");

  const filteredData =
    filter.key === "all"
      ? mockData.tracks
      : mockData.tracks.filter((item) => item.category === filter.key);

  return (
    <ScrollView isContainer>
      <SegmentControl tabs={tabs} setFilter={setFilter} />

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

              <ThemedText style={[styles.label, { color: themeColor }]}>
                {item.label}
              </ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
