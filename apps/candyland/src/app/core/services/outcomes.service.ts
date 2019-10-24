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

  public updateOutcome(id: string, data: IOutcome): Observable<any> {
    const sendData = OutcomesHttpAdapter.transformFromOutcomes(data);
    return this.outcomesHttpsService.updateOutcome(id, { data: { id, ...sendData } });
  }

  public createOutcome(data: IOutcome): Observable<any> {
    const sendData = OutcomesHttpAdapter.transformFromOutcomes(data);
    return this.outcomesHttpsService.createOutcome({ data: sendData });
  }

  public deleteOutcome(id: string): Observable<any> {
    return this.outcomesHttpsService.deleteOutcome(id);
  }

}
