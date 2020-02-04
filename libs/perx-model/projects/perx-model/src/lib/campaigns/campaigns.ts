export const enum PCampaignState {
  active = 'active',
  approved = 'approved',
  inactive = 'inactive',
  ended = 'ended'
}

export const enum PCampaignType {
  reward = 'give_reward',
  stamp = 'stamp',
  invite = 'invite',
  game = 'game'
}

export const enum PCampaignGameType {
  tap_and_win = 'tap_and_win',
  collect_and_win = 'collect_and_win',
  shake_the_tree = 'shake_the_tree',
  hit_the_pinata = 'hit_the_pinata',
  mystery_box = 'mystery_box'
}

export interface IPCampaigns {
  data: any[];
  meta: {
    count: number;
    size: number;
    page: number;
    current_page: number;
    per_page: number;
    prev_page: null;
    next_page: null;
    total_pages: number;
    total_count: number
  };
}
