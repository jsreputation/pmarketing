declare interface IRewardEntity {
  id: string;
  image: string;
  name: string;
  type: string;
  rewardType: string;
  redemptionType?: string;
  current: number;
  total: number;
  probability?: number | null;
  category: string;
  merchantId?: string;
}
