import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { OutcomesHttpsService } from '@cl-core/http-services/outcomes-https.service';
import { map } from 'rxjs/operators';
import { OutcomesHttpAdapter } from '@cl-core/http-adapters/outcomes-http-adapter';
import { IWOutcomeAttributes, IJsonApiItem, IJsonApiListPayload, IJsonApiItemPayload } from '@perx/whistler';
import { IOutcome } from '@cl-core/models/outcome/outcome';
import { ICampaignOutcome } from '@cl-core/models/campaign/campaign';

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
    data: ICampaignOutcome,
    campaignId: string,
  ): Observable<IJsonApiItemPayload<IWOutcomeAttributes>> {
    const sendData = OutcomesHttpAdapter.transformFromOutcomes(
      data,
      campaignId,
    );
    return this.outcomesHttpsService.updateOutcome(data.outcome.id, { data: { id: data.outcome.id, ...sendData } });
  }

  public createOutcome(
    data: ICampaignOutcome,
    campaignId: string,
  ): Observable<IJsonApiItemPayload<IWOutcomeAttributes>> {
    const sendData = OutcomesHttpAdapter.transformFromOutcomes(data, campaignId);
    return this.outcomesHttpsService.createOutcome({ data: sendData });
  }

  public deleteOutcome(id: string): Observable<any> {
    return this.outcomesHttpsService.deleteOutcome(id);
  }

}
