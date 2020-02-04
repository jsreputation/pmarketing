export const enum PRewardState {
  active = 'active',
  ended = 'ended',
  inactive = 'inactive',
  draft = 'draft',
  approved = 'approved',
  private = 'private',
  system = 'system',
  sell_fast = 'sell_fast',
  sold_out = 'sold_out'
}

export interface IPRewards {
  data: any[];
  meta: {
    count: number;
    size: number;
    total_pages: number;
    page: number;
  };
}
