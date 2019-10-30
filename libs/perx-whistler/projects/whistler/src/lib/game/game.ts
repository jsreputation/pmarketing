export const enum WGameType {
  shakeTheTree = 'shake',
  pinata = 'tap',
  scratch = 'scratch'
}

export interface WAttbsObjGame {
  number_of_tries?: number;
  urn: string;
  created_at: string;
  updated_at: string;
  game_type: WGameType;
  type?: string;
  title: string;
  description: string;
  image_url: string;
  properties: {};
  display_properties: WGameDisplayProperties;
}

export interface WAttbsObjEntity {
  comm_channel: null;
  created_at: string;
  end_date_time: null;
  engagement_id: number;
  engagement_type: string;
  goal: null;
  name: string;
  pool_id: null;
  start_date_time: null;
  status: string;
  updated_at: string;
  urn: string;
}

export interface WGameDisplayProperties {
  title: string;
  button: string;
  sub_title: string;
  background_img_url?: string;
}

export interface WGameOutcome {
  source_type: string;
  source_id: number;
  urn: string;
  created_at: string;
  updated_at: string;
  code: string;
  status: string;
  start_date: string;
  end_date: string;
  assigned_to_id: number;
}

export interface WTreeDisplayProperties extends WGameDisplayProperties {
  tree_img_url: string;
  nb_hanged_gifts: number;
  gift_box_img_url: string;
  background_img_url: string;
  nb_gifts_to_drop?: number;
}

export interface WPinataDisplayProperties extends WGameDisplayProperties {
  closed_pinata_img_url: string;
  cracking_pinata_img_url: string;
  opened_pinata_img_url: string;
}
