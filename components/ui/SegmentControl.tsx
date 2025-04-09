import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { State as SoundFilterState } from "@/stores/soundFilterStore";
import { State as MusicFilterState } from "@/stores/musicFilterStore";
import { Tab } from "@/constants/TabMenu";
import Icon from "../Icon";
import { ScrollView } from "./ScrollView";

export default function SegmentControl(props: {
  tabs: Tab[];
  setFilter: (soundFilter: SoundFilterState | MusicFilterState) => void;
}) {
  const { tabs, setFilter } = props;
  const [selectedTab, setSelectedTab] = useState(0);
  const themeColor = useThemeColor("tabIconDefault");

  return (
    <View style={styles.container}>
      <ScrollView isHorizontal>
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
              <Icon
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
    marginTop: 8,
    marginBottom: 8,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 6,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingTop: 4,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 4,
    borderRadius: 99,
  },
  selectedTab: {
    backgroundColor: "#4E5D74",
  },
});
