export const enum WGameType {
  shakeTheTree = 'shake',
  pinata = 'tap',
  scratch = 'scratch',
  spin = 'spin',
  snake = 'snake'
}

export interface IWGameDisplayProperties {
  title: string;
  button: string;
  sub_title: string;
  background_img_url?: string;
}

export interface IWTreeDisplayProperties extends IWGameDisplayProperties {
  tree_img_url: string;
  nb_hanged_gifts: number;
  gift_box_img_url: string;
  background_img_url: string;
  nb_gifts_to_drop?: number;
}

export interface IWPinataDisplayProperties extends IWGameDisplayProperties {
  closed_pinata_img_url: string;
  cracking_pinata_img_url?: string;
  opened_pinata_img_url: string;
}

export interface IWScratchDisplayProperties extends IWGameDisplayProperties {
  pre_scratch_img_url: string;
  post_scratch_success_img_url: string;
  post_scratch_fail_img_url: string;
}

export interface IWSpinDisplayProperties extends IWGameDisplayProperties {
  nb_of_wedges: number;
  slots: number[];
  wedge_colors: string[];
  reward_icon: string;
  wheel_img: string;
  wheel_position: string;
  pointer_img: string;
}

export interface IWSnakeDisplayProperties extends IWGameDisplayProperties {
  target_icon_img_url: string;
  target_required: number;
  snake_head_img_url: string;
  snake_body_img_url?: string;
  game_area_img_url: string;
}
