import { IWQuestion } from '@perx/whistler';
import { ImageControlValue } from '@cl-helpers/image-control-value';

declare type IEngagementType =
  IEngagementShakeType |
  IEngagementTapType |
  IEngagementStamps |
  IEngagementSurvey |
  IEngagementScratchType |
  IEngagementSpinType |
  IEngagementSnakeType |
  IEngagementInstantReward;

declare interface IEngagementCommon {
  id: string;
  type: string;
  urn?: string;
  created_at: string;
  updated_at: string;
  fontName?: string;
}

declare interface IEngagementSpinType extends IEngagementCommon {
  game_type: string;
  title: string;
  description: string;
  image_url: string;
  title_display: string;
  button: string;
  sub_title: string;
  nb_of_wedges: number;
  slots: number[];
  wedge_colors: string[];
  reward_icon: string;
  wheel_img: string;
  wheel_position: string;
  pointer_img: string;
  attributes_type: string;
  created_at: string;
  updated_at: string;
}

declare interface IEngagementSnakeType extends IEngagementCommon {
  game_type: string;
  title: string;
  description: string;
  image_url: string;
  title_display: string;
  button: string;
  sub_title: string;
  target_icon_img_url: string;
  target_required: number;
  snake_color: string;
  snake_type_img_url: string;
  background_img_url: string;
  game_area_img_url: string;
  attributes_type: string;
  created_at: string;
  updated_at: string;
}

declare interface IEngagementScratchType extends IEngagementCommon {
  game_type: string;
  title: string;
  description: string;
  image_url: string;
  title_display: string;
  button: string;
  sub_title: string;
  pre_scratch_img_url: string;
  post_scratch_fail_img_url: string;
  post_scratch_success_img_url: string;
  attributes_type: string;
  created_at: string;
  updated_at: string;
}

declare interface IEngagementShakeType extends IEngagementCommon {
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

declare interface IEngagementTapType extends IEngagementCommon {
  game_type: string;
  title: string;
  description: string;
  image_url: string;
  title_display: string;
  button: string;
  sub_title: string;
  closed_pinata_img_url: string;
  opened_pinata_img_url: string;
  cracking_pinata_img_url?: string;
  background_img_url: string;
  attributes_type: string;
  created_at: string;
  updated_at: string;
}

declare interface IEngagementStamps extends IEngagementCommon {
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

declare interface IEngagementSurvey extends IEngagementCommon {
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

declare interface IEngagementInstantReward extends IEngagementCommon {
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
