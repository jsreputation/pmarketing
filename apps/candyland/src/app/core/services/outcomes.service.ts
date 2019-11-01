import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { OutcomesHttpsService } from '@cl-core/http-services/outcomes-https.service';
import { map } from 'rxjs/operators';
import { OutcomesHttpAdapter } from '@cl-core/http-adapters/outcomes-http-adapter';
import { IOutcomeAttributes } from '@perx/whistler';
import { IOutcome } from '@cl-core/models/outcome/outcome';

@Injectable({
  providedIn: 'root'
})
export class OutcomesService {

  constructor(private outcomesHttpsService: OutcomesHttpsService) {
  }

  public getOutcomes(params: HttpParamsOptions): Observable<IOutcome[]> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.outcomesHttpsService.getOutcomes(httpParams).pipe(
      map((response: IJsonApiListPayload<IOutcomeAttributes>) => response.data),
      map((response: IJsonApiItem<IOutcomeAttributes>[]) =>
        response.map((outcome: IJsonApiItem<IOutcomeAttributes>) => OutcomesHttpAdapter.transformAPIResponseToOutcome(outcome)))
    );
  }

  public updateOutcome(
    data: { value: IRewardEntity, probability: number },
    campaignId: string,
    enableProbability: boolean,
    slotNumber: number
  ): Observable<IJsonApiPayload<IOutcomeAttributes>> {
    const sendData = OutcomesHttpAdapter.transformFromOutcomes(data, enableProbability, campaignId, slotNumber);
    return this.outcomesHttpsService.updateOutcome(data.value.outcomeId, { data: { id: data.value.outcomeId, ...sendData } });
  }

  public createOutcome(
    data: { value: IRewardEntity, probability: number },
    campaignId: string,
    enableProbability: boolean,
    slotNumber: number
  ): Observable<IJsonApiPayload<IOutcomeAttributes>> {
    const sendData = OutcomesHttpAdapter.transformFromOutcomes(data, enableProbability, campaignId, slotNumber);
    return this.outcomesHttpsService.createOutcome({ data: sendData });
  }

  public deleteOutcome(id: string): Observable<any> {
    return this.outcomesHttpsService.deleteOutcome(id);
  }

}
