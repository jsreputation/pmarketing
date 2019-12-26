declare interface IUploadedFile {
  id: string;
  type: string;
  url: string;
  cdn?: string;
  name?: string;
  key?: string;
  status?: FileUploadStatus | null;
  processedAmount?: number | null;
  successAmount?: number | null;
  failAmount?: number | null;
  processedDetails?: string | null;
  createdAt: string;
  updatedAt: string;
}

declare enum FileUploadStatus {
  pending = 'pending',
  processing = 'processing',
  success = 'success',
  error = 'error',
  successWithError = 'success_with_error'
}

declare interface IUploadFileStatus {
  fileName: string;
  status: FileUploadStatus;
  errorMsg?: string;
  nbRecords?: number;
}
