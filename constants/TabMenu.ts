export type Tab = {
  label: string;
  icon:
    | "format-list-bulleted"
    | "leaf"
    | "hand-wave"
    | "heart"
    | "waves"
    | "music-note"
    | "cloud";
  filter: "all" | "nature" | "artificial" | "meditation" | "classic" | "lofi";
};

export const soundTabs: Tab[] = [
  { label: "全て", icon: "format-list-bulleted", filter: "all" },
  { label: "環境音", icon: "leaf", filter: "nature" },
  { label: "人工音", icon: "hand-wave", filter: "artificial" },
  { label: "お気に入り", icon: "heart", filter: "all" },
];

export const musicTabs: Tab[] = [
  { label: "全て", icon: "format-list-bulleted", filter: "all" },
  { label: "リラックス", icon: "waves", filter: "meditation" },
  { label: "クラシック", icon: "music-note", filter: "classic" },
  { label: "lofi", icon: "cloud", filter: "lofi" },
  { label: "お気に入り", icon: "heart", filter: "all" },
];
