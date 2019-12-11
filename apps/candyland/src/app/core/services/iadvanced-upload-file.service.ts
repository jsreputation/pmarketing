import { Observable } from 'rxjs';

export const enum UploadStatus {
  UPLOADING,
  COMPLETED,
  ERROR
}
export interface IUploadFileStatus {
  fileName: string;
  status: UploadStatus;
  errorMsg?: string;
  nbRecords?: number;
}

export abstract class IAdvancedUploadFileService {
  public abstract uploadFile(file: File, options?: any): Observable<IUploadFileStatus>;
}
