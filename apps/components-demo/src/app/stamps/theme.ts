import { ITheme } from '@perxtech/core';

const stampCard = {
  '--pre_stamp_image': 'assets/hsbc-prestamp.png',
  '--post_stamp_image': 'assets/hsbc-stamped.png',
  '--reward_pre_stamp_image': 'assets/hsbc-prestamp.png',
  '--reward_post_stamp_image': 'assets/hsbc-stamped.png',
  '--available_stamp_image': 'assets/hsbc-stamp-available.png',
  '--available_reward_image': 'assets/hsbc-stamp-available.png',
  '--background_image': '',
  '--card_background_image': ''
};

export const mockTheme: ITheme = {
  name: 'demo',
  properties: {
    '--background': '#fff',
    '--font_color': '#000',
    stampCard
  }
};
