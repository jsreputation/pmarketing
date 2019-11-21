export interface StatusLabelConfigItem {
  title: string;
  class: string;
}

export interface IStatusLabelConfig {
  [key: string]: StatusLabelConfigItem;
}
