import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

const tabs = [
  { label: "全て", icon: "list" as const },
  { label: "環境音", icon: "sound" as const },
  { label: "人工", icon: "flash" as const },
  { label: "お気に入り", icon: "heart" as const },
];

export default function SegmentControl({
  lightColor,
  darkColor,
}: {
  lightColor: string;
  darkColor: string;
}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const themeColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.content}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, selectedTab === index && styles.selectedTab]}
              onPress={() => setSelectedTab(index)}
            >
              <Entypo
                name={tab.icon}
                size={16}
                color={selectedTab === index ? "white" : themeColor}
              />
              <ThemedText
                type="smallBold"
                style={{ color: selectedTab === index ? "white" : themeColor }}
              >
                {tab.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 12,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    marginBottom: 12,
    gap: 12,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingTop: 2,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 2,
    minWidth: 100,
    borderWidth: 1,
    borderColor: "#4E5D74",
    borderRadius: 99,
  },
  selectedTab: {
    backgroundColor: "#4E5D74",
  },
});
