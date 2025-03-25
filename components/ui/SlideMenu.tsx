import React, { useRef } from "react";
import {
  Animated,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  PanResponder,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { screenHeight } from "@/constants/ScreenSize";

export default function SideMenu() {
  const theme = useThemeColor("tabIconDefault");

  const slideAnim = useRef(new Animated.Value(-300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          slideAnim.setValue(gestureState.dx);
          fadeAnim.setValue(1 + gestureState.dx / 300);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -150) {
          closeMenu();
        } else {
          openMenu();
        }
      },
    })
  ).current;

  return (
    <View>
      <TouchableOpacity onPress={openMenu}>
        <Entypo name="menu" size={32} color={theme} />
      </TouchableOpacity>

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.menuContainer,
          {
            transform: [{ translateX: slideAnim }],
            opacity: fadeAnim,
          },
        ]}
      >
        <Image
          source={require("../../assets/images/icon-totone.png")}
          style={styles.logo}
        />

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            closeMenu();
          }}
        >
          <Text style={styles.menuItemText}>ライト/ダークモード切替</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            closeMenu();
          }}
        >
          <Text style={styles.menuItemText}>プラン画面</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => {
            closeMenu();
          }}
        >
          <Text style={styles.menuItemText}>お問い合わせ</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: "#fff",
    position: "absolute",
    left: -16,
    top: -56,
    bottom: 0,
    width: 300,
    height: screenHeight,
    padding: 20,
    paddingTop: 56,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 5,
    elevation: 5,
  },
  logo: {
    width: 38,
    height: 27,
    marginBottom: 33,
    zIndex: -1,
  },
  menuItem: {
    marginVertical: 15,
  },
  menuItemText: {
    fontSize: 18,
    color: "#333",
  },
  closeButton: {
    marginTop: 30,
    alignSelf: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "blue",
  },
});
