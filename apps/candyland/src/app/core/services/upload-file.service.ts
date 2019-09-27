import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { UploadFileHttpService } from '@cl-core/http-services/upload-file-http.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private uploadFileHttpService: UploadFileHttpService) { }

  public uploadFile(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.uploadFileHttpService.uploadFile(formData);
  }

  public uploadMultipleFile(files: any[]): Observable<any> {
    const arrayRequest: Observable<any>[] = files.map(file => this.uploadFile(file));
    return combineLatest(...arrayRequest);
  }
}
