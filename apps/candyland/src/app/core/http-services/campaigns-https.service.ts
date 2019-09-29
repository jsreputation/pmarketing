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

  public getCampaigns(params: HttpParams): Observable<any> {
    // return this.http.get('assets/mocks/campaigns.json');
    return this.http.get(ApiConfig.campaignsPath, { params });
  }

  public getCampaign(id: string): Observable<any> {
    // return this.http.get(`${ApiConfig.campaignsPath}/${id}?include=limits,possible_outcomes`);
    return this.http.get(`${ApiConfig.campaignsPath}/${id}`);
  }

  public updateCampaign(id: number, data: any): Observable<IResponseApi<any>> {
    return this.http.patch<IResponseApi<any>>(ApiConfig.campaignsPath + '/' + id, data);
  }

  public createCampaign(data: IResponseApi<any>): Observable<IResponseApi<any>> {
    return this.http.post<IResponseApi<any>>(ApiConfig.campaignsPath, data);
  }

  public deleteCampaign(id: string): Observable<any> {
    return this.http.delete(`${ApiConfig.campaignsPath}/${id}`);
  }
}
