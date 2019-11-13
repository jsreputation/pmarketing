import { Observable } from 'rxjs';
import { IUploadedFile } from './uploaded-file.interface';

export interface IUploadFileService {
  upload(file: File): Observable<IUploadedFile | string | null>;
}
