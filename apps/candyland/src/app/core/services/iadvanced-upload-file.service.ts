import { Observable } from 'rxjs';

export enum FileUploadStatus {
  pending = 'pending',
  processing = 'processing',
  success = 'success',
  error = 'error',
  successWithError = 'success_with_error'
}

export interface IUploadFileStatus {
  fileName: string;
  status: FileUploadStatus;
  errorMsg?: string;
  nbRecords?: number;
}

export abstract class IAdvancedUploadFileService {
  public abstract uploadFile(file: File, options?: any): Observable<IUploadFileStatus>;
}
