import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { LimitsHttpsService } from '@perxtech/whistler-services';
import { map } from 'rxjs/operators';
import { LimitsHttpAdapter } from '@cl-core/http-adapters/limits-http-adapter';
import { IWLimitAttributes, IJsonApiListPayload, IJsonApiItem, IJsonApiItemPayload } from '@perxtech/whistler';
import { ILimit } from '@cl-core/models/limit/limit.interface';
import { EngagementTypeAPIMapping } from '@cl-core/models/engagement/engagement-type.enum';
import { HttpParamsOptions } from '@cl-core/models/params-map';

@Injectable({
  providedIn: 'root'
})
export class LimitsService {

  constructor(private limitsHttpsService: LimitsHttpsService) {
  }

  public getLimits(params: HttpParamsOptions, engagementType: string): Observable<ILimit[]> {
    const httpParams = ClHttpParams.createHttpParams(params);
    const eType = this.getEngagementTypeLink(engagementType);
    return this.limitsHttpsService.getLimits(httpParams, eType).pipe(
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
    const eType = this.getEngagementTypeLink(type);
    const sendData = LimitsHttpAdapter.transformFromLimits(data, type, campaignId, engagementId);
    return this.limitsHttpsService.updateLimit(id, { data: { id, ...sendData } }, eType);
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
    const eType = this.getEngagementTypeLink(type);
    const sendData = LimitsHttpAdapter.transformFromLimits(data, type, campaignId, engagementId);
    return this.limitsHttpsService.createLimit({ data: sendData }, eType);
  }

  public deleteLimit(type: string, limitId: number): Observable<void> {
    const eType = this.getEngagementTypeLink(type);
    return this.limitsHttpsService.deleteLimit(limitId, eType);
  }

  private getEngagementTypeLink(type: string): string {
    return EngagementTypeAPIMapping[type].replace('_', '-');
  }
}
