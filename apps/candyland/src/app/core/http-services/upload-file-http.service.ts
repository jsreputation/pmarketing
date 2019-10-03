import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileHttpService {

  constructor(private http: HttpClient) { }

  public uploadImage(formData: FormData): Observable<any> {
    return this.http.post(ApiConfig.uploadImagePath, formData);
  }

  public uploadFile(formData: FormData): Observable<any> {
    return this.http.post(ApiConfig.uploadFilePath, formData);
  }

  public getFile(id: string): Observable<any> {
    return this.http.get(ApiConfig.uploadFilePath + '/' + id);
  }
}
