import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { LimitsHttpsService } from '@cl-core/http-services/limits-https.service';
import { map } from 'rxjs/operators';
import { LimitsHttpAdapter } from '@cl-core/http-adapters/limits-http-adapter';
import { IWLimitAttributes, IJsonApiListPayload, IJsonApiItem, IJsonApiItemPayload } from '@perx/whistler';
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
      map((response: IJsonApiListPayload<IWLimitAttributes>) => response.data),
      map((response: IJsonApiItem<IWLimitAttributes>[]) => response.map(
        (limit: IJsonApiItem<IWLimitAttributes>) =>
          LimitsHttpAdapter.transformAPIResponseToLimit(limit, engagementType)))
    );
  }

  public updateLimit(
    id: string,
    data: { times?: number, duration: string },
    type: string,
    campaignId: number,
    engagementId: number
  ): Observable<IJsonApiItemPayload<IWLimitAttributes> | void> {
    // if times is empty, limit should actually be deleted
    if (!data.times || data.times === null) {
      return this.limitsHttpsService.deleteLimit(type, id);
    }
    const sendData = LimitsHttpAdapter.transformFromLimits(data, type, campaignId, engagementId);
    return this.limitsHttpsService.updateLimit(id, { data: { id, ...sendData } }, type);
  }

  public createLimit(
    data: { times?: number, duration: string },
    type: string,
    campaignId: number,
    engagementId: number
  ): Observable<IJsonApiItemPayload<IWLimitAttributes> | void> {
    // if times is empty limit should actully not be created
    if (!data.times || data.times === null) {
      return of(void 0);
    }
    const sendData = LimitsHttpAdapter.transformFromLimits(data, type, campaignId, engagementId);
    return this.limitsHttpsService.createLimit({ data: sendData }, type);
  }

  public deleteLimit(type: string, limitId: number): Observable<void> {
    return this.limitsHttpsService.deleteLimit(type, limitId);
  }
}
