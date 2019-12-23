import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import {
  IWCampaignAttributes,
  IJsonApiListPayload,
  IJsonApiItemPayload,
  IJsonApiPatchItem,
  IJsonApiPostItem
} from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class CampaignsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getCampaigns(params: HttpParams): Observable<IJsonApiListPayload<IWCampaignAttributes>> {
    return this.http.get<IJsonApiListPayload<IWCampaignAttributes>>(ApiConfig.campaignsPath, { params });
  }

  public getCampaign(id: string): Observable<IJsonApiItemPayload<IWCampaignAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWCampaignAttributes>>(`${ApiConfig.campaignsPath}/${id}`);
  }

  public updateCampaign(
    id: string,
    data: IJsonApiPatchItem<IWCampaignAttributes>
  ): Observable<IJsonApiItemPayload<IWCampaignAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWCampaignAttributes>>(ApiConfig.campaignsPath + '/' + id, data);
  }

  public createCampaign(data: IJsonApiPostItem<IWCampaignAttributes>): Observable<IJsonApiItemPayload<IWCampaignAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWCampaignAttributes>>(ApiConfig.campaignsPath, data);
  }

  public deleteCampaign(id: string): Observable<void> {
    return this.http.delete<void>(`${ApiConfig.campaignsPath}/${id}`);
  }
}
