import { useState, useRef } from "react";
import { Animated } from "react-native";
import {
  Modal as ModalImported,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Switch,
  Dimensions,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorSchemeStore } from "@/stores/colorSchemeStore";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";

export default function Modal() {
  const { colorScheme, setColorScheme } = useColorSchemeStore();
  const iconTheme = useThemeColor("tabIconDefault");
  const backgroundTheme = useThemeColor("background");
  const isLightMode = colorScheme === "light";

  const [modalVisible, setModalVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(slideAnim, {
        toValue: -screenWidth,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={openMenu}>
        <Entypo name="menu" size={32} color={iconTheme} />
      </TouchableOpacity>

      <ModalImported
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <Animated.View
            style={[
              styles.overlay,
              {
                backgroundColor: overlayAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    "rgba(25, 25, 25, 0)",
                    "rgba(25, 25, 25, 0.68)",
                  ],
                }),
              },
            ]}
          >
            {/* 内側のタッチは閉じないようにする */}
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.container,
                  {
                    backgroundColor: backgroundTheme,
                    transform: [{ translateX: slideAnim }],
                  },
                ]}
              >
                <View style={styles.logo}>
                  <Image
                    source={require("../../assets/images/icon-totone.png")}
                    style={{ width: 38, height: 27 }}
                  />
                </View>

                <View style={styles.modeToggle}>
                  <Feather
                    name="moon"
                    size={32}
                    color={!isLightMode ? "orange" : "#3e3e3e"}
                  />

                  <Switch
                    trackColor={{ false: "#3e3e3e", true: "#3e3e3e" }}
                    thumbColor={isLightMode ? "#fff" : "#fff"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() =>
                      setColorScheme(isLightMode ? "dark" : "light")
                    }
                    value={isLightMode}
                  />

                  <Feather
                    name="sun"
                    size={32}
                    color={isLightMode ? "red" : "#3e3e3e"}
                  />
                </View>

                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                  <FontAwesome name="inbox" size={28} color={iconTheme} />
                  <ThemedText style={styles.menuItemText}>
                    プラン画面
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                  <Feather name="mail" size={24} color={iconTheme} />
                  <ThemedText style={styles.menuItemText}>
                    お問い合わせ
                  </ThemedText>
                </TouchableOpacity>

                <ThemedText style={[styles.version, { color: iconTheme }]}>
                  Version 0.0.1
                </ThemedText>
              </Animated.View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </ModalImported>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    width: "68%",
    height: "100%",
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    alignSelf: "flex-start",
    gap: 24,
    paddingTop: 54,
    paddingRight: 20,
    paddingLeft: 20,
  },
  modeToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  logo: {
    width: 38,
    height: 27,
    marginBottom: 8,
  },
  menuItemText: {
    fontSize: 14,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  version: {
    fontSize: 12,
    marginTop: "auto",
    paddingBottom: 24,
  },
});
