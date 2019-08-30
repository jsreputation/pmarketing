declare interface Reward {
  id: number;
  image: string;
  name: string;
  type: string;
  rewardType: string;
  redemptionType?: string;
  current: number;
  total: number;
  prprobability?: number | null;
  category: string;
}
