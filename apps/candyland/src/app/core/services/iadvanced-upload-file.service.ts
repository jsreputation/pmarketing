import { Observable } from 'rxjs';

export abstract class IAdvancedUploadFileService {
  public abstract uploadFile(file: File, options?: any): Observable<IUploadFileStatus>;
}
