import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { LimitsHttpsService } from '@cl-core/http-services/limits-https.service';
import { map } from 'rxjs/operators';
import { LimitsHttpAdapter } from '@cl-core/http-adapters/limits-http-adapter';
import { ILimit, IInstantOutcomeLimitAttributes, ISurveyLimitAttributes, IGameLimitAttributes } from '@perx/whistler';
import { IJsonApiListPayload, IJsonApiItem } from '@cl-core/http-services/jsonapi.payload';

@Injectable({
  providedIn: 'root'
})
export class LimitsService {

  constructor(private limitsHttpsService: LimitsHttpsService) {
  }

  public getLimits(params: HttpParamsOptions, engagementType: string): Observable<ILimit[]> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.limitsHttpsService.getLimits(httpParams, engagementType).pipe(
      map((response: IJsonApiListPayload<IInstantOutcomeLimitAttributes | ISurveyLimitAttributes | IGameLimitAttributes>) => response.data),
      map((response: IJsonApiItem<IInstantOutcomeLimitAttributes | ISurveyLimitAttributes | IGameLimitAttributes>[]) => response.map(
        (limit: IJsonApiItem<IInstantOutcomeLimitAttributes | ISurveyLimitAttributes | IGameLimitAttributes>) =>
          LimitsHttpAdapter.transformAPIResponseToLimit(limit, engagementType)))
    );
  }

  public updateLimits(id: number, data: any, type: string, campaignId: number, engagementId: number): Observable<any> {
    const sendData = LimitsHttpAdapter.transformFromLimits(data, type, campaignId, engagementId);
    return this.limitsHttpsService.updateLimits(id, { data: { id, ...sendData } }, type);
  }

  public createLimits(data: any, type: string, campaignId: number, engagementId: number): Observable<any> {
    const sendData = LimitsHttpAdapter.transformFromLimits(data, type, campaignId, engagementId);
    return this.limitsHttpsService.createLimits({ data: sendData }, type);
  }

}
