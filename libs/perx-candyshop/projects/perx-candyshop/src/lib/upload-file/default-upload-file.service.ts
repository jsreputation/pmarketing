import { Inject, Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IUploadedFile } from '../../models/uploaded-file.interface';
import { UploadFileService } from './upload-file-service.interface';
import { IHttpParamsOptions } from '../../models/http-params-options.interface';

@Injectable()
export class DefaultUploadFileService implements UploadFileService {

  constructor(
    @Inject('uploadFileUrl') public url: string,
    private http: HttpClient
  ) { }

  public uploadFile(file: any, options: IHttpParamsOptions): Observable<any> {
    const formData = this.prepareFormData(file);
    return this.http.post(this.url, formData, options)
      .pipe(
        map((res: any) => this.transformToUploadedFile(res.data, this.url))
      );
  }

  private transformToUploadedFile(data: any, filePath: string): Partial<IUploadedFile> {
    return {
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      url: `${filePath}/${data.id}`,
      name: data.attributes.blob.filename,
      key: data.attributes.blob.key,
      id: data.id,
      type: data.type
    };
  }

  private prepareFormData(file: any): FormData {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  }

  public uploadMultipleFile(files: any[], options: IHttpParamsOptions): Observable<any> {
    const arrayRequest: Observable<any>[] = files.map(file => this.uploadFile(file, options));
    return combineLatest(...arrayRequest);
  }
}