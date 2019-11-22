import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { OutcomesHttpsService } from '@cl-core/http-services/outcomes-https.service';
import { map } from 'rxjs/operators';
import { OutcomesHttpAdapter } from '@cl-core/http-adapters/outcomes-http-adapter';
import { IWOutcomeAttributes } from '@perx/whistler';
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
      map((response: IJsonApiListPayload<IWOutcomeAttributes>) => response.data),
      map((response: IJsonApiItem<IWOutcomeAttributes>[]) =>
        response.map((outcome: IJsonApiItem<IWOutcomeAttributes>) => OutcomesHttpAdapter.transformAPIResponseToOutcome(outcome)))
    );
  }

  public updateOutcome(
    data: { value: IRewardEntity, probability: number, limit: number | null },
    campaignId: string,
    enableProbability: boolean,
    slotNumber: number
  ): Observable<IJsonApiPayload<IWOutcomeAttributes>> {
    const sendData = OutcomesHttpAdapter.transformFromOutcomes(data, enableProbability, campaignId, slotNumber);
    return this.outcomesHttpsService.updateOutcome(data.value.outcomeId, { data: { id: data.value.outcomeId, ...sendData } });
  }

  public createOutcome(
    data: { value: IRewardEntity, probability: number, limit: number | null },
    campaignId: string,
    enableProbability: boolean,
    slotNumber: number
  ): Observable<IJsonApiPayload<IWOutcomeAttributes>> {
    const sendData = OutcomesHttpAdapter.transformFromOutcomes(data, enableProbability, campaignId, slotNumber);
    return this.outcomesHttpsService.createOutcome({ data: sendData });
  }

  public deleteOutcome(id: string): Observable<any> {
    return this.outcomesHttpsService.deleteOutcome(id);
  }

}
