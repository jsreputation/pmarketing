import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { UploadFileHttpService } from '@cl-core/http-services/upload-file-http.service';
import { map } from 'rxjs/operators';
import { FileUploadAdapter } from '@cl-core/http-adapters/file-upload-adapter';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  constructor(private uploadFileHttpService: UploadFileHttpService) {
  }

  public uploadImage(file: File): Observable<IUploadedFile> {
    const formData = this.prepareFormData(file);
    return this.uploadFileHttpService.uploadImage(formData)
      .pipe(
        map(res => FileUploadAdapter.transformToUploadedImage(res.data))
      );
  }

  public uploadFile(file: File): Observable<IUploadedFile> {
    const formData = this.prepareFormData(file);
    return this.uploadFileHttpService.uploadFile(formData)
      .pipe(
        map(res => FileUploadAdapter.transformToUploadedFile(res.data))
      );
  }

  public getFile(id: string): Observable<IUploadedFile> {
    return this.uploadFileHttpService.getFile(id).pipe(
      map(res => FileUploadAdapter.transformToUploadedFile(res.data))
    );
  }

  public uploadMultipleFile(files: File[]): Observable<IUploadedFile[]> {
    const arrayRequest: Observable<IUploadedFile>[] = files.map(file => this.uploadImage(file));
    return combineLatest(...arrayRequest);
  }

  private prepareFormData(file: File): FormData {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  }
}
