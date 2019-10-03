import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { OutcomesHttpsService } from '@cl-core/http-services/outcomes-https.service';
import { map } from 'rxjs/operators';
import { OutcomesHttpAdapter } from '@cl-core/http-adapters/outcomes-http-adapter';
import { IOutcomeAttributes, IOutcome } from '@perx/whistler';
import { IJsonApiListPayload, IJsonApiItem } from '@cl-core/http-services/jsonapi.payload';

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
}
