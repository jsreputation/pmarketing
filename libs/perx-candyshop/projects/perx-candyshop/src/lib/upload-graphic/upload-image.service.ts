import { Inject, Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUploadImageService } from './upload-image-service.interface';
import { HttpClient } from '@angular/common/http';
import { IUploadedFile } from '../../models/uploaded-file.interface';

@Injectable()
export class UploadImageService implements IUploadImageService {

  constructor(@Inject('uploadImageUrl') public url: string,
              private http: HttpClient) {
  }

  public uploadImage(file: File): Observable<any> {
    const formData = this.prepareFormData(file);
    return this.http.post(this.url, formData)
      .pipe(
        map((res: any) => this.transformToUploadedImage(res.data))
      );
  }

  private transformToUploadedImage(data: any): IUploadedFile {
    return {
      cdn: data.attributes.cdn,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      url: data.attributes.url,
      id: data.id,
      type: data.type
    };
  }

  private prepareFormData(file: any): FormData {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  }

  public uploadMultipleFile(files: any[]): Observable<any> {
    const arrayRequest: Observable<any>[] = files.map(file => this.uploadImage(file));
    return combineLatest(...arrayRequest);
  }
}
