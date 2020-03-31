import { Observable, of } from 'rxjs';
import { IOutcome } from '@cl-core/models/outcome/outcome';
import { IJsonApiItemPayload, IWOutcomeAttributes } from '@perxtech/whistler';
import { OutcomesService } from '@cl-core-services';

export class MockOutcomeService implements Partial<OutcomesService> {
  private getMockOutcome(): IOutcome {
    return {
      id: '1',
      resultId: 1,
      resultType: 'test',
      probability: 2,
      slotNumber: 2,
      limit: 2,
    };
  }

  public getOutcomes(): Observable<IOutcome[]> {
    return of([this.getMockOutcome()]);
  }

  public updateOutcome(): Observable<IJsonApiItemPayload<IWOutcomeAttributes>> {
    return of(null);
  }

  public createOutcome(): Observable<IJsonApiItemPayload<IWOutcomeAttributes>> {
    return of(null);
  }

  public deleteOutcome(): Observable<any> {
    return of(null);
  }
}
