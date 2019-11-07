import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWInstantOutcomeLimitAttributes, IWSurveyLimitAttributes, IWGameLimitAttributes } from '@perx/whistler';
import { EngagementTypeAPIMapping } from '@cl-core/models/engagement/engagement-type.enum';

@Injectable({
  providedIn: 'root'
})
export class LimitsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getLimits(params: HttpParams, engagementType: string):
    Observable<IJsonApiListPayload<IWInstantOutcomeLimitAttributes | IWSurveyLimitAttributes | IWGameLimitAttributes>> {
    const eType = EngagementTypeAPIMapping[engagementType];
    return this.http.get<IJsonApiListPayload<IWInstantOutcomeLimitAttributes | IWSurveyLimitAttributes | IWGameLimitAttributes>>(`${ApiConfig.basePath}/${eType}/limits`, { params });
  }

  public updateLimits(
    id: string,
    data: IJsonApiPayload<IWInstantOutcomeLimitAttributes | IWSurveyLimitAttributes | IWGameLimitAttributes>,
    engagementType: string): Observable<IJsonApiPayload<any>> {
    const eType = EngagementTypeAPIMapping[engagementType];
    return this.http.patch<IJsonApiPayload<any>>(`${ApiConfig.basePath}/${eType}/limits` + '/' + id, data);
  }

  public createLimits(
    data: IJsonApiPayload<IWInstantOutcomeLimitAttributes | IWSurveyLimitAttributes | IWGameLimitAttributes>,
    engagementType: string): Observable<IJsonApiPayload<any>> {
    const eType = EngagementTypeAPIMapping[engagementType];
    return this.http.post<IJsonApiPayload<any>>(`${ApiConfig.basePath}/${eType}/limits`, data);
  }
}
