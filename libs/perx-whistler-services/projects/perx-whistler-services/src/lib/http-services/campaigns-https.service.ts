import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IWCampaignAttributes,
  IJsonApiListPayload,
  IJsonApiItemPayload,
  IJsonApiPatchItem,
  IJsonApiPostItem
} from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class CampaignsHttpsService {
  constructor(private http: HttpClient,
              private apiConfig: ApiConfigServices) {
  }

  public getCampaigns(params: HttpParams): Observable<IJsonApiListPayload<IWCampaignAttributes>> {
    return this.http.get<IJsonApiListPayload<IWCampaignAttributes>>(this.apiConfig.campaignsPath, { params });
  }

  public getCampaign(id: string): Observable<IJsonApiItemPayload<IWCampaignAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWCampaignAttributes>>(`${this.apiConfig.campaignsPath}/${id}`);
  }

  public updateCampaign(
    id: string,
    data: IJsonApiPatchItem<IWCampaignAttributes>
  ): Observable<IJsonApiItemPayload<IWCampaignAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWCampaignAttributes>>(this.apiConfig.campaignsPath + '/' + id, data);
  }

  public createCampaign(data: IJsonApiPostItem<IWCampaignAttributes>): Observable<IJsonApiItemPayload<IWCampaignAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWCampaignAttributes>>(this.apiConfig.campaignsPath, data);
  }

  public deleteCampaign(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.campaignsPath}/${id}`);
  }
}
