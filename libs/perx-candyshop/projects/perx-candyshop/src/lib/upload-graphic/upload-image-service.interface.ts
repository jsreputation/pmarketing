import { Observable } from 'rxjs';
import { IUploadedFile } from '../../models/uploaded-file.interface';

export interface IUploadImageService {
  uploadImage(file: File): Observable<IUploadedFile | string | null>;
}
