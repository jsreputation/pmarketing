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

  public getCommsTemplates(params: HttpParams): Observable<IResponseApi<ICommTemplateApi[]>> {
    return this.http.get<IResponseApi<ICommTemplateApi[]>>(ApiConfig.commsTemplatesPath, { params });
  }

  public getCommsEvents(params: HttpParams): Observable<IResponseApi<ICommEventApi[]>> {
    return this.http.get<IResponseApi<ICommEventApi[]>>(ApiConfig.commsEventsPath, { params });
  }
}
