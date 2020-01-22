import { Observable, of } from 'rxjs';
import { IUploadedFile } from '@cl-core/models/upload-file/uploaded-file.interface';

export class MockUploadFileService {

  public getMockUploadFile(): IUploadedFile {
    return {
      id: '1;',
    type: 'string;',
    url: 'string;',
    cdn: 'string;',
    name: 'string;',
    key: 'string;',
    createdAt: 'string;',
    updatedAt: 'string;',
    };
  }

  public uploadImage(file: File): Observable<IUploadedFile> {
    console.log(file);
    return of(null);
  }

  public uploadFile(file: File): Observable<IUploadedFile> {
    console.log(file);
    return of(null);
  }

  public getFile(id: string): Observable<IUploadedFile> {
    console.log(id);
    return of(null);
  }

  public uploadMultipleFile(files: File[]): Observable<IUploadedFile[]> {
    console.log(files);
    return of([this.getMockUploadFile()]);
  }
}
