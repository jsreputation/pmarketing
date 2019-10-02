import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IJsonApiListPayload, IJsonApiItemPayload, IJsonApiPatchItem, IJsonApiPostItem } from './jsonapi.payload';
import { ICampaignAttributes, ICampaign } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class CampaignsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getCampaigns(params: HttpParams): Observable<IJsonApiListPayload<ICampaignAttributes>> {
    return this.http.get<IJsonApiListPayload<ICampaignAttributes>>(ApiConfig.campaignsPath, { params });
  }

  public getCampaign(id: string): Observable<IJsonApiItemPayload<ICampaignAttributes>> {
    return this.http.get<IJsonApiItemPayload<ICampaignAttributes>>(`${ApiConfig.campaignsPath}/${id}`);
  }

  public updateCampaign(id: string, data: IJsonApiPatchItem<ICampaign>): Observable<IJsonApiItemPayload<ICampaignAttributes>> {
    return this.http.patch<IJsonApiItemPayload<ICampaignAttributes>>(ApiConfig.campaignsPath + '/' + id, data);
  }

  public createCampaign(data: IJsonApiPostItem<ICampaignAttributes>): Observable<IJsonApiItemPayload<ICampaignAttributes>> {
    return this.http.post<IJsonApiItemPayload<ICampaignAttributes>>(ApiConfig.campaignsPath, data);
  }

  public deleteCampaign(id: string): Observable<any> {
    return this.http.delete(`${ApiConfig.campaignsPath}/${id}`);
  }
}
