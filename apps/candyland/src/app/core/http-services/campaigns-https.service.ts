import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getCampaigns(params: HttpParams): Observable<IResponseApi<ICampaignAPI[]>> {
    return this.http.get<IResponseApi<ICampaignAPI[]>>(ApiConfig.campaignsPath, { params });
  }

  public getCampaign(id: string): Observable<IResponseApi<ICampaignAPI>> {
    return this.http.get<IResponseApi<ICampaignAPI>>(`${ApiConfig.campaignsPath}/${id}`);
  }

  public updateCampaign(id: string, data: ISendAPI<ICampaign>): Observable<IResponseApi<ICampaignAPI>> {
    return this.http.patch<IResponseApi<ICampaignAPI>>(ApiConfig.campaignsPath + '/' + id, data);
  }

  public createCampaign(data: ISendAPI<ICampaignAPI>): Observable<IResponseApi<ICampaignAPI>> {
    return this.http.post<IResponseApi<ICampaignAPI>>(ApiConfig.campaignsPath, data);
  }

  public deleteCampaign(id: string): Observable<any> {
    return this.http.delete(`${ApiConfig.campaignsPath}/${id}`);
  }
}
