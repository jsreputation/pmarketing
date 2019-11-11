import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWCampaignAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class CampaignsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getCampaigns(params: HttpParams): Observable<IJsonApiListPayload<IWCampaignAttributes>> {
    return this.http.get<IJsonApiListPayload<IWCampaignAttributes>>(ApiConfig.campaignsPath, { params });
  }

  public getCampaign(id: string): Observable<IJsonApiPayload<IWCampaignAttributes>> {
    return this.http.get<IJsonApiPayload<IWCampaignAttributes>>(`${ApiConfig.campaignsPath}/${id}`);
  }

  public updateCampaign(id: string, data: IJsonApiPayload<IWCampaignAttributes>): Observable<IJsonApiPayload<IWCampaignAttributes>> {
    return this.http.patch<IJsonApiPayload<IWCampaignAttributes>>(ApiConfig.campaignsPath + '/' + id, data);
  }

  public createCampaign(data: IJsonApiPayload<IWCampaignAttributes>): Observable<IJsonApiPayload<IWCampaignAttributes>> {
    return this.http.post<IJsonApiPayload<IWCampaignAttributes>>(ApiConfig.campaignsPath, data);
  }

  public deleteCampaign(id: string): Observable<IJsonApiPayload<IWCampaignAttributes>> {
    return this.http.delete<IJsonApiPayload<IWCampaignAttributes>>(`${ApiConfig.campaignsPath}/${id}`);
  }
}
