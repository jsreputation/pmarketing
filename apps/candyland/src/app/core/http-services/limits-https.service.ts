import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IJsonApiListPayload, IJsonApiItemPayload, IJsonApiPatchItem, IJsonApiPostItem } from './jsonapi.payload';
import { IInstantOutcomeLimitAttributes, ISurveyLimitAttributes, IGameLimitAttributes } from '@perx/whistler';
import { EngagementTypeAPIMapping } from '@cl-core/models/engagement/engagement-type.enum';

@Injectable({
  providedIn: 'root'
})
export class LimitsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getLimits(params: HttpParams, engagementType: string):
    Observable<IJsonApiListPayload<IInstantOutcomeLimitAttributes | ISurveyLimitAttributes | IGameLimitAttributes>> {
    const eType = EngagementTypeAPIMapping[engagementType];
    return this.http.get<IJsonApiListPayload<IInstantOutcomeLimitAttributes | ISurveyLimitAttributes | IGameLimitAttributes>>(`${ApiConfig.basePath}/${eType}/limits`, { params });
  }

  public updateLimits(
    id: string,
    data: IJsonApiPatchItem<IInstantOutcomeLimitAttributes | ISurveyLimitAttributes | IGameLimitAttributes>,
    engagementType: string): Observable<IJsonApiItemPayload<any>> {
    const eType = EngagementTypeAPIMapping[engagementType];
    return this.http.patch<IJsonApiItemPayload<any>>(`${ApiConfig.basePath}/${eType}/limits` + '/' + id, data);
  }

  public createLimits(
    data: IJsonApiPostItem<IInstantOutcomeLimitAttributes | ISurveyLimitAttributes | IGameLimitAttributes>,
    engagementType: string): Observable<IJsonApiItemPayload<any>> {
    const eType = EngagementTypeAPIMapping[engagementType];
    return this.http.post<IJsonApiItemPayload<any>>(`${ApiConfig.basePath}/${eType}/limits`, data);
  }
}
