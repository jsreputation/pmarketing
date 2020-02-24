import { Observable, of } from 'rxjs';
import { IOutcome } from '@cl-core/models/outcome/outcome';
import { ICampaignOutcome } from '@cl-core/models/campaign/campaign';
import { IJsonApiItemPayload, IWOutcomeAttributes } from '@perx/whistler';
import { HttpParamsOptions } from '@cl-core/models/params-map';

export class MockOutcomeService {

  public getMockOutcome(): IOutcome {
    return {
      id: '1',
      resultId: 1,
      resultType: 'test',
      probability: 2,
      slotNumber: 2,
      limit: 2,
    };
  }

  public getOutcomes(params: HttpParamsOptions): Observable<IOutcome[]> {
    console.log(params);
    return of([this.getMockOutcome()]);
  }

  public updateOutcome(
    data: ICampaignOutcome,
    campaignId: string,
  ): Observable<IJsonApiItemPayload<IWOutcomeAttributes>> {
    console.log(data, campaignId);
    return of(null);
  }

  public createOutcome(
    data: ICampaignOutcome,
    campaignId: string,
  ): Observable<IJsonApiItemPayload<IWOutcomeAttributes>> {
    console.log(data, campaignId);
    return of(null);
  }

  public deleteOutcome(id: string): Observable<any> {
    console.log(id);
    return of(null);
  }
}
