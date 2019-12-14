export enum WCodeType {
  system_generated = 'system_generated',
  single_code = 'single_code',
  user_uploaded = 'user_uploaded'
}
export enum WStatus {
  pending = 'pending',
  processing = 'processing',
  success = 'success',
  error = 'error'
}

export interface IWVouchersApi {
  amount?: number;
  start_date?: string;
  source_type: string;
  source_id: number;
  code_type: WCodeType;
  code?: string;
  prefix?: string;
  length?: number;
  format_type?: string;
  file_url?: string;
  status?: WStatus;
}
