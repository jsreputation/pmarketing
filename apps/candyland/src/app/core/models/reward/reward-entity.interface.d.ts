declare interface IRewardEntity {
  id: string;
  image: string;
  name: string;
  type: string;
  rewardType: string;
  redemptionType?: string;
  current: number;
  total: number;
  prprobability?: number | null;
  category: string;
  voucherInfo?: {
    type: string;
    code?: string;
    prefix?: string;
    codeFormat?: string;
    length?: number;
  };
  voucherValidity?: {
    type: string;
    startDate: string;
    endDate?: string;
    times?: string;
    duration?: string;
  };
}
