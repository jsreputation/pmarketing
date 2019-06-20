export interface IVoucher {
  id: string|number;
  state: string;
  name: string;
  code: string;
  description: string;
  bannerUrl: string;
  expiresAt: Date;
  merchantName: string;
  merchantLogoUrl: string;
}
