export interface IRoleLabelConfigItem {
  abbr: string;
  title: string;
  class: string;
}

export interface IRoleLabelConfig {
  [key: number]: IRoleLabelConfigItem;
}
