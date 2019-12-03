import { WRedemptionType } from "@perx/whistler";

export interface IRewardEntity {
  id: string;
  image: string;
  name: string;
  type: string;
  rewardType: string;
  redemptionType?: WRedemptionType;
  current: number;
  total: number;
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
  merchantId?: string;
  merchantName?: string;
  tags: string[];
}
