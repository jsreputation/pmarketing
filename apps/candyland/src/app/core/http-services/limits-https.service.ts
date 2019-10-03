import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
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
    data: IJsonApiItem<IInstantOutcomeLimitAttributes | ISurveyLimitAttributes | IGameLimitAttributes>,
    engagementType: string): Observable<IJsonApiPayload<any>> {
    const eType = EngagementTypeAPIMapping[engagementType];
    return this.http.patch<IJsonApiPayload<any>>(`${ApiConfig.basePath}/${eType}/limits` + '/' + id, data);
  }

  public createLimits(
    data: IJsonApiItem<IInstantOutcomeLimitAttributes | ISurveyLimitAttributes | IGameLimitAttributes>,
    engagementType: string): Observable<IJsonApiPayload<any>> {
    const eType = EngagementTypeAPIMapping[engagementType];
    return this.http.post<IJsonApiPayload<any>>(`${ApiConfig.basePath}/${eType}/limits`, data);
  }
}
