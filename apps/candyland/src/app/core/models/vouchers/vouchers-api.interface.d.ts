declare interface IVouchersApi {
  amount: string;
  start_date: string;
  source_type?: any;
  source_id: number;
  code_type: string;
  code?: string;
  prefix?: string;
  length?: number;
  format_type?: string;
}

declare interface IVoucherStatsApi {
    urn: string;
    created_at: string;
    updated_at: string;
    inventory: {
        available: number;
        issued: number;
        expired: number;
    },
    assigned: {
      issued: number;
      expired: number;
      redeemed: number;
      voided: number;
    }
}

declare interface IVoucherStatsResults  {
  available: number;
  issued: number;
  expired: number;
  redeemed: number;
}
