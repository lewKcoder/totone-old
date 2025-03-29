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
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorSchemeStore } from "@/stores/colorSchemeStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";
import { languages } from "@/constants/Language";
import { useLanguageStore } from "@/stores/languageStore";

export default function Modal() {
  const { colorScheme, setColorScheme } = useColorSchemeStore();
  const iconTheme = useThemeColor("tabIconDefault");
  const backgroundTheme = useThemeColor("background");
  const isLightMode = colorScheme === "light";

  const { language, setLanguage } = useLanguageStore();
  const [modalVisible, setModalVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const router = useRouter();

  const handlePressPlan = () => {
    closeMenu();
    router.push("/plan");
  };

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
        <MaterialCommunityIcons name="menu" size={32} color={iconTheme} />
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
                    style={styles.image}
                  />
                </View>

                <View style={styles.menuItem}>
                  <MaterialCommunityIcons
                    name="brightness-6"
                    size={22}
                    color={iconTheme}
                  />
                  <ThemedText>テーマ</ThemedText>

                  <Switch
                    trackColor={{ false: "#3e3e3e", true: "#3e3e3e" }}
                    thumbColor={isLightMode ? "#fff" : "#fff"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() =>
                      setColorScheme(isLightMode ? "dark" : "light")
                    }
                    value={isLightMode}
                    style={styles.switch}
                  />
                </View>

                <TouchableOpacity onPress={handlePressPlan}>
                  <View style={[styles.menuItem, { paddingBottom: 4 }]}>
                    <MaterialCommunityIcons
                      name="inbox-full"
                      size={22}
                      color={iconTheme}
                    />

                    <ThemedText style={styles.menuItemText}>プラン</ThemedText>
                  </View>

                  <ThemedText style={styles.description}>
                    あなたの現在のプラン：プレミアム
                  </ThemedText>
                  <ThemedText style={styles.description}>
                    全てのサウンドとミュージックを聴くことができます。
                  </ThemedText>
                </TouchableOpacity>

                <View>
                  <View style={[styles.menuItem, { paddingBottom: 4 }]}>
                    <MaterialCommunityIcons
                      name="earth"
                      size={22}
                      color={iconTheme}
                    />
                    <ThemedText style={styles.menuItemText}>
                      言語: {language.label}
                    </ThemedText>
                  </View>

                  {languages.map((lang) => (
                    <TouchableOpacity
                      key={lang.code}
                      style={styles.languageItem}
                      onPress={() => setLanguage(lang)}
                    >
                      <MaterialCommunityIcons
                        name={
                          lang.code === language.code
                            ? "check-circle"
                            : "checkbox-blank-circle-outline"
                        }
                        size={18}
                        color={iconTheme}
                      />
                      <ThemedText style={styles.languageLabel}>
                        {lang.label}
                      </ThemedText>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={22}
                    color={iconTheme}
                  />

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
  logo: {
    width: 38,
    height: 27,
    marginBottom: 8,
  },
  menuItemText: {
    fontSize: 16,
  },
  image: {
    width: 38,
    height: 27,
  },
  switch: {
    marginLeft: "auto",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginVertical: 2,
  },
  languageLabel: {
    fontSize: 12,
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
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
