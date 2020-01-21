export interface IWVoucherStatsApi {
  urn?: string;
  created_at?: string;
  updated_at?: string;
  code: {
    [key: string]: number;
  };
  voucher: {
    [key: string]: number
  };
}
