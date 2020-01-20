import { IJsonApiItemPayload, IWDocumentAttributes } from '@perx/whistler';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class UploadFileHttpService {

  constructor(private http: HttpClient,
              private apiConfig: ApiConfigServices) { }

  public uploadImage(formData: FormData): Observable<any> {
    return this.http.post(this.apiConfig.uploadImagePath, formData);
  }

  public uploadFile(formData: FormData): Observable<IJsonApiItemPayload<IWDocumentAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWDocumentAttributes>>(this.apiConfig.uploadFilePath, formData);
  }

  public getFile(id: string): Observable<IJsonApiItemPayload<IWDocumentAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWDocumentAttributes>>(this.apiConfig.uploadFilePath + '/' + id);
  }
}
