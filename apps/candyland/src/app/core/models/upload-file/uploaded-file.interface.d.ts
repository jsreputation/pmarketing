declare interface IUploadedFile {
  id: string;
  type: string;
  url: string;
  cdn?: string;
  name?: string;
  key?: string;
  status: FileUploadStatus | null;
  processed_amount: number | null;
  success_amount: number | null;
  fail_amount: number | null;
  processed_details: string | null;
  created_at: string;
  updated_at: string;
}

declare enum FileUploadStatus {
  pending = 'pending',
  processing = 'processing',
  success = 'success',
  error = 'error'
}
