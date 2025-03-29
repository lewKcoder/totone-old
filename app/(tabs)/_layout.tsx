import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorSchemeStore } from "@/stores/colorSchemeStore";

export default function TabLayout() {
  const { colorScheme } = useColorSchemeStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "サウンド",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="ear-hearing"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="music"
        options={{
          title: "ミュージック",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="music" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
