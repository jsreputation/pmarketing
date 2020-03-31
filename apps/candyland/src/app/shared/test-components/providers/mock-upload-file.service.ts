import { Observable, of } from 'rxjs';
import { IUploadedFile } from '@cl-core/models/upload-file/uploaded-file.interface';
import { UploadFileService } from '@cl-core-services';

export class MockUploadFileService implements Partial<UploadFileService> {
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

  public uploadImage(): Observable<IUploadedFile> {
    return of(null);
  }

  public uploadFile(): Observable<IUploadedFile> {
    return of(null);
  }

  public getFile(): Observable<IUploadedFile> {
    return of(null);
  }

  public uploadMultipleFile(): Observable<IUploadedFile[]> {
    return of([this.getMockUploadFile()]);
  }
}
