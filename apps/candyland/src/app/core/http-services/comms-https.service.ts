import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getCommsTemplates(params: HttpParams): Observable<any> {
    return this.http.get(ApiConfig.commsTemplatesPath, { params });
  }

  public getCommsEvents(params: HttpParams): Observable<any> {
    return this.http.get(ApiConfig.commsEventsPath, { params });
  }
}
