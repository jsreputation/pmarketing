export interface IWDocumentAttributes {
  urn: string;
  created_at: string;
  updated_at: string;
  transfer_map: string | null;
  target: string | null;
  column_map: string[];
  blob: IWDocumentBlob;
  platform_event_state: string | null;
  url: string;
  status?: WFileUploadStatus | null;
  processed_amount?: number | null;
  success_amount?: number | null;
  fail_amount?: number | null;
  processed_details?: string | null;
}

export interface IWDocumentBlob {
  id: number;
  key: string;
  filename: string;
  content_type: string;
  metadata: IWDocumentMetadata;
  byteSize: number;
  checksum: string;
  created_at: string;
}

interface IWDocumentMetadata {
  identified: boolean;
}

export enum WFileUploadStatus {
  pending = 'pending',
  processing = 'processing',
  success = 'success',
  error = 'error',
  success_with_error = 'success_with_error'
}
