import { Observable } from 'rxjs';
import { HttpParamsOptions } from '../../models/http-params-options';

export enum FileUploadStatus {
  pending = 'pending',
  processing = 'processing',
  success = 'success',
  error = 'error',
  successWithError = 'success_with_error'
}

export interface IUploadFileResponse<V = any> {
  fileName: string;
  value?: V;
  status: FileUploadStatus;
  errorMsg?: string;
  nbRecords?: number;
}

export abstract class UploadFileService<V = any> {
  public abstract uploadFile(file: File, options?: HttpParamsOptions): Observable<IUploadFileResponse<V>>;
}
