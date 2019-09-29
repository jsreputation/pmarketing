import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';

@Injectable({
  providedIn: 'root'
})
export class UploadFileHttpService {

  constructor(private http: HttpClient) { }

  public uploadFile(formData: FormData): Observable<any> {
    return this.http.post(ApiConfig.uploadFilePath, formData);
  }
}
