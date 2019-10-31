import { IWQuestion } from '@perx/whistler';

export interface IEngagementShakeType {
  id: string;
  type: string;
  game_type: string;
  title: string;
  description: string;
  image_url: string;
  title_display: string;
  button: string;
  sub_title: string;
  tree_img_url: string;
  nb_hanged_gifts: number;
  gift_box_img_url: string;
  background_img_url: string;
  attributes_type: string;
  created_at: string;
  updated_at: string;
}

export interface IEngagementTapType {
  id: string;
  type: string;
  game_type: string;
  title: string;
  description: string;
  image_url: string;
  title_display: string;
  button: string;
  sub_title: string;
  closed_pinata_img_url: string;
  opened_pinata_img_url: string;
  cracking_pinata_img_url: string;
  attributes_type: string;
  created_at: string;
  updated_at: string;
}

export interface IEngagementStamps {
  id: string;
  type: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  image_url: string;
  slots: number[];
  title_display: string;
  button: string;
  sub_title: string;
  nb_of_slots: number;
  pre_stamp_img_url: string;
  post_stamp_img_url: string;
  reward_pre_stamp_img_url: string;
  reward_post_stamp_img_url: string;
  attributes_type: string;
  background_img_url: string;
  card_background_img_url: string;
}

export interface IEngagementSurvey {
  id: string;
  type: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  image_url: string;
  title_display: string;
  questions: IWQuestion[];
  sub_title: string;
  background_img_url: string;
  progress_bar_color: string;
  card_background_img_url: string;
  attributes_type: string;
  button: string;
}

export interface IEngagementInstantReward {
  id: string;
  type: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  image_url: string;
  title_display: string;
  banner: string;
  button: string;
  sub_title: string;
  background_img_url: string;
  card_background_img_url: string;
  attributes_type: string;
}
