import { Observable } from 'rxjs';
import { IHttpParamsOptions } from 'projects/perx-candyshop/src/models/http-params-options.interface';

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
  public abstract uploadFile(file: File, options?: IHttpParamsOptions): Observable<IUploadFileResponse<V>>;
}
