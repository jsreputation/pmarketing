import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { ICampaignAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class CampaignsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getCampaigns(params: HttpParams): Observable<IJsonApiListPayload<ICampaignAttributes>> {
    return this.http.get<IJsonApiListPayload<ICampaignAttributes>>(ApiConfig.campaignsPath, { params });
  }

  public getCampaign(id: string): Observable<IJsonApiPayload<ICampaignAttributes>> {
    return this.http.get<IJsonApiPayload<ICampaignAttributes>>(`${ApiConfig.campaignsPath}/${id}`);
  }

  public updateCampaign(id: string, data: IJsonApiPayload<ICampaignAttributes>): Observable<IJsonApiPayload<ICampaignAttributes>> {
    return this.http.patch<IJsonApiPayload<ICampaignAttributes>>(ApiConfig.campaignsPath + '/' + id, data);
  }

  public createCampaign(data: IJsonApiPayload<ICampaignAttributes>): Observable<IJsonApiPayload<ICampaignAttributes>> {
    return this.http.post<IJsonApiPayload<ICampaignAttributes>>(ApiConfig.campaignsPath, data);
  }

  public deleteCampaign(id: string): Observable<any> {
    return this.http.delete(`${ApiConfig.campaignsPath}/${id}`);
  }
}
