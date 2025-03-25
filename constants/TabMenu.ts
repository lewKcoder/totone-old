type Tabs = {
  label: string;
  icon: "list" | "leaf" | "emoji-happy" | "heart";
  filter: "all" | "nature" | "artificial";
}[];

export const tabs: Tabs = [
  { label: "全て", icon: "list", filter: "all" },
  { label: "環境音", icon: "leaf", filter: "nature" },
  { label: "人工", icon: "emoji-happy", filter: "artificial" },
  { label: "お気に入り", icon: "heart", filter: "all" },
];
