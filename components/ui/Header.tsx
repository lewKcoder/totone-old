import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import SideMenu from "./SlideMenu";

export const Header = () => {
  const theme = useThemeColor("tabIconDefault");

  return (
    <View style={styles.container}>
      <SideMenu />

      <Image
        source={require("../../assets/images/icon-totone.png")}
        style={styles.logo}
      />

      <TouchableOpacity>
        <MaterialCommunityIcons name="timer-outline" size={32} color={theme} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 56,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  logo: {
    width: 38,
    height: 27,
    margin: "auto",
    zIndex: -1,
  },
});
