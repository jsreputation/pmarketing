import { Observable } from 'rxjs';
import { IUploadedFile } from '../../models/uploaded-file.interface';

export interface IUploadFileService {
  uploadFile(file: File): Observable<IUploadedFile | string | null>;
}
