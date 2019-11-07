import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWInstantOutcomeLimitAttributes, IWSurveyLimitAttributes, IWGameLimitAttributes } from '@perx/whistler';
import { EngagementTypeAPIMapping } from '@cl-core/models/engagement/engagement-type.enum';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LimitsHttpsService {
  constructor(private http: HttpClient) { }

  public getLimits(params: HttpParams, engagementType: string):
    Observable<IJsonApiListPayload<IWInstantOutcomeLimitAttributes | IWSurveyLimitAttributes | IWGameLimitAttributes>> {
    const eType = EngagementTypeAPIMapping[engagementType];
    return this.http.get<IJsonApiListPayload<IWInstantOutcomeLimitAttributes | IWSurveyLimitAttributes | IWGameLimitAttributes>>(`${ApiConfig.basePath}/${eType}/limits`, { params });
  }

  public updateLimits(
    id: string,
    data: IJsonApiPayload<IWInstantOutcomeLimitAttributes | IWSurveyLimitAttributes | IWGameLimitAttributes>,
    engagementType: string
  ): Observable<IJsonApiPayload<IWInstantOutcomeLimitAttributes | IWSurveyLimitAttributes | IWGameLimitAttributes>> {
    const eType = EngagementTypeAPIMapping[engagementType];
    const url = `${ApiConfig.basePath}/${eType}/limits/${id}`;
    return this.http.patch<IJsonApiPayload<IWInstantOutcomeLimitAttributes | IWSurveyLimitAttributes | IWGameLimitAttributes>>(url, data);
  }

  public createLimits(
    data: IJsonApiPayload<IWInstantOutcomeLimitAttributes | IWSurveyLimitAttributes | IWGameLimitAttributes>,
    engagementType: string
  ): Observable<IJsonApiPayload<IWInstantOutcomeLimitAttributes | IWSurveyLimitAttributes | IWGameLimitAttributes>> {
    const eType = EngagementTypeAPIMapping[engagementType];
    return this.http.post<IJsonApiPayload<IWInstantOutcomeLimitAttributes | IWSurveyLimitAttributes | IWGameLimitAttributes>>(
      `${ApiConfig.basePath}/${eType}/limits`,
      data
    );
  }

  public deleteLimit(engagementType: string, limitId: number | string): Observable<void> {
    const eType = EngagementTypeAPIMapping[engagementType];
    return this.http.delete(`${ApiConfig.basePath}/${eType}/limits/${limitId}`)
      // convert to a void observable in case of success
      .pipe(map(() => { }));
  }
}
