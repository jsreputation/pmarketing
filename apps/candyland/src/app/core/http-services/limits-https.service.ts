import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IJsonApiListPayload, IJsonApiItemPayload, IJsonApiPatchItem, IJsonApiPostItem } from './jsonapi.payload';
import { IInstantOutcomeLimitAttributes, ISurveyLimitAttributes, IGameLimitAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class LimitsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getLimits(params: HttpParams, engagementType: string):
    Observable<IJsonApiListPayload<IInstantOutcomeLimitAttributes | ISurveyLimitAttributes | IGameLimitAttributes>> {
    return this.http.get<IJsonApiListPayload<IInstantOutcomeLimitAttributes | ISurveyLimitAttributes | IGameLimitAttributes>>(`${ApiConfig.basePath}/${engagementType}/limits`, { params });
  }

  public updateLimits(
    id: string,
    data: IJsonApiPatchItem<IInstantOutcomeLimitAttributes | ISurveyLimitAttributes | IGameLimitAttributes>,
    engagementType: string): Observable<IJsonApiItemPayload<any>> {
    return this.http.patch<IJsonApiItemPayload<any>>(`${ApiConfig.basePath}/${engagementType}/limits` + '/' + id, data);
  }

  public createLimits(
    data: IJsonApiPostItem<IInstantOutcomeLimitAttributes | ISurveyLimitAttributes | IGameLimitAttributes>,
    engagementType: string): Observable<IJsonApiItemPayload<any>> {
    return this.http.post<IJsonApiItemPayload<any>>(`${ApiConfig.basePath}/${engagementType}/limits`, data);
  }
}
