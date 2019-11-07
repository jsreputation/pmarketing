import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { LimitsHttpsService } from '@cl-core/http-services/limits-https.service';
import { map } from 'rxjs/operators';
import { LimitsHttpAdapter } from '@cl-core/http-adapters/limits-http-adapter';
import { IWInstantOutcomeLimitAttributes, IWSurveyLimitAttributes, IWGameLimitAttributes } from '@perx/whistler';
import { ILimit } from '@cl-core/models/limit/limit.interface';

@Injectable({
  providedIn: 'root'
})
export class LimitsService {

  constructor(private limitsHttpsService: LimitsHttpsService) {
  }

  public getLimits(params: HttpParamsOptions, engagementType: string): Observable<ILimit[]> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.limitsHttpsService.getLimits(httpParams, engagementType).pipe(
      map((response: IJsonApiListPayload<IWInstantOutcomeLimitAttributes |
        IWSurveyLimitAttributes |
        IWGameLimitAttributes>) => response.data),
      map((response: IJsonApiItem<IWInstantOutcomeLimitAttributes |
        IWSurveyLimitAttributes |
        IWGameLimitAttributes>[]) => response.map(
          (limit: IJsonApiItem<IWInstantOutcomeLimitAttributes | IWSurveyLimitAttributes | IWGameLimitAttributes>) =>
            LimitsHttpAdapter.transformAPIResponseToLimit(limit, engagementType)))
    );
  }

  public updateLimits(
    id: string,
    data: { times?: number, duration: string },
    type: string,
    campaignId: number,
    engagementId: number
  ): Observable<IJsonApiPayload<IWInstantOutcomeLimitAttributes | IWSurveyLimitAttributes | IWGameLimitAttributes> | void> {
    // if times is empty, limit should actually be deleted
    if (!data.times || data.times === null) {
      return this.limitsHttpsService.deleteLimit(type, id);
    }
    const sendData = LimitsHttpAdapter.transformFromLimits(data, type, campaignId, engagementId);
    return this.limitsHttpsService.updateLimits(id, { data: { id, ...sendData } }, type);
  }

  public createLimits(
    data: { times?: number, duration: string },
    type: string,
    campaignId: number,
    engagementId: number
  ): Observable<IJsonApiPayload<IWInstantOutcomeLimitAttributes | IWSurveyLimitAttributes | IWGameLimitAttributes> | void> {
    // if times is empty limit should actully not be created
    if (!data.times || data.times === null) {
      return of();
    }
    const sendData = LimitsHttpAdapter.transformFromLimits(data, type, campaignId, engagementId);
    return this.limitsHttpsService.createLimits({ data: sendData }, type);
  }

  public deleteLimit(type: string, limitId: number): Observable<void> {
    return this.limitsHttpsService.deleteLimit(type, limitId);
  }
}
