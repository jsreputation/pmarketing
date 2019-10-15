export interface IVoucherStatsApi {
  urn: string;
  created_at: string;
  updated_at: string;
  inventory: {
    [key: string]: number;
  };
  assigned: {
    [key: string]: number
  };
}
