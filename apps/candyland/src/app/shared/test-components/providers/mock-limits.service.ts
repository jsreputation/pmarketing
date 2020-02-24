import { Observable, of } from 'rxjs';
import { ILimit } from '@cl-core/models/limit/limit.interface';
import { IJsonApiItemPayload, IWLimitAttributes } from '@perx/whistler';
import { HttpParamsOptions } from '@cl-core/models/params-map';

export class MockLimitsService {

  public getMockLimit(): ILimit {
    return {
      id: '1',
      times: 2,
      duration: 'test'
    };
  }

  public getLimits(params: HttpParamsOptions, engagementType: string): Observable<ILimit[]> {
    console.log(params, engagementType);
    return of([this.getMockLimit()]);
  }

  public updateLimit(
    id: string,
    data: { times?: number, duration: string },
    type: string,
    campaignId: number,
    engagementId: number
  ): Observable<IJsonApiItemPayload<IWLimitAttributes> | void> {
    console.log(id, data, type, campaignId, engagementId);
    return of(null);
  }

  public createLimit(
    data: { times?: number, duration: string },
    type: string,
    campaignId: number,
    engagementId: number
  ): Observable<IJsonApiItemPayload<IWLimitAttributes> | void> {
    console.log(data, type, campaignId, engagementId);
    return of(null);
  }

  public deleteLimit(type: string, limitId: number): Observable<void> {
    console.log(type, limitId);
    return of(null);
  }
}
