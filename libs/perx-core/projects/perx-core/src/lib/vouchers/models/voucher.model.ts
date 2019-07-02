export interface IVoucher {
  id: number;
  rewardId: number;
  state: string;
  name: string;
  code: string;
  description: string;
  thumbnailUrl: string;
  bannerUrl: string;
  expiresAt: Date | null;
  redeemedOn: Date;
  merchantName: string;
  merchantLogoUrl: string;
  termsAndConditions: string;
  howToRedeem: string | null;
}
