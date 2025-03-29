import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useFilterStore } from "@/stores/filterStore";
import { Tab } from "@/constants/TabMenu";

export default function SegmentControl(props: { tabs: Tab[] }) {
  const { tabs } = props;
  const [selectedTab, setSelectedTab] = useState(0);
  const themeColor = useThemeColor("tabIconDefault");
  const { setFilter } = useFilterStore();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View style={styles.content}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tab, selectedTab === index && styles.selectedTab]}
              onPress={() => {
                setSelectedTab(index);
                setFilter({
                  key: tab.filter,
                  label: tab.label,
                });
              }}
            >
              <MaterialCommunityIcons
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
    marginBottom: 8,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 6,
    gap: 8,
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
