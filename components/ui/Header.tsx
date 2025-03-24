import { useThemeColor } from "@/hooks/useThemeColor";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Image, TouchableOpacity } from "react-native";

export const Header = () => {
  const theme = useThemeColor("text");

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 56,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <TouchableOpacity>
        <Entypo name="menu" size={32} color={theme} />
      </TouchableOpacity>
      <Image
        source={require("../../assets/images/icon-totone.png")}
        style={{
          width: 38,
          height: 27,
          margin: "auto",
        }}
      />
      <TouchableOpacity>
        <MaterialCommunityIcons name="timer-outline" size={32} color={theme} />
      </TouchableOpacity>
    </View>
  );
};
