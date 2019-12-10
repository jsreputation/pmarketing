import { IAdvancedUploadFileService, IUploadFileStatus, UploadStatus } from './iadvanced-upload-file.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VouchersUploadService extends IAdvancedUploadFileService {
  // constructor
  public uploadFile(file: File): Observable<IUploadFileStatus> {
    return of({
      fileName: file.name,
      status: UploadStatus.ERROR,
      errorMsg: 'Upload not available yet'
    });
  }
}
