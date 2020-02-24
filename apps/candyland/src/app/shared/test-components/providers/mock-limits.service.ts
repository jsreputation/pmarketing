import { Observable, of } from 'rxjs';
import { ILimit } from '@cl-core/models/limit/limit.interface';
import { IJsonApiItemPayload, IWLimitAttributes } from '@perx/whistler';
import { LimitsService } from '@cl-core-services';

export class MockLimitsService implements Partial<LimitsService> {

  public getMockLimit(): ILimit {
    return {
      id: '1',
      times: 2,
      duration: 'test'
    };
  }

  public getLimits(): Observable<ILimit[]> {
    return of([this.getMockLimit()]);
  }

  public updateLimit(): Observable<IJsonApiItemPayload<IWLimitAttributes> | void> {
    return of(null);
  }

  public createLimit(): Observable<IJsonApiItemPayload<IWLimitAttributes> | void> {
    return of(null);
  }

  public deleteLimit(): Observable<void> {
    return of(null);
  }
}
