import { Injectable } from '@angular/core';
import { ApiConfig } from '@cl-core/api-config';
import { combineLatest, Observable } from 'rxjs';
import { UploadFileHttpService } from '@cl-core/http-services/upload-file-http.service';
import { map } from 'rxjs/operators';
import { FileUploadAdapter } from '@cl-core/http-adapters/file-upload-adapter';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private uploadFileHttpService: UploadFileHttpService) { }

  public uploadImage(file: any): Observable<any> {
    const formData = this.prepareFormData(file);
    return this.uploadFileHttpService.uploadImage(formData)
      .pipe(
        map(res => FileUploadAdapter.transformToUploadedImage(res.data))
      );
  }

  public uploadFile(file: any): Observable<any> {
    const formData = this.prepareFormData(file);
    return this.uploadFileHttpService.uploadFile(formData)
      .pipe(
        map(res => FileUploadAdapter.transformToUploadedFile(res.data, ApiConfig.uploadFilePath))
      );
  }

  public uploadMultipleFile(files: any[]): Observable<any> {
    const arrayRequest: Observable<any>[] = files.map(file => this.uploadImage(file));
    return combineLatest(...arrayRequest);
  }

  private prepareFormData(file: any): FormData {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  }
}
