import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LimitsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getLimits(params: HttpParams, engagementType: string): Observable<IResponseApi<ILimitApi[]>> {
    return this.http.get<IResponseApi<ILimitApi[]>>(`${ApiConfig.basePath}/${engagementType}/limits`, { params });
  }

  public updateLimits(id: number, data: any, engagementType: string): Observable<IResponseApi<any>> {
    return this.http.patch<IResponseApi<any>>(`${ApiConfig.basePath}/${engagementType}/limits` + '/' + id, data);
  }

  public createLimits(data: IResponseApi<any>, engagementType: string): Observable<IResponseApi<any>> {
    return this.http.post<IResponseApi<any>>(`${ApiConfig.basePath}/${engagementType}/limits`, data);
  }
}
