import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import { ThemedText } from "@/components/ThemedText";
import SegmentControl from "@/components/SegmentControl";
import { mockData } from "@/assets/mock/data";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

type DataItem = {
  tracks: {
    category: string;
    is_premium: boolean;
    label: string;
    sound: string;
    image: ImageSourcePropType;
  }[];
};

export default function HomeScreen() {
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState<DataItem>(mockData);
  const [playing, setPlaying] = useState<null | "playing" | "pause">(null);

  const soundRef = useRef<Audio.Sound | null>(null);

  const playSound = async (soundUrl: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: soundUrl },
        { shouldPlay: true }
      );
      setPlaying("playing");
      soundRef.current = sound;
    } catch (error) {
      setError("音源の再生に失敗しました");
    }
  };

  const stopSound = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.pauseAsync();
        setPlaying("pause");
      } catch (error) {
        setError("音源の停止に失敗しました");
      }
    }
  };

  const resumeSound = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.playAsync();
        setPlaying("playing");
      } catch (error) {
        setError("音源の再開に失敗しました");
      }
    }
  };

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

  console.log(data);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <SegmentControl lightColor="#4E5D74" darkColor="#ffffff" />

      <View>
        <ThemedText style={styles.title}>環境音</ThemedText>
      </View>

      <View style={styles.cardContainer}>
        {data.tracks.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => playSound(item.sound)}>
            <View style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <ThemedText>{item.label}</ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {playing && (
        <View style={styles.modal}>
          {playing === "playing" && (
            <TouchableOpacity onPress={() => stopSound()}>
              <FontAwesome5 name="pause-circle" size={24} color="white" />
            </TouchableOpacity>
          )}

          {playing === "pause" && (
            <TouchableOpacity onPress={() => resumeSound()}>
              <FontAwesome6 name="circle-play" size={24} color="white" />
            </TouchableOpacity>
          )}

          <ThemedText>{playing}</ThemedText>
        </View>
      )}
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
    padding: 24,
    borderRadius: 16,
  },
});
