export interface IWVoucherCodesApi {
  urn: string;
  created_at: string;
  updated_at: string;
  batch_id: number;
  value: string;
  status: WVoucherCodesStatus;
  source_id: number;
  source_type: string;
  valid_from: string;
  valid_to: string;
  validity_properties?: {
    [key: string]: any
  };
}

export enum WVoucherCodesStatus {
  available = 'available',
  issued = 'issued'
}
