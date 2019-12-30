import { IJsonApiItemPayload, IWDocumentAttributes } from '@perx/whistler';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@es-core/api-config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileHttpService {

  constructor(private http: HttpClient) { }

  public uploadImage(formData: FormData): Observable<any> {
    return this.http.post(ApiConfig.uploadImagePath, formData);
  }

  public uploadFile(formData: FormData): Observable<IJsonApiItemPayload<IWDocumentAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWDocumentAttributes>>(ApiConfig.uploadFilePath, formData);
  }

  public getFile(id: string): Observable<IJsonApiItemPayload<IWDocumentAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWDocumentAttributes>>(ApiConfig.uploadFilePath + '/' + id);
  }
}
