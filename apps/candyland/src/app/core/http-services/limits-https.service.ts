import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { EngagementTypeAPIMapping } from '@cl-core/models/engagement/engagement-type.enum';

@Injectable({
  providedIn: 'root'
})
export class LimitsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getLimits(params: HttpParams, engagementType: string): Observable<IResponseApi<ILimitApi[]>> {
    const eType = EngagementTypeAPIMapping[engagementType];
    return this.http.get<IResponseApi<ILimitApi[]>>(`${ApiConfig.basePath}/${eType}/limits`, { params });
  }

  public updateLimits(id: number, data: any, engagementType: string): Observable<IResponseApi<any>> {
    const eType = EngagementTypeAPIMapping[engagementType];
    return this.http.patch<IResponseApi<any>>(`${ApiConfig.basePath}/${eType}/limits` + '/' + id, data);
  }

  public createLimits(data: IResponseApi<any>, engagementType: string): Observable<IResponseApi<any>> {
    const eType = EngagementTypeAPIMapping[engagementType];
    return this.http.post<IResponseApi<any>>(`${ApiConfig.basePath}/${eType}/limits`, data);
  }
}
